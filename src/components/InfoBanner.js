import React, { useContext } from 'react';
import { TttContext } from '../context/TttContext';

const InfoBanner = () => {
    const {ttt} = useContext(TttContext);
    return (
        <div>  
            <p>{ttt.noComp? "Player Vs Player" : "Player Vs Comp  "}</p>
            <p>
                {ttt.whoFirstNext==="none"? 
                (ttt.firstComp? "Computer goes First " : "Player goes First ")
                : (ttt.whoFirstNext + " goes First")}
            </p>
            <p className='txt-bld'>{"Player plays " + (ttt.firstComp? "O": "X")}</p>
        </div>
    );
}

export default InfoBanner;
