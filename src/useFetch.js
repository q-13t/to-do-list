import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, updateData] = useState(null);
    const [error, updateError] = useState(null);
    const [loading, updateLoading] = useState(true);

    useEffect(
        () => {
            const abortController = new AbortController();

            fetch(url, { signal: abortController.signal })
                .then((data) => {
                    if (!data.ok) {
                        throw Error("Fetch Failed");
                    }
                    return data.json();
                }).then(json => {
                    updateData(json);
                    updateLoading(false);
                    updateError(null);
                })
                .catch(e => {
                    if (e.name !== "AbortError") {
                        updateError(e.message);
                        updateLoading(false);
                    }
                });
            return () => abortController.abort();
        }, [url]
    );

    return { data, loading, error };
}

export default useFetch;