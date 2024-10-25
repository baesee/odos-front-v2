import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useContentHeight } from '../../utils/useContentHeight';
import WishlistGrid from '../wishlist/WishlistGrid';
import WishlistEmpty from '../wishlist/WishlistEmpty';
import WishlistLoading from '../wishlist/WishlistLoading';
import WishlistError from '../wishlist/WishlistError';
import {
    fetchWishList,
    deleteWishList,
    WishListItem,
} from '../../api/wishListApi';
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

    const loadWishList = useCallback(
        async (pageNum: number) => {
            if (loading || !hasMore) return;
            setLoading(true);
            try {
                const response = await fetchWishList(pageNum);
                setWishList((prevWishList) => {
                    if (prevWishList) {
                        return {
                            ...response.data,
                            list: [
                                ...prevWishList.list,
                                ...(Array.isArray(response.data.list)
                                    ? response.data.list
                                    : [response.data.list]),
                            ],
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
                setPage(pageNum);
            } catch (err) {
                setError('위시리스트 정보를 불러오는데 실패했습니다.');
                console.error('위시리스트 정보 로딩 오류:', err);
            } finally {
                setLoading(false);
            }
        },
        [loading, hasMore]
    );

    useEffect(() => {
        loadWishList(1);
    }, [loadWishList]);

    const { lastItemRef } = useInfiniteScroll(loading, hasMore, () =>
        loadWishList(page + 1)
    );

    const handleDeleteItem = async (itemNo: number) => {
        try {
            await deleteWishList(itemNo);
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
                />
            ) : null}
            {loading && <WishlistLoading />}
            {error && <WishlistError error={error} />}
            {wishList && wishList.list.length === 0 && <WishlistEmpty />}
        </Box>
    );
};

export default WishlistPage;
