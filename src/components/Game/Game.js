import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import WordInputForm from "../WordInputForm/wordInputForm";
import GuessResults from "../GuessResults/GuessResults";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessList, setGuessList] = React.useState([]);
  const [showBanner, setShowBanner] = React.useState(false);
  const [banner, setBanner] = React.useState();

  const happyBanner = (numOfGuesses) => (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>{" " + numOfGuesses} guesses</strong>.
      </p>
    </div>
  );

  const sadBanner = (answer) => (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );

  const handleAddGuess = (guess) => {
    const newGuestList = [...guessList, guess];
    setGuessList((guessList) => newGuestList);
    if (guess === answer) {
      setBanner(happyBanner(newGuestList.length));
      setShowBanner(true);
    }
    if (newGuestList.length === NUM_OF_GUESSES_ALLOWED && guess !== answer) {
      setBanner(sadBanner(answer));
      setShowBanner(true);
    }
  };

  return (
    <>
      {showBanner && banner}
      <GuessResults guessList={guessList} answer={answer} />
      <WordInputForm handleAddGuess={handleAddGuess} />
    </>
  );
}

export default Game;
