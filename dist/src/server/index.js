"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const services_1 = __importDefault(require("./services"));
const fs_1 = require("fs");
const path_1 = require("path");
const sampleQueryPath = (0, path_1.join)(__dirname, "../../sample-query.gql");
const sampleQuery = (0, fs_1.readFileSync)(sampleQueryPath, "utf8");
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "production") {
    // you should use dotenv, dotenv-expand and a .env file. don't forget to include it in .gitignore
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.monsite.com"],
        },
    }));
}
app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
for (const name of Object.keys(services_1.default)) {
    if (name === "graphql") {
        ;
        (async () => {
            await services_1.default[name].start();
            services_1.default[name].applyMiddleware({ app: app });
        })();
    }
    else {
        app.use(`/$name`, services_1.default[name]);
    }
}
app.listen(8000, () => {
    console.log("Listening on port 8000!\n", "Test it with http://localhost:8000/graphql\n", "Sample query in Postman :\n\n", sampleQuery);
});
//
