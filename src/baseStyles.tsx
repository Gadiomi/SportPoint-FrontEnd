import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   :root {
    font-family: "Roboto", sans-serif;
    line-height: 1.5;
    font-weight: 400;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
  body {
    background-color: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.white};
    
  }
 
p{    color: ${({ theme }) => theme.color.white};}
html {
    box-sizing: border-box;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0 auto;
    display: flex;
    place-items: center;
    justify-content: center;
    font-family: "Roboto", sans-serif;

    line-height: 1.5;
    overflow-x: hidden;
}

body.modal-open {
    overflow: hidden;
}

a {
    text-decoration: none;
    color: var(--main);
}

ul,
ol {
    margin: 0;
    padding: 0;
}

li {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}
div{
    width: 100%;
}
svg {

    stroke: var(--main);
    fill: none;
}

button {
    padding: 0;
    cursor: pointer;
    border: none;
    background-color: transparent;
    transition: background-color 0.3s ease;
}



input {
    width: 100%;
    border: 1px solid rgba(18, 20, 23, 0.1);
    border-radius: 12px;
    /* padding: 16px 18px; */
    padding: 5px 6px;
    font-weight: 400;
    font-size: 16px;
    line-height: 137%;
}

input:focus {
    outline: 1px solid rgba(18, 20, 23, 0.1);
    border: 1px solid rgba(18, 20, 23, 0.1);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: all 5000s ease-in-out 0s;
}
`;
