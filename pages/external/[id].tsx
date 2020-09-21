import Head from "next/head";
import Layout from "../../components/layout";
import { getExternalPostIds, getExternalPost } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths, GetStaticProps } from "next";

interface ExternalData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function External({
  externalData,
}: {
  externalData: ExternalData;
}) {
  return (
    <Layout>
      <Head>
        <title>{externalData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{externalData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: externalData.body }}></div>
      <img src="/images/me.jpg" alt="" />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getExternalPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const externalData: ExternalData = await getExternalPost(params.id as string);
  return {
    props: {
      externalData,
    },
  };
};
