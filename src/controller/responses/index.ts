// Basic Response in JSON format, for Controllers
export type BasicResponse = {
    message: string;
}

// Auth response in JSON format, for Controllers.
export type AuthResponse = {
    message: string,
    token: string
}