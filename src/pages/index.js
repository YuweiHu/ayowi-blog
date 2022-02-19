import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageBody() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 60px)",
        backgroundImage: `url(/img/cloud.jpeg)`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <div
        style={{
          width: "1000px",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "20px",
          border: "2px solid #E3E3E3",
          fontFamily: "sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "100px" }}>Work In Progress...</span>
      </div> */}
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageBody />
    </Layout>
  );
}
