const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type Todo {
        id: ID!
        title: String!
        completed: Boolean
    }
    type Query {
        getTodos: [Todo]
    }
    `,
    resolvers: {}
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log(`app listening on port 8000`))
};
startServer()