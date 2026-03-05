import axios from "axios";

export const isAbortError = (error: unknown) => axios.isAxiosError(error) && error.code === "ERR_CANCELED";

export const toUserMessage = (error: unknown, fallbackText: string) => {
    if (isAbortError(error)) {
        return null;
    }

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 404) {
            return "Data not found.";
        }
        if (status && status >= 500) {
            return "Server is temporarily unavailable. Please try again.";
        }
    }

    return fallbackText;
};
