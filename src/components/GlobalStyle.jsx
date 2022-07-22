import { createGlobalStyle } from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

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

  @font-face {
    font-family: "Rocher";
    src: url(https://assets.codepen.io/9632/RocherColorGX.woff2);
  }
`;

export default GlobalStyle;
