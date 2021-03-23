import { useEffect, useState } from 'react';
import axios from 'axios';

const useBookSearch = (query: string, pageNumber: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(true);
    const [books, setBooks] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        setBooks([]);
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);

        let cancel: Function;

        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
            params: { q: query, page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then((res: any) => {
            setBooks((prevBooks: any[]) => {
                return Array.from(new Set([...prevBooks, ...res.data.docs.map((b: any) => b.title)]));
            });
            setHasMore(res.data.docs.length > 0);
            setLoading(false);
        }).catch((e: any) => {
            if (axios.isCancel(e)) {
                return;
            }
            setError(true);
        });

        return () => cancel();
    }, [query, pageNumber]);

    return {
        loading,
        error,
        books,
        hasMore
    }
}

export default useBookSearch;