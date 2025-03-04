import dotenv from "dotenv";

// Load environment variables before anything else
dotenv.config({
    path: './.env'
});

import mongoConnection from "./db/index.js";
import { app } from "./app.js";

// Establish MongoDB connection
mongoConnection()
    .then(() => {
        app.on("error", (error) => {
            console.error("Express App Error:", error);
            process.exit(1); // Exit the process if there's an app-level error
        });

        const PORT = process.env.PORT || 9000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit the process if DB connection fails
    });
