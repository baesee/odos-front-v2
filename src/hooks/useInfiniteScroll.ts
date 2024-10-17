import { useCallback, useRef } from 'react';

const useInfiniteScroll = (
    loading: boolean,
    hasMore: boolean,
    loadMore: () => void
) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastItemRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore, loadMore]
    );

    return { lastItemRef };
};

export default useInfiniteScroll;
