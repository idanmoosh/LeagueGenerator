import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export const ToggleSwitch = props => {
  const [toggleOn, setToggleOn] = useState(true);

  const handlePress = () => {
    toggleOn ? setToggleOn(false) : setToggleOn(true);
    props.func(toggleOn);
  };

  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity
        onPress={() => {
          handlePress();
        }}>
        <View style={toggleOn ? styles.togglePicked : styles.toggleNotPicked}>
          <Text>{props.valueA}</Text>
        </View>
        <View style={toggleOn ? styles.toggleNotPicked : styles.togglePicked}>
          <Text>{props.valueB}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  toggleContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 12,
    borderWidth: 1,
    justifyContent: 'space-around',
  },
  togglePicked: {
    backgroundColor: '#999',
    width: '100%',
    height: 30,
    margin: 5,
    padding: 5,
  },
  toggleNotPicked: {
    backgroundColor: 'white',
    width: '100%',
    height: 20,
    margin: 10,
  },
});
