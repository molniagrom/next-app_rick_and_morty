type RequestWithRetryOptions = {
    retries?: number;
    delay?: number;
    shouldRetry?: (error: unknown) => boolean;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const requestWithRetry = async <T>(
    requestFn: () => Promise<T>,
    {retries = 0, delay = 250, shouldRetry}: RequestWithRetryOptions = {}
): Promise<T> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await requestFn();
        } catch (error) {
            lastError = error;
            const canRetry = attempt < retries && (shouldRetry ? shouldRetry(error) : true);

            if (!canRetry) {
                break;
            }

            await wait(delay * (attempt + 1));
        }
    }

    throw lastError;
};
