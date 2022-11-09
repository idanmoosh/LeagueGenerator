import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const PlayerTag = props => {
  const handleDelete = () => {
    props.deletePlayer(props.id);
  };

  return (
    <View style={styles.playerTag}>
      <Text style={styles.name}>{props.name}</Text>
      <TouchableOpacity onPress={() => handleDelete()}>
        <View style={styles.button}>
          <MaterialIcons
            style={styles.delete}
            name='cancel'
            size={18}
            color='#555'
          />
        </View>
      </TouchableOpacity>
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
