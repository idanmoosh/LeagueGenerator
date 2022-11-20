import { View, Text, StyleSheet, TextInput } from 'react-native';

export const PlayerStats = props => {
  const { id, name, points, wins, losses, draws, games, teamId } = props.player;

  return (
    <View style={styles.playerContainer}>
      <Text style={styles.param}>{teamId}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.param}>{points}</Text>
      <Text style={styles.param}>{wins}</Text>
      <Text style={styles.param}>{losses}</Text>
      <Text style={styles.param}>{draws}</Text>
      <Text style={styles.param}>{games}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxHeight: 30,
    paddingVertical: 5,
    marginTop: 5,
  },
  name: {
    height: 30,
    width: 50,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  param: { height: 30, textAlign: 'center' },
});
