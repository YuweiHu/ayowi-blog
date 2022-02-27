import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";

const HomeContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  return (
    <Layout>
      <HomeContainer>Ayowi Blog</HomeContainer>
    </Layout>
  );
}
