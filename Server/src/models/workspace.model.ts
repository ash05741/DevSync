import mongoose, { Document, Schema } from 'mongoose';

// 1. The Strict Interface
export interface IWorkspace extends Document {
    name: string;
    description?: string;
    ownerId: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

// 2. The Relational Schema
const workspaceSchema = new Schema<IWorkspace>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Links to your User model
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', // Array of links to User models
            },
        ],
    },
    {
        timestamps: true,
    }
);

// 3. Export the Model
export const Workspace = mongoose.model<IWorkspace>('Workspace', workspaceSchema);