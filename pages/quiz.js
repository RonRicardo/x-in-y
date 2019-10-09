//let the link from the eventfinder set the title of the quiz
import Layout from "../comps/layout.js";
import QuizCard from "../comps/quizcard";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";

var md5 = require("js-md5");
const QuizCardNoSSR = dynamic(import("../comps/quizcard"), { ssr: false });

const Quiz = ({ data }) => (
  <Layout>
    <QuizCardNoSSR
      title={data["title"]}
      correctCharacters={data["correctChars"]}
    />
  </Layout>
);

Quiz.getInitialProps = async ({ query }) => {
  var publickey = process.env.PUBLIC_KEY;
  var privatekey = process.env.PRIVATE_KEY;
  var day = new Date();
  const ts = day.getTime();
  var stringToHash = ts + privatekey + publickey;
  var hash = md5(stringToHash);
  const res = await fetch(
    "https://gateway.marvel.com:443/v1/public/events/" +
      query["selected_event"] +
      "?" +
      "&ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash
  );
  const json = await res.json();
  return {
    data: {
      title: json.data.results[0].title,
      correctChars: json.data.results[0].characters.items
    }
  };
};

export default Quiz;
