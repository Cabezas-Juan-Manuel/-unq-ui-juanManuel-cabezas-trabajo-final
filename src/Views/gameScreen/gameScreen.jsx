import { useState } from "react";
import {useParams} from "react-router-dom";
import { BattleField } from '../../Objects/battlefield';
import PlayerField from "../../Components/playerField";

function GameScreen(){
    const {nickname} = useParams();

    const [firstPlayerBattlefield, setfirstPlayerBattlefield] = useState(new BattleField(11, 11));

    const [secondPlayerBattlefield, setsecondPlayerBattlefield] = useState(new BattleField(11, 11));

    const [placementFase, setplacementFase] = useState(true);
    
    return(
        <>
         <p> bienvenido {nickname}</p>
         <PlayerField battleField={firstPlayerBattlefield.board} />   
        </>
    );
}

export default GameScreen