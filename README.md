# GraphQL Server Boilerplate with TypeScript, Express, and Apollo Server

This repository serves as a boilerplate for setting up a GraphQL server using TypeScript, Express, and Apollo Server. It includes a basic project structure along with necessary configurations to get started quickly.

## Installation

To get started, follow these steps:

Clone the repository: **git clone https://github.com/aurelienbois/graphql-server-boilerplate-typescript.git**

Navigate to the project directory: **cd graphql-server-boilerplate-typescript**

Install dependencies: **npm install**

## Project Structure

The project structure is organized as follows:

- **package.json**: Contains project metadata, dependencies, and scripts for running the server and tests.
  - **src/**: Directory containing the server code.
    - **server/**: Contains the main server code.
    - **index.ts**: Entry point for the Express server setup.
      - **services/**: Contains different services used by the server.
      - **index.ts**: Exports available services.
        - **graphql/**: Service handling GraphQL configurations.
        - **schema.gql**: GraphQL schema definition.
        - **resolvers.ts**: Resolvers for GraphQL queries.
        - **index.ts**: Configures Apollo Server and exports the server instance.
  - **sample-query.gql**: Example GraphQL query.

## Usage

Starting the Server

To start the server, run:

`npm run server`

This command uses **nodemon** and **ts-node** for live reloading and running the TypeScript code.

### Testing

There are currently no specific test suites included in this boilerplate. However, you can create your own tests using testing libraries like **Jest** or **Mocha**.

### Sample Query

To test the GraphQL server, use the provided sample query:

```
query Posts {
    posts {
        id
        text
        user {
            username
            avatar
        }
    }
}
```

cURL :

```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"query":"query Posts { posts { id text user { username avatar } } }"}' \
http://localhost:8000/graphql
```

## Contributing

Contributions are welcome! If you have any improvements or new features to suggest, please feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
