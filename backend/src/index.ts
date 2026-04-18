import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);

app.use(clerkMiddleware()); // Use Clerk middleware for authentication, auth obj will be available in req.auth
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies , parse form data

app.get("/", (req, res) => {
    res.json({
        message: "Hello, World! This is the backend of Productify.",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        },
    });
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running at http://localhost:${ENV.PORT}`);
});
