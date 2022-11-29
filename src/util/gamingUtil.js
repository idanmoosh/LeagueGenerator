import { v1 as uuidv1 } from 'uuid';

class GamingUtils {
  sortPlayersBy(category, store) {
    let players = [...store];
    players.sort((p1, p2) => {
      p1[category] < p2[category] ? 1 : p1[category] > p2[category] ? -1 : 0;
    });
    return players;
  }
  shuffleArray(array) {
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
  }

  createPlayer = name => {
    const v1options = {
      node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
      clockseq: 0x1234,
      msecs: new Date('2022-11-01').getTime(),
    };
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

  removeDuplicates = arr => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };
  findIds = arr => {
    let idList = arr.map(player => player.id);
    return idList;
  };
  createDeepCopy = arr => {
    const newArr = [];
    arr.forEach(value => newArr.push(value));
    return newArr;
  };
  upadteWin = (arr, idArr) => {
    console.log('winning submission');
    for (let i = 0; i < idArr.length; i++) {
      arr.forEach(player => {
        if (player.id === idArr[i]) {
          console.log(player);
          player.games = player.games + 1;
          player.wins = player.wins + 1;
          player.points = player.points + 3;
          console.log(player);
        }
      });
    }
    return arr;
  };
  upadteLoss = (arr, idArr) => {
    console.log('losing submission');
    for (let i = 0; i < idArr.length; i++) {
      arr.forEach(player => {
        if (player.id === idArr[i]) {
          console.log(player);
          player.games = player.games + 1;
          player.losses = player.losses + 1;
          console.log(player);
        }
      });
    }
    return arr;
  };
  updateDraw = (arr, idArr) => {
    console.log('draw submission');
    for (let i = 0; i < idArr.length; i++) {
      arr.forEach(player => {
        if (player.id === idArr[i]) {
          player.games = player.games + 1;
          player.draws = player.draws + 1;
          player.points = player.points + 1;
        }
      });
    }
    return arr;
  };
}

export default new GamingUtils();
