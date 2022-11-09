import { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PlayerTag } from './playerTag';
import { PlayerInputField } from './PlayerInputField';
import { ToggleSwitch } from './ToggleSwitch';

export const Settings = ({ navigation }) => {
  const [press, setPress] = useState(false);
  const [teamSize, setTeamSize] = useState(1);
  const [competitionType, setCompetitionType] = useState('ST');
  const [players, setPlayers] = useState([]);

  const params = {
    playres: players,
    teamSize: teamSize,
    competitionType: competitionType,
  };

  const addPlayer = player => {
    if (player == null) return;
    setPlayers([...players, player]);
  };

  const deletePlayer = deleteIndex => {
    setPlayers(players.filter((value, index) => index != deleteIndex));
  };

  const handleSubmit = () => {
    handlePress();
    navigation.navigate('Tournament', { params: params });
  };
  const handlePress = () => {
    press ? setPress(false) : setPress(true);
  };

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.toggleContainer}>
          <ToggleSwitch
            title='Team Size'
            valueA='2 V 2'
            valueB='1 V 1'></ToggleSwitch>
          <ToggleSwitch
            title='Tournament Rules'
            valueA='House Rules'
            valueB='Standard Rules'></ToggleSwitch>
        </View>

        <View style={styles.inputField}>
          <PlayerInputField addPlayer={addPlayer} />
        </View>

        <View style={styles.playerList}>
          {players.map(i => {
            return (
              <PlayerTag
                name={i}
                deletePlayer={deletePlayer}
                key={`${players.indexOf(i)}`}
                id={`${players.indexOf(i)}`}
              />
            );
          })}
        </View>
        <TouchableOpacity onPressIn={handleSubmit} onPressOut={handlePress}>
          <Text style={press ? styles.buttonPress : styles.button}>
            Start Tournament
          </Text>
        </TouchableOpacity>

        <StatusBar style='auto' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignContent: 'stretch',
  },
  toggleContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 30,
    padding: 12,
  },
  inputField: {
    margin: 15,
  },
  playerList: {
    margin: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  button: {
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
    width: 200,
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    borderWidth: 1,
    padding: 5,
    borderRadius: 6,
    fontSize: 15,
    margin: 20,
    backgroundColor: '#999',
  },
});
