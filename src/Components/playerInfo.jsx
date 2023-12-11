function PlayersInfo({playerOneName, playerTwoName, games, winsPlayerOne, winsPlayerTwo}){
    return(
        <div>
            <h3>Games played : {games}</h3>
            <h3>Games won by {playerOneName.toUpperCase()} : {winsPlayerOne}</h3>
            <h3>Games won by {playerTwoName.toUpperCase()} : {winsPlayerTwo}</h3>
        </div>
    );
}

export default PlayersInfo;