// Initial skeleton built from the tutorial found at:
// https://www.howtographql.com/graphql-js/0-introduction/

const { GraphQLServer, PubSub } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      pubsub,
    };
  },
});
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
);
