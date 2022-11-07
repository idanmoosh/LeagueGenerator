import { View, Text, Button, StatusBar, StyleSheet } from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>League Generator</Text>
      <Text style={styles.description}>
        Make sure the player List is updated and then click "Start Tournament"
      </Text>
      <Button title='Players List' style={styles.button} />

      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#999',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    color: '#111',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    justifyContent: 'center',
    color: '#fns',
  },
  button: {},
});
