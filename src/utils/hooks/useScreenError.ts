import {useCallback, useEffect, useState} from 'react';

export const useTriggerError = () => {
    const [error, setError] = useState<Error>();

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    const triggerError = useCallback(
        (message?: string | undefined, options?: ErrorOptions | undefined) => {
            setError(new Error(message, options) ?? new Error('Screen Error'));
        },
        [],
    );

    return triggerError;
};
