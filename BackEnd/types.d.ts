import User from "./src/models/userSchema";

declare module 'express-serve-static-core' {
    interface Request {
        user?: User
    }
}