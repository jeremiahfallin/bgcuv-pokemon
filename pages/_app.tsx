import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #f9627e;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #efefef;
    --grey: #efefef;
    --green: #3ff9ac;
    --blue: #37718E;
  }
  html {
    background-size: 450px;
    background-attachment: fixed;
    font-size: 10px;
  }
  body {
    font-size: 2rem;
    background: var(--black);
    color: var(--white);
    overflow: hidden;
  }
  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }
  button {
    background: var(--green);
    color: var(--black);
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }
  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--green) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--green) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }
  hr {
    border: 0;
    height: 8px;
    background-size: 1500px;
  }
  img {
    max-width: 100%;
  }
  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }
  svg {
  font-family: Sans-Serif, Arial;
}
.line {
  stroke-width: 2;
  fill: none;
}
.axis path {
  stroke: black;
}
.text {
  font-size: 12px;
}
.title-text {
  font-size: 12px;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
