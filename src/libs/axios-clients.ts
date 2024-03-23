import Axios, {AxiosError, AxiosRequestConfig} from 'axios';

export const defaultAxiosClient = Axios.create({
    baseURL: '',
    headers: {},
});

export const setDefaultAxiosClientToken = (token: string | undefined) => {
    defaultAxiosClient.defaults.headers.common.Authorization = `Bearer ${token ?? ''}`;
};

defaultAxiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

defaultAxiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (false) {
            // return handleUnauthorizedRequest(error.config);
        } else {
            return Promise.reject(error);
        }
    },
);

// add a second `options` argument here if you want to pass extra options to each generated query
export const defaultAxiosRequest = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    const abortController = new AbortController();
    const timeoutDuration = config.timeout ?? options?.timeout ?? 30000;
    const timeoutId = setTimeout(() => abortController.abort(), timeoutDuration);

    const promise = defaultAxiosClient({
        ...config,
        ...options,
        signal: abortController.signal,
    })
        .then(({data}) => {
            clearTimeout(timeoutId);
            return data as T;
        })
        .catch((error) => {
            clearTimeout(timeoutId);
            throw error;
        });

    // Add cancel method to the promise
    // @ts-ignore
    promise.cancel = () => {
        abortController.abort();
        clearTimeout(timeoutId);
    };

    return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
