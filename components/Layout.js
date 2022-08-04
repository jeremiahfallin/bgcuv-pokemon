import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Footer from "./Footer";

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  background-size: 1500px;
  padding: 5px;
  padding: clamp(px, 1vw, 25px);
  @media (max-width: 1100px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`;

const ContentStyles = styled.div`
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}
