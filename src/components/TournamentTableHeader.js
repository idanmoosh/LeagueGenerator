import { View, Text, StyleSheet } from 'react-native';

export const TournamentTableHeader = props => {
  return (
    <View style={styles.tableHeader}>
      <Text style={styles.param}>Team</Text>
      <Text style={styles.name}>Name</Text>
      <Text style={styles.param}>P</Text>
      <Text style={styles.param}>W</Text>
      <Text style={styles.param}>L</Text>
      <Text style={styles.param}>D</Text>
      <Text style={styles.param}>G</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    maxHeight: 30,
    paddingVertical: 3,
  },
  name: { height: 30, width: 60 },
  param: { height: 30 },
});
