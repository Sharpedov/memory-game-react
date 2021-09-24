import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
    ${normalize}

    body {
        background: #121212;
        color: #fff;
    }
`;

export default GlobalStyle;
