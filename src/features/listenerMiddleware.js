import { createListenerMiddleware } from '@reduxjs/toolkit';
import playersReducer, {
  setTeamId,
  addPlayer,
  updateResuts,
} from './playersSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setTeamId,
  effect: async (action, listenerApi) => {},
});
