import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const PlayerInputField = props => {
  const [player, setPlayer] = useState();

  const handleAddPlayer = value => {
    props.addPlayer(value);
    setPlayer(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={player}
        onChangeText={text => setPlayer(text)}
        placeholder={'add a player'}
        placeholderTextColor={'#fff'}
      />
      <TouchableOpacity onPress={() => handleAddPlayer(player)}>
        <View style={styles.button}>
          <MaterialIcons name='add' size={24} color='black' />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  inputField: {
    color: '#fff',
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
