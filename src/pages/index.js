import { useEffect } from "react";
import styled from "styled-components";
import useBaseUrl from "@docusaurus/useBaseUrl";

const HomeContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  const url = useBaseUrl("/blog");
  useEffect(() => {
    window.location.href = url;
  }, []);
  return null;
}
