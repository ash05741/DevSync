import jwt, { SignOptions } from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signToken = (userId: mongoose.Types.ObjectId | string): string => {

    const expiresIn = process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'];

    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn,
    });
};