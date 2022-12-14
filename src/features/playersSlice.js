import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';
import utils from '../util/gamingUtil';

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
  gameCounter: 0,
};

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setTeamId: state => {
      let playersWithTeams = [...state.players];
      playersWithTeams = utils.shuffleArray(playersWithTeams);
      playersWithTeams.forEach(player => {
        player.teamId = Math.round(
          Math.ceil(playersWithTeams.indexOf(player) / 2 + 0.1)
        );
      });
      return state;
    },
    setTeamsZero: state => {
      let playersWithTeams = [...state.players];
      playersWithTeams.forEach(player => (player.teamId = 0));
    },

    setCounter: (state, action) => {
      gameAmount = action.payload.value;
      state.gameCounter = gameAmount;
    },
    updateState: (state, action) => {
      return (state = {
        ...state,
        players: action.payload,
      });
    },
    updateResults: (state, action) => {
      let playersList = [...state.players];
      let { idA, idB, scoreA, scoreB } = action.payload;
      if (scoreA === scoreB) {
        utils.updateDraw(playersList, idA.concat(idB));
      } else if (scoreA > scoreB) {
        utils.upadteWin(playersList, idA);
        utils.upadteLoss(playersList, idB);
      } else if (scoreA < scoreB) {
        utils.upadteWin(playersList, idB);
        utils.upadteLoss(playersList, idA);
      }
      return state;
    },
  },
});

export const {
  updateResults,
  setTeamId,
  updateState,
  setCounter,
  setTeamsZero,
} = playersSlice.actions;

export default playersSlice.reducer;

export const select = state => {
  return state.players;
};
