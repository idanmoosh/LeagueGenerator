import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
export const GameModule = props => {
  const [press, setPress] = useState(false);
  const store = useSelector(state => state.root.playersSlice.players);

  const {
    teamA,
    teamB,
    setTeamA,
    setTeamB,
    scoreA,
    scoreB,
    setScoreA,
    setScoreB,
    handleEndTournament,
    handleNewGame,
    handleScoreSubmit,
  } = props;

  const handlePress = () => {
    press ? setPress(false) : setPress(true);
  };

  return (
    <View style={styles.playerContainer}>
      <Text style={styles.title}>GAME MODULE</Text>
      <TouchableOpacity onPressIn={handlePress} onPress={handleNewGame}>
        <Text style={press ? styles.buttonPress : styles.button}>NEW GAME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPressIn={handlePress} onPress={handleEndTournament}>
        <Text style={press ? styles.buttonPress : styles.button}>
          END TOURNAMENT
        </Text>
      </TouchableOpacity>
      <View style={press ? styles.gameScreen : styles.buttonPress}>
        <Text style={styles.gameTitle}>Game Between</Text>
        <View style={styles.teamTitle}>
          {teamA ? (
            teamA.map(player => (
              <Text key={player.name + player.id} style={styles.team}>
                {player.name}
              </Text>
            ))
          ) : (
            <Text style={styles.team}> undefined</Text>
          )}
          <Text style={styles.team}> VS </Text>

          {teamB ? (
            teamB.map(player => (
              <Text key={player.name + player.id} style={styles.team}>
                {player.name}
              </Text>
            ))
          ) : (
            <Text style={styles.team}> undefined</Text>
          )}
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
          onPressIn={e => {
            e.preventDefault();
            handleScoreSubmit(teamA, teamB, scoreA, scoreB);
          }}
          onPressOut={handlePress}
          disabled={!scoreA || !scoreB}>
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
    flexDirection: 'column',
    justifyContent: 'space-around',
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

export default GameModule;
