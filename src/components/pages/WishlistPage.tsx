import React, { useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { fetchWishList, WishListItem } from '../../api/wishListApi';
import { SlicePagingData } from '../../types/response';
import WishlistLoading from '../../components/wishlist/WishlistLoading';
import WishlistError from '../../components/wishlist/WishlistError';
import WishlistEmpty from '../../components/wishlist/WishlistEmpty';
import WishlistGrid from '../../components/wishlist/WishlistGrid';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useContentHeight } from '../../utils/useContentHeight';

const WishlistPage: React.FC = () => {
    const contentHeight = useContentHeight();
    const [wishList, setWishList] = useState<SlicePagingData<
        WishListItem[]
    > | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadWishList = useCallback(async (pageNum: number) => {
        setLoading(true);
        try {
            const response = await fetchWishList(pageNum);
            setWishList((prevWishList) => {
                if (prevWishList) {
                    return {
                        ...response.data,
                        list: Array.isArray(prevWishList.list)
                            ? [
                                  ...prevWishList.list,
                                  ...(Array.isArray(response.data.list)
                                      ? response.data.list
                                      : [response.data.list]),
                              ]
                            : [
                                  prevWishList.list,
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
        } catch (err) {
            setError('위시리스트 정보를 불러오는데 실패했습니다.');
            console.error('위시리스트 정보 로딩 오류:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const { lastItemRef } = useInfiniteScroll(loading, hasMore, () =>
        setPage((prev) => prev + 1)
    );

    useEffect(() => {
        loadWishList(page);
    }, [page, loadWishList]);

    const handleDeleteItem = (itemNo: number) => {
        if (wishList) {
            const updatedList = wishList.list.filter(
                (item) => item.wishlistItemNo !== itemNo
            );
            setWishList((prevState) => ({
                ...prevState!,
                list: updatedList,
                totalCount: prevState!.totalCount - 1,
            }));
        }
    };

    if (loading && !wishList) return <WishlistLoading />;
    if (error) return <WishlistError error={error} />;
    if (!wishList || wishList.list.length === 0) return <WishlistEmpty />;

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 2,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
                height: `${contentHeight}px`,
                overflowY: 'auto',
            }}
        >
            <WishlistGrid
                wishList={wishList}
                lastItemRef={lastItemRef}
                onDeleteItem={handleDeleteItem}
            />
            {loading && <WishlistLoading />}
        </Box>
    );
};

export default WishlistPage;
