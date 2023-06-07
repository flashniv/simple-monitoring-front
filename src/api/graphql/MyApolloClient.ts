import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_API_URL });

const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('accessToken');

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache()
});
