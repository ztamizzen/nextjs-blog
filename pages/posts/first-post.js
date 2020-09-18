import Head from "next/head";
import Layout from "../../components/layout";

import styles from "./alert.module.css";
import cn from "classnames";

export default function FirstPost() {
  let type = "success";
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2
        className={cn({
          [styles.success]: type === "success",
          [styles.error]: type === "error",
        })}
      >
        Styled
      </h2>
    </Layout>
  );
}
