import { config } from "dotenv"
import mongoose from "mongoose"
import { JwtPayload, sign, verify } from "jsonwebtoken"
config()

export const PORT = process.env.PORT || 5000

export const generateToken = (_id: mongoose.Types.ObjectId): string => {
    return sign({ _id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });
}

export const authToken = (token: string): JwtPayload => {
    try {
        return verify(token, process.env.JWT_SECRET as string) as JwtPayload
    } catch (error) {
        throw new Error("Invalid or expired token.")
    }
}