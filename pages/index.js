import Layout from "../comps/layout.js";
import { Button } from "semantic-ui-react";

import Link from "next/link";

const Index = () => (
  <Layout>
    <div>
      <style jsx>
        {`
          h1 {
            font-family: benton-sans, sans-serif;
            font-style: normal;
            font-weight: 800;
            text-shadow: 2px 2px 5px yellow;
          }
        `}
      </style>
      <h1>Was X in Y?</h1>
      <h3>Test your knowledge of your favorite Marvel events!</h3>
      <br />
      <Link prefetch href="/eventfinder">
        <Button color="yellow">Start</Button>
      </Link>
    </div>
  </Layout>
);

export default Index;
