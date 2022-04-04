import { GraphQLClient } from "graphql-request";

const ENDPOINT = "https://beta.pokeapi.co/graphql/v1beta";
const graphQLClient = new GraphQLClient(ENDPOINT);

export { ENDPOINT, graphQLClient };
