import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/creatorzv1",
    cache: new InMemoryCache(),
});

export default client;