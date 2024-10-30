import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useContentHeight } from '../../utils/useContentHeight';
import WishlistGrid from '../wishlist/WishlistGrid';
import WishlistEmpty from '../wishlist/WishlistEmpty';
import WishlistLoading from '../wishlist/WishlistLoading';
import WishlistError from '../wishlist/WishlistError';
import { fetchWishList, WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const WishlistPage: React.FC = () => {
    const contentHeight = useContentHeight();
    const [wishList, setWishList] = useState<SlicePagingData<
        WishListItem[]
    > | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasLastItem, setHasLastItem] = useState(false);

    const loadWishList = useCallback(
        async (pageNum: number) => {
            if (loading || !hasMore) return;
            if (hasLastItem) return;

            setLoading(true);
            try {
                const response = await fetchWishList(pageNum);
                if (!response.data.list) {
                    setHasMore(false);
                    return;
                }
                setWishList((prevWishList) => {
                    if (prevWishList) {
                        const newList = Array.isArray(response.data.list)
                            ? response.data.list
                            : [response.data.list];
                        const uniqueMap = new Map<number, WishListItem>();
                        [...prevWishList.list, ...newList].forEach((item) => {
                            uniqueMap.set(item.wishlistItemNo, item);
                        });
                        return {
                            ...response.data,
                            list: Array.from(uniqueMap.values()),
                        };
                    }
                    return {
                        ...response.data,
                        list: Array.isArray(response.data.list)
                            ? response.data.list
                            : [response.data.list],
                    };
                });
                setHasMore(response.data.hasNext);
                setHasLastItem(response.data.last);
                setPage(pageNum);
            } catch (err) {
                setError('위시리스트 정보를 불러오는데 실패했습니다.');
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        },
        [loading, hasMore, page]
    );

    useEffect(() => {
        loadWishList(1);
    }, []);

    const { lastItemRef } = useInfiniteScroll(loading, hasMore, () =>
        loadWishList(page + 1)
    );

    const handleDeleteItem = async (itemNo: number) => {
        try {
            setWishList((prevWishList) => {
                if (prevWishList) {
                    return {
                        ...prevWishList,
                        list: prevWishList.list.filter(
                            (item) => item.wishlistItemNo !== itemNo
                        ),
                    };
                }
                return null;
            });
        } catch (err) {
            console.error('위시리스트 항목 삭제 오류:', err);
        }
    };

    return (
        <Box
            sx={{
                height: `${contentHeight}px`,
                overflowY: 'auto',
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                padding: '20px',
            }}
        >
            {wishList && wishList.list.length > 0 ? (
                <WishlistGrid
                    wishList={wishList}
                    onDeleteItem={handleDeleteItem}
                    lastItemRef={lastItemRef}
                    isLoading={loading}
                    hasMore={hasMore}
                    hasLastItem={hasLastItem}
                />
            ) : null}
            {loading && <WishlistLoading />}
            {error && <WishlistError error={error} />}
            {wishList && wishList.list.length === 0 && <WishlistEmpty />}
        </Box>
    );
};

export default WishlistPage;
