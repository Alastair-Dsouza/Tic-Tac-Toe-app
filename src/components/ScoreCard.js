import React, { useContext } from 'react';
import { TttContext } from '../context/TttContext';

const ScoreCard = () => {
    const {ttt, setTtt} = useContext(TttContext);
    return (
        <div>
            <table className='score-card'>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Draws</th>
                        <th>Computer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ttt.playerWins}</td>
                        <td>{ttt.draws}</td>
                        <td>{ttt.compWins}</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
}

export default ScoreCard;
