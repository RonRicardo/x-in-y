import React, { Component } from "react";
import Router from "next/router";
import { Button, Segment } from "semantic-ui-react";
import _ from "lodash";
if (typeof window !== "undefined") {
  var ReactCountdownClock = require("react-countdown-clock");
}
import NoSSR from "react-no-ssr";

const buttonStyle = {
  lineHeight: "100px",
  padding: "10px"
};

const clockStyle = {
  padding: "10px",
  margin: "0",
  display: "flex",
  alignSelf: "center",
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const quizBoxStyle = {
  display: "flex",
  alignContent: "center"
};

const overAllStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column"
};
class QuizCard extends Component {
  state = {
    score: 0,
    allCharacterList: [],
    correctCharacterList: [],
    quizChoices: [],
    currentChar: 0,
    turns: 1,
    loading: true
  };

  componentDidMount() {
    this.setState({
      correctCharacterList: this.characterFormatter(
        this.props.correctCharacters
      )
    });
    fetch(
      "https://gateway.marvel.com:443/v1/public/characters?limit=30&apikey=f65bfa900e1a862f17f5ede3e6e01bb8"
    )
      .then(r => r.json())
      .then(r =>
        this.setState({
          allCharacterList: this.characterFormatter(r.data.results)
        })
      )
      .then(r =>
        this.setState(state => ({
          quizChoices: _.shuffle(
            _.union(state.allCharacterList, state.correctCharacterList)
          )
        }))
      );
  }

  characterFormatter = characterList => {
    return characterList.map(character => character.name);
  };

  handleYes = e => {
    if (
      _.includes(
        this.state.correctCharacterList,
        this.state.quizChoices[`${this.state.currentChar}`]
      )
    ) {
      this.setState((previousState, currentProps) => {
        return { score: previousState.score + 1 };
      });
    }
    this.setState((previousState, currentProps) => {
      return {
        currentChar: previousState.currentChar + 1,
        turns: previousState.turns + 1
      };
    });
  };

  handleNo = e => {
    if (
      !_.includes(
        this.state.correctCharacterList,
        this.state.quizChoices[`${this.state.currentChar}`]
      )
    ) {
      this.setState((previousState, currentProps) => {
        return { score: previousState.score + 1 };
      });
    }
    this.setState((previousState, currentProps) => {
      return {
        currentChar: previousState.currentChar + 1,
        turns: previousState.turns + 1
      };
    });
  };

  gameOver = () => {
    Router.push({
      pathname: "/results",
      query: { score: this.state.score }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.quizChoices.length === this.state.turns) {
      this.gameOver();
    }
  }

  render() {
    return (
      <div style={overAllStyle}>
        <h1>
          Was{" "}
          <span className="altcolor">
            {this.state.quizChoices[`${this.state.currentChar}`]}
          </span>{" "}
          in {this.props.title}?
        </h1>
        <ReactCountdownClock
          seconds={3100000}
          color="#2A75B3"
          alpha={0.9}
          size={300}
          onComplete={this.gameOver}
        />
        <div className="quiz-buttons" style={buttonStyle}>
          <Button color="blue" onClick={this.handleYes}>
            Yes
          </Button>
          <Button color="red" onClick={this.handleNo}>
            No
          </Button>
        </div>
        <style global jsx>{`
          .react-countdown-clock {
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}

export default QuizCard;
