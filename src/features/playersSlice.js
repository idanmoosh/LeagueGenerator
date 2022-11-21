import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2022-11-01').getTime(),
};

const createPlayer = name => {
  return {
    id: uuidv1(v1options),
    name: name,
    points: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    games: 0,
    teamId: 0,
  };
};
const initialState = {
  players: [],
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setTeamId: (state, action) => {
      const id = action.payload.id;
      const teamNo = action.payload.teamNo;
      state.players.map(player => {
        if (player.id === id) {
          player.teamId = teamNo;
        }
      });
    },
    getPlayers: state => {
      return state.players;
    },

    addPlayer: (state, action) => {
      const name = action.payload;
      let newPlayer = createPlayer(name);
      state.players.push(newPlayer);
    },
    upateResults: (state, action) => {
      let id = action.payload.id;
      let result = action.payload.result;
      let player = state.players.filter(player => player.id == id);
      let otherPlayers = state.players.filter(player => !player.id == id);
      switch (result) {
        case 'w':
          player.wins++;
          player.games++;
          player.points += 3;
        case 'l':
          player.losses++;
          player.games++;

        case 'd':
          player.points++;
          player.draws++;
          player.games++;
        default:
      }
      state.players = [...otherPlayers, player];
    },
  },
});

export const { addPlayer, updateResults, setTeamId, getPlayers } =
  playersSlice.actions;

export default playersSlice.reducer;
