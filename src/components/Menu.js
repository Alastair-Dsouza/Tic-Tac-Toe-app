import React, { useState, useContext } from 'react';
import { TttContext } from '../context/TttContext';
import Board from './Board';

const Menu = () => {
    const {ttt, setTtt} = useContext(TttContext);

    const startGame = () => {
        console.log(ttt);
        setTtt({
            ...ttt,
            noComp: inputs.compOrNot==="Computer"? false : true,
            firstComp: inputs.whoFirst==="Player"? false : true,
            whoFirstNext: inputs.nextPlayer,
            started : true,
        });
    }
    
    const [inputs, setInputs] = useState({compOrNot:"Computer", whoFirst:"Player", nextPlayer:
"none"});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        startGame();
    }

    return (
        <div className="board-container">
            <div className="header"> Tic-Tac-Toe 2 </div>
            {ttt.started? 
                <Board/> :
                <>
                    <form className="dd-form">
                    <label>Player2:
                    <select 
                        className="dd-form"
                        name="compOrNot" 
                        value={inputs.compOrNot} 
                        onChange={handleChange}
                    >
                        <option value="Computer">Computer</option>
                        <option value="2 Player">2 Players</option>
                    </select>
                    </label>

                    <label>Who Goes First:
                    <select
                        className="dd-form"
                        name="whoFirst" 
                        value={inputs.whoFirst} 
                        onChange={handleChange}
                    >
                        <option value="Player">Player</option>
                        <option value="Computer">Computer</option>
                    </select>
                    </label>

                    <label>Next Player:
                    <select
                        className="dd-form"
                        name="nextPlayer" 
                        value={inputs.nextPlayer} 
                        onChange={handleChange}
                    >
                        <option value="none">No Change</option>
                        <option value="Winner">Winner</option>
                        <option value="Looser">Looser</option>
                    </select>
                    </label>
                    <button className="main-menu-btn" onClick={handleSubmit}>Start Game</button>
                    </form>
                </>
            }
        </div>
    );
}

export default Menu;
