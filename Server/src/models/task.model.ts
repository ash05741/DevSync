import mongoose, { Document, Schema } from 'mongoose';
import { ref } from 'process';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ITask extends Document {
    title: String,
    description: String,
    status: TaskStatus,
    priority: TaskPriority,
    projectId?: mongoose.Types.ObjectId;
    assigneeId?: mongoose.Types.ObjectId;
    parentTaskId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
    {
        title: {
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
            enum: ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
            default: 'TODO',
        },
        priority: {
            type: String,
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            default: 'MEDIUM',
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
            index: true,
        },
        assigneeId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
        },
        parentTaskId: {
            type: Schema.Types.ObjectId,
            ref: 'Task', // Self-referencing relationship for subtasks
            index: true,
        },
    },
    {
        timestamps: true,
    }

);

export const Task = mongoose.model<ITask>('Task', taskSchema);