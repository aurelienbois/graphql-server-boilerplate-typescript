import { ApolloServer, ExpressContext } from "apollo-server-express"
import { GraphQLSchema } from "graphql"
import { readFileSync } from "fs"
import { join } from 'path';
const schemaPath = join(__dirname, 'schema.gql');

import { makeExecutableSchema } from "@graphql-tools/schema"
import Resolvers from "./resolvers"
const typeDefs = readFileSync(schemaPath, 'utf8') as string;

interface AppContext {
    req: ExpressContext['req'];
}
const executableSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: Resolvers,
})
const server: ApolloServer<AppContext> = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => req,
})
export default server