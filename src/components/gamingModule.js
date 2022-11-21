import { useState, useEffect } from 'react';
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

  const handleNewGame = () => {
    if (playingSingles) {
      setSinglesMatch();
      if (!gameOn) {
        setGameOn(true);
      }
    }
    if (!playingSingles && playingStandard) {
      setStandardMatch();
    }
    if (!playingSingles && !playingStandard) {
      setRandomMatch();
    }
  };

  const setSinglesMatch = () => {
    let players = [...store];
    players = shuffleArray(players);
    players = sortPlayersBy('games');
    setTeamA([players[0]]);
    setTeamB([players[1]]);
    return;
  };
  const setStandardMatch = () => {};
  const setRandomMatch = () => {
    setTeams(store).then(res => console.log(res));
  };

  const sortPlayersBy = category => {
    let players = [...store];
    players.sort((p1, p2) => {
      p1[category] < p2[category] ? 1 : p1[category] > p2[category] ? -1 : 0;
    });
    return players;
  };
  const shuffleArray = array => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  const setTeams = async () => {
    let players = [...store];
    players = shuffleArray(players);

    await players.map(player => {
      dispatch(
        setTeamId({
          id: player.id,
          teamNo: Math.round(Math.ceil(players.indexOf(player) / 2 + 0.1)),
        })
      );
    });
    return players;
  };
  const chooseTeams = () => {};

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
          {teamA.map(player => (
            <Text key={player.name + player.id} style={styles.team}>
              {player.name}
            </Text>
          ))}
          <Text style={styles.team}> VS </Text>

          {teamB.map(player => (
            <Text key={player.name + player.id} style={styles.team}>
              {player.name}
            </Text>
          ))}
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
