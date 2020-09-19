import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
// import fetch from "node-fetch";
import { GetStaticProps } from "next";

interface PostData {
  date: string;
  title: string;
  id: string;
}

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  console.log(allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          20 years a developer, 21 years a father, 28 years working for a
          pension. Learning Next for work, and it's quite nice. 😄
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={"posts/" + id}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /* const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  console.log('posts', posts);
  return {
    props: {
      posts,
    },
  }; */
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
};
