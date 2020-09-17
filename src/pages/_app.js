import React from 'react';
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "styled-components";

//import module
import GlobalProvider from "../Context/Context";
import GlobalStyles from "../components/GlobalStyles";

const theme = {
    colors: {
        primary: '#e5e6e7',
        secondary: '#444'
    }
}

function _app({Component, pageProps}) {

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <link rel="shortcut icon" href="/images/icon1.ico" />
            </Head>
            <GlobalProvider>
                <Component {...pageProps}/>
            </GlobalProvider>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default _app;
