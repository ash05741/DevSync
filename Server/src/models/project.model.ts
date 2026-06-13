import mongoose, { Document, Schema } from 'mongoose';

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

// 1. The Strict Interface
export interface IProject extends Document {
    name: string;
    description?: string;
    status: ProjectStatus;
    workspaceId: mongoose.Types.ObjectId;
    ownerId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// 2. The Relational Schema
const projectSchema = new Schema<IProject>(
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
        status: {
            type: String,
            enum: ['ACTIVE', 'COMPLETED', 'ARCHIVED'],
            default: 'ACTIVE',
        },
        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: 'Workspace', // Links to your Workspace model
            required: true,
            index: true, // Speeds up queries when loading a workspace's projects
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Links to the User who created it
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// 3. Export the Model
export const Project = mongoose.model<IProject>('Project', projectSchema);