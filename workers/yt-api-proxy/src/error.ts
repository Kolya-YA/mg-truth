import { createJsonResponse } from "./utils";

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

export function handleError(error: unknown): Response {
    console.error('Error: ', error);

    if (error instanceof ApiError) {
        return createJsonResponse({ error: error.message }, error.status);
    }

    return createJsonResponse(
        { error: 'An expected error occured' },
        500
    );
}