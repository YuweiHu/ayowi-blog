import React from "react";
import styled from "styled-components";
import Layout from "@theme/Layout";
import useMediaQuery from "@mui/material/useMediaQuery";

const HomeContainer = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 40px;
`;
const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-right: white;
`;
const Card = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};
  justify-content: space-between;
  align-self: center;
`;
const PortfolioContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  padding: 40px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  overflow-y: scroll;
`;
const ImageContainer = styled.div`
  width: ${(props) => (props.matches ? "300px" : "200px")};
  height: ${(props) => (props.matches ? "300px" : "200px")};
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;

  transition: border-color 1s ease;

  > span {
    display: none;
  }
  &:hover {
    opacity: 0.9;
    border: 2px solid;

    > span {
      width: 80%;
      background-image: url("./img/white-2.png");
      background-size: 100% 66px;
      text-align: center;
      display: block;
      color: black;
      font-family: Dosis;
      font-size: 40px;
    }
  }
`;
const DescriptionContainer = styled.div`
  width: 100%;
  text-align: right;
  padding: 8px;
  font-size: 20px;
  font-family: Dosis, sans-serif;
`;
const StyledBtn = styled.div`
  width: fit-content;
  padding: 4px;
  font-family: Dosis, sans-serif;
  border: 1px solid;
  border-radius: 10px;
`;

export default function Portfolio() {
  const matches = useMediaQuery("(min-width:996px)");
  const matches2 = useMediaQuery("(min-width:700px)");
  return (
    <Layout>
      <HomeContainer>
        <Block>
          <div
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "end",
              flexBasis: "100px",
            }}
          >
            <div
              style={{
                position: "relative",
                top: `${matches ? "-50px" : "-35px"}`,
                left: `${matches ? "100px" : "40px"}`,
                fontSize: `${matches ? "60px" : "40px"}`,
                width: "fit-content",
                backgroundColor: "white",
                paddingLeft: "10px",
                fontFamily: "Dosis, sans-serif",
              }}
            >
              PORT
            </div>
            <div
              style={{
                position: "relative",
                top: "0px",
                fontSize: `${matches ? "60px" : "40px"}`,
                width: "fit-content",
                backgroundColor: "transparent",
                // borderBottom: "2px solid",
                fontFamily: "Dosis, sans-serif",
              }}
            >
              FOLIO
            </div>
          </div>

          <PortfolioContainer>
            <Card>
              <ImageContainer matches={matches} url="./img/beats.jpg">
                <span>DEMO</span>
              </ImageContainer>
              <DescriptionContainer>
                A simple beats-maker app.
                <br />
                Build by HTML / CSS / JavaScript.
              </DescriptionContainer>
            </Card>
            <Card reverse={matches2 ? true : false}>
              <ImageContainer matches={matches} url="./img/food.jpg">
                <span>DEMO</span>
              </ImageContainer>
              <DescriptionContainer>
                A simple beats-maker app.
                <br />
                Build by HTML / CSS / JavaScript.
              </DescriptionContainer>
            </Card>
            <Card>
              <ImageContainer
                matches={matches}
                url="./img/paper.jpg"
                onClick={() => window.open("https://ayowi-blog.netlify.app/")}
              >
                <span>DEMO</span>
              </ImageContainer>
              <DescriptionContainer>
                A simple beats-maker app.
                <br />
                Build by HTML / CSS / JavaScript.
              </DescriptionContainer>
            </Card>
          </PortfolioContainer>
        </Block>
      </HomeContainer>
    </Layout>
  );
}
