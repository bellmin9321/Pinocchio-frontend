import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,body {
    padding: 0;
    margin: 0;
    background: radial-gradient(
      146.95% 24.72% at 50% 75.28%,
      #3f3f3f 0%,
      #000000 100%
    );
  }
`;

export default GlobalStyle;
