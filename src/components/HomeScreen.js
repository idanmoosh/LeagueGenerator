import { useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Pressable } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const [press, setPress] = useState(false);

  const handlePress = () => {
    press ? setPress(false) : setPress(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>League Generator</Text>
      <Text style={styles.description}>
        To start a tournament press "Tournament Setup"
      </Text>
      <Pressable
        onPressIn={handlePress}
        onPressOut={handlePress}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={press ? styles.buttonPress : styles.button}>
          Tournament Setup
        </Text>
      </Pressable>

      <Text style={styles.title}>Built by Idan Haim</Text>

      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    padding: 12,
  },
  description: {
    textAlign: 'center',
    width: '60%',
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 6,
    fontSize: 15,
    marginTop: 5,
  },
  buttonPress: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 6,
    fontSize: 15,
    marginTop: 5,
    backgroundColor: '#999',
  },
});
