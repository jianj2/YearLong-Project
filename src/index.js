// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./utils/react-auth0-spa";
import { AdminAuthProvider } from "./utils/useAdminAuth";
import config from "./auth_config.json";
import history from "./utils/history";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Defining Material UI Theme
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#DB3D94",
        },
    },
    overrides: {
        MuiInput: {
            input: {
                paddingTop: "5px",
                paddingBottom: "5px",
                paddingLeft: "10px",
                paddingRight: "10px",
            },
        },
    },
});

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

const link = `${process.env.REACT_APP_SERVER}/clinician` ||  "http://localhost:3001/clinician";

const production = process.env.NODE_ENV;
const domain = production ? config.prod_domain : config.domain;
const client_id = production ? config.prod_clientId : config.clientId;


ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <AdminAuthProvider>
                <Auth0Provider
                    domain={domain}
                    client_id={client_id}
                    redirect_uri={window.location.origin}
                    onRedirectCallback={onRedirectCallback}
                    audience={link}
                    scope={"read:current_user"}
                >
                    <App />
                </Auth0Provider>
            </AdminAuthProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
