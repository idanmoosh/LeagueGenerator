/*import { setTeamId } from '../features/playersSlice';

export const pickTwoPlayers = store => {
  let sortedPlayers = sortTeamsbyGame(store);
  const playerA = [sortedPlayers[0]];
  const playerB = [sortedPlayers[1]];
  const list = [playerA, playerB];
  return list;
};

export const sortTeamsbyGame = players => {
  const sortedPlayers = [...players];

  let sortedPlayersList = sortedPlayers.sort((p1, p2) =>
    p1.games < p2.games ? 1 : p1.games > p2.games ? -1 : 0
  );
  return sortedPlayersList;
};

export const splitToTeams = players => {
  console.log(players);
  let playersList = [...players];
  playersList = shuffleArray(playersList);
  playersList.map(player => {
    if (playersList.indexOf(player) % 2 === 0) {
      setTeamId(playersList.indexOf(player) + 1);
    } else {
      setTeamId(playersList.indexOf(player));
    }
  });
  return playersList;
};

export const shuffleArray = array => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const pickTwoTeams = store => {
  const sortedPlayers = sortTeamsbyGame(store);
  const teamA = [sortedPlayers[0]];
  let teamB = [];
  console.log(sortedPlayers);
  for (let i = 1; i < 3; i++) {
    if (sortedPlayers[i].teamId === teamA[0].teamId) {
      teamA[1] = sortedPlayers[i];
    } else {
      teamB.push(sortedPlayers[i]);
    }
  }
  if (teamA.length !== 2) {
    teamA[1] = findTeammate(sortedPlayers, teamA[0].teamId, teamA[0][id]);
  }
  console.log('teamA');
  console.log(teamA);
  console.log('teamB');
  console.log(teamB);
  console.log(teamB);
  if (teamB.length !== 2) {
    teamB[1] = findTeammate(sortedPlayers, teamB[0].teamId, teamB[0][id]);
  }

  teamB[1] = sortedPlayers.filter(player => {
    player.id !== teamB[0].id && player.teamId === teamB[0].teamId;
  });

  let teams = teamA + teamB;
  console.log('teams ' + teams);
  return teams;
};
*/
