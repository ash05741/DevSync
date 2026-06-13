import mongoose, { Document, Schema } from 'mongoose'

export interface IUSER extends Document {
    name: string;
    email: string;
    passwordHash: string;
    avatarURL: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUSER>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            required: true,
            type: String,
        },
        avatarURL: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {

        },
        updatedAt: {

        }
    }
);

export const User = mongoose.model<IUSER>('User', userSchema);

