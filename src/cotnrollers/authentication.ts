import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log("Request body:", req.body); // ADD THIS

        const { email, password, username } = req.body;

        // Check each field individually and log which one is missing
        if (!email) {
            console.log("Email is missing");
            return res.status(400).json({ error: "Email is required" });
        }
        if (!password) {
            console.log("Password is missing");
            return res.status(400).json({ error: "Password is required" });
        }
        if (!username) {
            console.log("Username is missing");
            return res.status(400).json({ error: "Username is required" });
        }

        console.log("Checking if user exists with email:", email);
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            console.log("User already exists:", existingUser.email);
            return res.status(400).json({ error: "User already exists" });
        }

        console.log("Creating new user...");
        const salt = random();
        const hashedPassword = authentication(salt, password);

        console.log("Salt generated:", salt);
        console.log("Hashed password:", hashedPassword);

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: hashedPassword
            }
        });

        console.log("User created successfully:", user);
        return res.status(200).json(user).end();
    } catch (error) {
        console.log("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};