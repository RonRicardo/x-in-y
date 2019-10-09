import Layout from "../comps/layout.js";

import EventSearch from "../comps/eventSearch";

const EventFinder = () => (
  <Layout>
    <div>
      <h1>Enter name of event!</h1>
      <h2>Start typing below...</h2>
      <EventSearch />
    </div>
  </Layout>
);

export default EventFinder;
