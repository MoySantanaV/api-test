import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body{
    background: ${({theme}) => theme.background};

    transition: all 0.5s linear;
}
`

export {GlobalStyles}