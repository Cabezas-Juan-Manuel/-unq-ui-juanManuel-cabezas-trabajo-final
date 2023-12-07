import { useState } from "react";
import {useParams} from "react-router-dom";
import { BattleField } from '../../Objects/battlefield';
import PlayerField from "../../Components/playerField";
import ShipSelectionBoard from "../../Components/shipSelectionBoard";
import { Button } from "react-bootstrap";

function GameScreen(){
    const {nickname} = useParams();

    const [firstPlayerBattlefield, setfirstPlayerBattlefield] = useState(new BattleField(11, 11));

    const [secondPlayerBattlefield, setsecondPlayerBattlefield] = useState(new BattleField(11, 11));

    const [placementFase, setplacementFase] = useState(true);

    const [selectedShip, setSelectedShip] = useState(null);


    const finishPlacementFase = () => {
        setplacementFase(false);
    }

    
    return(
        <>
         
         {placementFase ? (
            <>
            <h1 className="title-text">PLACE YOUR SHIPS</h1>
            <ShipSelectionBoard onSelectShip={(ship) => setSelectedShip(ship)} />
            <PlayerField battleField={firstPlayerBattlefield.board}/>
            <Button onClick = {finishPlacementFase}>BATTLE!</Button>
            </> 
         ):(
            <PlayerField battleField={firstPlayerBattlefield.board} /> 
         )
         
         }
           
        </>
    );
}

export default GameScreen