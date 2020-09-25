// deno 1.2.x required oak version up to v6.0.1
import { Application, Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { applyGraphQL, gql } from "https://deno.land/x/oak_graphql/mod.ts";

const app = new Application();

const types = gql`
type Player {
  firstName: String
  lastName: String
}

type Query {
  getPlayers: [Player] 
}
type Mutation{
  setPlayer(firstName: String,lastName: String): Player
}
`;

const players = [
  {
    firstName: "Nelson",
    lastName: "Hernandez"
  },
  {
    firstName: "Jhon",
    lastName: "Gomez"
  },
]

const resolvers = {
  Query: {
    getPlayers: () => {
      return players
    },
  },
  Mutation:{
    setPlayer(_: void, args: void) {
      console.log(args);
      return args
    }
  }
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8080");
await app.listen({ port: 8080 });
