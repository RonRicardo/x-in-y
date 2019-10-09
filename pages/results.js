import Layout from "../comps/layout.js";
import React from "react";
import Link from "next/link";
import { Button } from "semantic-ui-react";

const Results = query => (
  <Layout>
    <div>
      <h1> Your score was... {query.score} !</h1>
      <Link prefetch href="/eventfinder">
        <Button color="blue">Play again?</Button>
      </Link>
    </div>
  </Layout>
);

Results.getInitialProps = ({ query }) => {
  return { score: query.score };
};

export default Results;
