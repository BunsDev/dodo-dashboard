import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import "../styles/tailwind.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </ApolloProvider>
  );
}
