import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { setTeamId } from '../features/playersSlice';
import { useDispatch } from 'react-redux';
import { selectPlayers } from '../features/playersSlice';

import {
  shuffleArray,
  sortTeamsbyGame,
  pickTwoPlayers,
} from '../util/gamingUtil';

export const GameModule = props => {
  const dispatch = useDispatch();
  const [press, setPress] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const { playingSingles, playingStandard, playersWithStats } = props;
  const store = useSelector(state => state.root.playersSlice.players);

  const pickTwoTeams = store => {
    const sortedPlayers = sortTeamsbyGame(store);
    const teamA = [sortedPlayers[0]];
    let teamB = [];
    console.log(sortedPlayers);
    for (let i = 1; i < 3; i++) {
      if (sortedPlayers[i].teamId === teamA[0].teamId) {
        teamA[1] = sortedPlayers[i];
      } else {
        teamB.push(sortedPlayers[i]);
      }
    }
    if (teamA.length !== 2) {
      teamA[1] = findTeammate(sortedPlayers, teamA[0].teamId, teamA[0][id]);
    }
    console.log('teamA');
    console.log(teamA);
    console.log('teamB');
    console.log(teamB);
    console.log(teamB);
    if (teamB.length !== 2) {
      teamB[1] = findTeammate(sortedPlayers, teamB[0].teamId, teamB[0][id]);
    }

    teamB[1] = sortedPlayers.filter(player => {
      player.id !== teamB[0].id && player.teamId === teamB[0].teamId;
    });

    let teams = teamA + teamB;
    console.log('teams ' + teams);
    return teams;
  };

  const splitToTeams = players => {
    console.log(players);
    let playersList = [...players];
    playersList = shuffleArray(playersList);
    playersList.map(player => {
      if (playersList.indexOf(player) % 2 === 0) {
        setTeamId(playersList.indexOf(player) + 1);
      } else {
        setTeamId(playersList.indexOf(player));
      }
    });
    return playersList;
  };

  const divideToTwo = arr => {
    try {
      setTeamA(arr[0], arr[1]);
      setTeamB(arr[2], arr[3]);
    } catch (err) {
      console.log(err);
    }
  };

  const findTeammate = (players, teamId, playerId) => {
    const otherTeamMember = players.find((value, index) => {
      players[index].id !== playerId && players[index].teamId === teamId;
    });
    return otherTeamMember;
  };

  const getTeams = () => {
    const players = useSelector(selectPlayers);
  };

  const setToTeams = array => {
    let newArray = [...array];
    newArray = shuffleArray(newArray);
    const arrayHalf = Math.round(Math.floor(array.length / 2));
    for (let i = 0; i < newArray.length + 1; i++) {
      try {
        if (i < arrayHalf) {
          dispatch(setTeamId({ name: newArray[i].name, teamNo: i + 1 }));
        }
        if (i >= arrayHalf) {
          dispatch(
            setTeamId({ name: newArray[i].name, teamNo: i + 1 - arrayHalf })
          );
        }
      } catch (err) {
        return err;
      }
    }
    return newArray;
  };

  const handleNewGame = () => {
    if (!gameOn) {
      setGameOn(true);
      console.log('hello hello ');
      if (!playingSingles) {
        // need to understand why the store do not update
        setToTeams(store);
        let twoTeams = pickTwoTeams(store);
        divideToTwo(twoTeams);
      } else if (playingSingles) {
        console.log('hello singles ');

        setTeamA(teams[0]);
        setTeamB(teams[1]);
      }
    } else if (gameOn) {
      if (playingSingles) {
        let teams = pickTwoPlayers(store);
        console.log('hello 1 ');

        setTeamA(teams[0]);
        setTeamB(teams[1]);
      } else if (playingStandard && !playingSingles) {
        console.log('hello 2 ');
        let teams = pickTwoTeams(store);
        divideToTwo(teams);
      } else if (!playingStandard && !playingSingles) {
        let newTeams = setToTeams(store);
        let teams = pickTwoTeams(newTeams);
        console.log('hello 3 ');
        divideToTwo(teams);
      }
    }
  };

  console.log(
    'team A ' +
      teamA +
      ',' +
      'team B ' +
      teamB +
      ',' +
      'playing Standard ' +
      playingStandard +
      ',' +
      'playing Singles ' +
      playingSingles +
      ','
  );

  const handleScoreSubmit = () => {};
  const handlePress = () => {
    press ? setPress(false) : setPress(true);
  };
  return (
    <View style={styles.playerContainer}>
      <Text style={styles.title}>GAME MODULE</Text>
      <TouchableOpacity onPressIn={handlePress} onPress={handleNewGame}>
        <Text style={press ? styles.buttonPress : styles.button}>NEW GAME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={handlePress}
        onPress={() => {
          setGameOn(false);
        }}>
        <Text style={press ? styles.buttonPress : styles.button}>
          END TOURNAMENT
        </Text>
      </TouchableOpacity>
      <View style={press ? styles.gameScreen : styles.buttonPress}>
        <Text style={styles.gameTitle}>Game Between</Text>
        <View style={styles.teamTitle}>
          {/*teamA.map(player => (
            <Text key={player.name + player.id} style={styles.team}>
              {player.name}
            </Text>
          ))*/}
          <Text style={styles.team}> VS </Text>

          {/*teamB.map(player => (
            <Text key={player.name + player.id} style={styles.team}>
              {player.name}
            </Text>
          ))*/}
        </View>
        <View style={styles.score}>
          <TextInput
            style={styles.input}
            onChangeText={value => {
              setScoreA(value);
            }}
            value={scoreA}
            placeholder='score'
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={value => {
              setScoreB(value);
            }}
            value={scoreB}
            placeholder='score'
            keyboardType='numeric'
          />
        </View>
        <TouchableOpacity
          onPressIn={handleScoreSubmit}
          onPressOut={handlePress}>
          <Text style={press ? styles.button : styles.buttonPress}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    padding: 5,
  },
  playerContainer: {
    maxHeight: '50%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginTop: 5,
  },
  button: {
    maxHeight: 40,
    minHeight: 35,
    width: 200,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    borderWidth: 1,
    padding: 5,
    borderRadius: 6,
    fontSize: 15,
    margin: 20,
  },
  buttonPress: {
    display: 'none',
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    width: 100,
    textAlign: 'center',
  },
  gameTitle: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  teamTitle: {
    borderWidth: 1,
    minWidth: 300,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  score: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gameScreen: {
    marginTop: 40,
    minHeight: 200,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  team: { paddingRight: 20 },
});
