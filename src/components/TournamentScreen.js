import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { PlayerStats } from './playerStats';
import { TournamentTableHeader } from './TournamentTableHeader.js';

import { setCounter, updateState } from '../features/playersSlice';
import utils from '../util/gamingUtil';
import { setTeamId } from '../features/playersSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GameModule } from './gamingModule';

export const TournamentScreen = ({ route }) => {
  const { params } = route.params;
  const playingStandard = params.competitionType;
  const players = params.players;
  const playingSingles = params.teamSize;
  const dispatch = useDispatch();
  const playersList = [];

  //variables for the game
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(1);

  const addingPlayers = array => {
    array.map(player => {
      playersList.push(utils.createPlayer(player));
    });
  };

  const store = useSelector(state => state.root.playersSlice.players);
  const counter = useSelector(state => state.root.playersSlice.gameCounter);

  //handling new Game
  const handleNewGame = () => {
    setGamesPlayed(gamesPlayed + 1);
    if (playingSingles) {
      setSinglesMatch();
    }
    if (!playingSingles && playingStandard) {
      setStandardMatch();
    }
    if (!playingSingles && !playingStandard) {
      setRandomMatch();
    }
  };
  //single match initialization
  const setSinglesMatch = () => {
    dispatch(setTeamsZero());
    let players = [...store];
    players = utils.shuffleArray(players);
    players = utils.sortPlayersBy('games', store);
    setTeamA([players[0]]);
    setTeamB([players[1]]);
  };
  //standardMatch initialization
  const setStandardMatch = () => {
    chooseTeams(store);
  };

  const setRandomMatch = () => {
    if (gamesPlayed !== 1) {
      dispatch(setTeamId());
    }
    chooseTeams(store);
  };

  const chooseTeams = store => {
    let players = [...store];
    players = utils.sortPlayersBy('games', store);
    players = utils.sortPlayersBy('teamId', store);

    let teams = players.map(player => player.teamId);
    teams = utils.removeDuplicates(teams);
    setTeamA(players.filter(player => player.teamId === teams[0]));
    setTeamB(players.filter(player => player.teamId === teams[1]));
  };
  const handleScoreSubmit = (teamA, teamB, scoreA, scoreB) => {
    let players = [...store];
    console.log('score submission');
    players[0].games = 5;
    players[1].games = 5;
    console.log([players[0], players[1]]);
    /* if (scoreA === scoreB) {
      console.log('its a draw');
      players.forEach(player => {
        if (player.teamId === idA || player.teamId === idB) {
          player.games++;
          player.draws++;
          player.points++;
          console.log([idA, idB]);
          console.log(player);
        }
      });
    } else if (scoreA > scoreB) {
      console.log('team A won');
      players.forEach(player => {
        if (player.teamId === idA) {
          player.games++;
          player.wins++;
          player.points = player.points + 3;
        } else if (player.teamId === idB) {
          player.games++;
          player.wins++;
          player.points = player.points + 3;
        }
      });
    } else if (scoreA < scoreB) {
      console.log('team B won');
      players.forEach(player => {
        if (player.teamId === idB) {
          player.games++;
          player.wins++;
          player.points = player.points + 3;
        } else if (player.teamId === idA) {
          player.games++;
          player.wins++;
          player.points = player.points + 3;
        }
      });
    }*/
    dispatch(updateState(players));
    setScoreA('');
    setScoreB('');
  };

  const handleEndTournament = () => {
    setGamesPlayed(0);
    dispatch(setCounter({ value: 0 }));
  };

  useEffect(() => {
    addingPlayers(players);
    dispatch(updateState(playersList));
    if (!playingSingles) {
      dispatch(setTeamId(players));
    }
  }, [players, playingSingles]);

  useEffect(() => {
    if (counter !== gamesPlayed) {
      chooseTeams(store);
      dispatch(setCounter({ value: gamesPlayed }));
    }
  }, [counter, gamesPlayed, store]);

  return (
    <View style={styles.tournamentScreen}>
      <View style={styles.tournamentSection}>
        <TournamentTableHeader />
        {store.map(player => {
          return <PlayerStats key={player.name} player={player} />;
        })}
        <GameModule
          teamA={teamA}
          teamB={teamB}
          scoreA={scoreA}
          scoreB={scoreB}
          setScoreA={setScoreA}
          setScoreB={setScoreB}
          handleNewGame={handleNewGame}
          handleEndTournament={handleEndTournament}
          handleScoreSubmit={handleScoreSubmit}
          gamesPlayed={gamesPlayed}
          setTeamA={setTeamA}
          setTeamB={setTeamB}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tournamentScreen: { flex: 1 },
  tournamentSection: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    marginHorizontal: 12,
  },
  gameModule: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    marginHorizontal: 12,
  },
});
