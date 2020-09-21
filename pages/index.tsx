import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData, getExternalData } from "../lib/posts";
// import fetch from "node-fetch";
import { GetStaticProps } from "next";

interface PostData {
  date: string;
  title: string;
  id: string;
}

interface ExternalData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Home({
  allPostsData,
  externalData,
}: {
  allPostsData: PostData[];
  externalData: ExternalData[];
}) {
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Mock</h2>
        <ul className={utilStyles.list}>
          {externalData &&
            externalData.map(({ userId, id, title, body }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={"external/" + id}>
                  <a>{title}</a>
                </Link>
                <p>{body}</p>
              </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const externalData: ExternalData[] = await getExternalData();
  const allPostsData: PostData[] = getSortedPostsData();
  return { props: { allPostsData, externalData } };
};
