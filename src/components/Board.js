import React, { useContext, useEffect, useState } from "react";
import Square from "./Square";
import { TttContext } from "../context/TttContext";
import ScoreCard from "./ScoreCard";
import InfoBanner from "./InfoBanner";

const Board = () =>
{
  const { ttt, setTtt } = useContext(TttContext);
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const noComp = ttt.noComp;
  const firstComp = ttt.firstComp;

  const XorOwin = (arr) =>
  {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic)
    {
      const [a, b, c] = logic;
      if (arr[a] !== null && arr[a] === arr[b] && arr[a] === arr[c])
      {
        return arr[a];
      }
    }
    let valMoves = 0;
    for (let isNull of arr)
    {
      if (isNull === null)
      {
        valMoves++;
      }
    }
    if (valMoves === 0)
    {
      return 1;
    }

    return false;
  }

  const updateScore = (gameWinner) =>
  {
    if (ttt.gameCompleted)
    {
      return;
    }
    if (gameWinner)
    {
      if (gameWinner === "Player")
      {
        setTtt({ ...ttt, playerWins: ttt.playerWins + 1, gameCompleted: true });
      }
      else if (gameWinner === "Computer")
      {
        setTtt({ ...ttt, compWins: ttt.compWins + 1, gameCompleted: true });
      }
      else
      {
        setTtt({ ...ttt, draws: ttt.draws + 1, gameCompleted: true });
      }
    }
  }

  const whoWon = () =>
  {
    // console.log(ttt);
    const p = XorOwin(state);
    let gameWinner = p;
    if (p === "X")
    {
      gameWinner = firstComp ? "Computer" : "Player";
    }
    if (p === "O")
    {
      gameWinner = firstComp ? "Player" : "Computer";
    }
    updateScore(gameWinner);
    return gameWinner;
  }

  const whoWonVal = whoWon();

  const printWinner = () =>
  {
    const p = whoWonVal;
    if (p === "Player" || p === "Computer")
    {
      return `' ${p} ' Won the Game!!`;
    }
    if (p === 1)
    {
      return "Draw :/";
    }
    return p;
  }

  const isWinner = printWinner();

  const futureWin = (validMoves, turnPlayer) =>
  {
    for (let x of validMoves)
    {
      let nuArr = [...state];
      nuArr[x] = turnPlayer;

      const winna = XorOwin(nuArr);
      if (winna === turnPlayer)
      {
        return x;
      }
    }
    return -1;
  }

  // to play with comp
  useEffect(() =>
  {
    if (noComp || isWinner)
    {
      return;
    }

    if ((firstComp && !isXTurn) || (!firstComp && isXTurn))
    {
      return;
    }

    const compPlay = firstComp ? "X" : "O";
    const playerPlay = firstComp ? "O" : "X";

    const validMoves = [];
    for (let i = 0; i < state.length; i++)
    {
      if (state[i] === null)
      {
        validMoves.push(i);
      }
    }

    if (!validMoves)
    {
      return;
    }

    // win if win is possible
    let bestMove = futureWin(validMoves, compPlay);
    // stop loss if loss is possible
    bestMove = bestMove === -1 ? futureWin(validMoves, playerPlay) : bestMove;

    if (bestMove !== -1)
    {
      console.log(bestMove);
      handleClick(bestMove);
    }
    else
    {
      const randMove = Math.floor(Math.random() * validMoves.length);
      console.log(validMoves[randMove]);
      handleClick(validMoves[randMove]);
    }
  }, [isXTurn, state, noComp, firstComp]);

  const handleClick = (index) =>
  {
    if (state[index] !== null)
    {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () =>
  {
    setState(Array(9).fill(null));
    setIsXTurn(true);
    //first Comp
    setTtt({ ...ttt, gameCompleted: false })
  };

  const handlePlayAgain = () =>
  {
    setState(Array(9).fill(null));
    setIsXTurn(true);
    //first Comp
    const px = whoWonVal;
    let ans = ttt.firstComp;
    if (ttt.whoFirstNext === "Winner")
    {
      if (px === "Computer")
      {
        ans = true;
      }
      else if (px === "Player")
      {
        ans = false
      }
    }
    else if (ttt.whoFirstNext === "Looser")
    {
      if (px === "Computer")
      {
        ans = false;
      }
      else if (px === "Player")
      {
        ans = true;
      }
    }

    setTtt({ ...ttt, gameCompleted: false, firstComp: ans });
  };

  const handleMenu = () =>
  {
    console.log(ttt);
    setIsXTurn(true);
    const init = {
      playerWins: 0,
      compWins: 0,
      draws: 0,
      noComp: false,
      firstComp: false,
      whoFirstNext: "none",
      started: false,
      gameCompleted: false,
    }
    setTtt(init);
  };

  return (
    <div className="board-container">
      <div className={isWinner ? "disable-area" : ""}>
        <InfoBanner />
        <ScoreCard />
        <div className="board-row">
          <Square onClick={() => handleClick(0)} value={state[0]} />
          <Square onClick={() => handleClick(1)} value={state[1]} />
          <Square onClick={() => handleClick(2)} value={state[2]} />
        </div>
        <div className="board-row">
          <Square onClick={() => handleClick(3)} value={state[3]} />
          <Square onClick={() => handleClick(4)} value={state[4]} />
          <Square onClick={() => handleClick(5)} value={state[5]} />
        </div>
        <div className="board-row">
          <Square onClick={() => handleClick(6)} value={state[6]} />
          <Square onClick={() => handleClick(7)} value={state[7]} />
          <Square onClick={() => handleClick(8)} value={state[8]} />
        </div>
        <button className="menu-btn-cont" onClick={handleMenu}>Back to Menu</button>
        <button className="menu-btn-cont" onClick={handleReset}>Reset Board</button>
      </div>

      {isWinner ? (
        <div className={"victory" + whoWonVal}>
          <div className="comp-text">{isWinner}</div>
          <br />
          <button className="menu-btn" onClick={handleMenu}>Menu</button>
          <button className="play-again-btn" onClick={handlePlayAgain}>Play Again?</button>
        </div>
      ) : (<></>)}
    </div>
  );
};

export default Board;
