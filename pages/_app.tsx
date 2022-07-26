import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <NotificationProvider>
                <MoralisProvider initializeOnMount={false}>
                    <Component {...pageProps} />
                </MoralisProvider>
            </NotificationProvider>
        </ChakraProvider>
    );
}

export default MyApp;
