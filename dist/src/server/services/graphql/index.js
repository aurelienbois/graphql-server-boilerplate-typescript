"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const fs_1 = require("fs");
const path_1 = require("path");
const schemaPath = (0, path_1.join)(__dirname, 'schema.gql');
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs = (0, fs_1.readFileSync)(schemaPath, 'utf8');
const executableSchema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers: resolvers_1.default,
});
const server = new apollo_server_express_1.ApolloServer({
    schema: executableSchema,
    context: ({ req }) => req,
});
exports.default = server;
