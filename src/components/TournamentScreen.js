import { View, StyleSheet } from 'react-native';
import { PlayerStats } from './playerStats';
import { TournamentTableHeader } from './TournamentTableHeader.js';

import { addPlayer } from '../features/playersSlice';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GameModule } from './gamingModule';

export const TournamentScreen = ({ route }) => {
  const { params } = route.params;
  const playingStandard = params.competitionType;
  const players = params.players;
  const playingSingles = params.teamSize;
  const dispatch = useDispatch();

  const addingPlayers = array => {
    array.map(player => dispatch(addPlayer(player)));
    return;
  };
  const store = useSelector(state => state.root.playersSlice.players);
  const playersNames = store.map(player => player.name);

  useEffect(() => {
    if (playersNames.length === players.length) {
    } else {
      addingPlayers(players);
    }
  }, [players, playersNames]);

  return (
    <View style={styles.tournamentScreen}>
      <View style={styles.tournamentSection}>
        <TournamentTableHeader />
        {store.map(player => {
          return <PlayerStats key={player.name} player={player} />;
        })}
        <GameModule
          store={store}
          playingSingles={playingSingles}
          playingStandard={playingStandard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tournamentScreen: { flex: 1 },
  tournamentSection: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    marginHorizontal: 12,
  },
  gameModule: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    marginHorizontal: 12,
  },
});
