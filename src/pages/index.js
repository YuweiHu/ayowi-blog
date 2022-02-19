import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    // <header className={clsx("hero hero--primary", styles.heroBanner)}>
    //   <div className="container">
    //     <h1 className="hero__title">{siteConfig.title}</h1>
    //     <p className="hero__subtitle">{siteConfig.tagline}</p>
    //   </div>
    // </header>
    <div
      style={{ color: "red" }}
      // style={{
      //   width: "100%",
      //   height: "calc(100% - 60px)",
      //   backgroundImage: `url(/img/123.jpeg)`,
      // }}
    >
      hshs
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  );
}
