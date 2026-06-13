import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';
import { RegisterUserInput, LoginInput } from '../validators/user.validator';
import { signToken } from '../utils/jwt.util';

export const registerHandler = async (
    req: Request<{}, {}, RegisterUserInput>,
    res: Response
): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'Email already in use' });
            return;
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Create the user
        const newUser = await User.create({
            name,
            email,
            passwordHash,
        });

        // 4. Send success response (excluding the password hash!)
        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const loginHandler = async (req: Request<{}, {}, LoginInput>, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid email or password',
            });
            return;
        }

        const token = signToken(user._id.toString());

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}