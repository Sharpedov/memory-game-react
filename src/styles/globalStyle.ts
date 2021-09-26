import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        font-size: 62.5%;
    }

    body {
        background:#1A1159;
        color: #fff;
        font-family: arial, sans-serif;
        font-size: 1.6rem;
    }

    li {
        list-style: none;
    }

    a {
        color: inherit;
        font-size: inherit;
    }

`;

export default GlobalStyle;
