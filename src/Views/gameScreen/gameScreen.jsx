import {useParams} from "react-router-dom";
function GameScreen(){
    //console.log({nickname})
    const {nickname} = useParams();
    return(
         <p> bienvenido {nickname}</p>   
    );
}

export default GameScreen