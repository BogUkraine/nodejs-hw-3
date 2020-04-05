import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successfulResponse, setSuccessfulResponse] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if(body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            setSuccessfulResponse(data ? null : data.message);
            setLoading(false);
            return data;
        }
        catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);
    const clearSuccessfulResponse = useCallback(() => setSuccessfulResponse(null), []);

    return {request, loading, error, clearError, successfulResponse, clearSuccessfulResponse};
}

export default useHttp;