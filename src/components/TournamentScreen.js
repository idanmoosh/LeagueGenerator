import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const TournamentScreen = props => {
  return (
    <View style={styles.playerTag}>
      <Text style={styles.name}>Tournament</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerTag: {
    borderWidth: 1,
    borderRadius: 6,
    margin: 2,
    width: 50,
    marginHorizontal: 5,
  },
  name: {
    color: 'black',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  delete: {
    textAlign: 'center',
  },
});
