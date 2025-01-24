"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const country_routes_1 = __importDefault(require("./routes/country.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const notFoundHandler_1 = require("./middlewares/notFoundHandler");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from 'frontend/dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend', 'dist')));
// API Route
app.use('/api', country_routes_1.default);
// Serve frontend (React/Vue/Angular SPA)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'frontend', 'dist', 'index.html'));
});
// Error Handlers
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
