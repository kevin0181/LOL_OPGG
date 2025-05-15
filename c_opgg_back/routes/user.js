const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const RIOT_API_KEY = 'RGAPI-90dae0a5-6768-4e1b-8a9f-9d539c4235ac'; // 발급받은 API 키
const gameName = 'MOONIGHT'; // 닉네임
const tagLine = '0181'; // 태그라인

async function getSummonerInfo(gameName, tagLine) {
  try {
    // PUUID 조회
    const accountResponse = await axios.get(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY
      }
    });

    const puuid = accountResponse.data.puuid;

    // 소환사 정보 조회
    const summonerResponse = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY
      }
    });

    console.log(summonerResponse.data);

    return summonerResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
};

let generateToken = (puuid) => {
  return jwt.sign({ puuid }, process.env.JWT_SECRET_KEY);
};

const getUserRank = async (puuid) => {
  try {

    console.log(puuid);

    const getRank = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY
      }
    });

    return getRank.data[0];

  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
}

let getMatchIds = async (puuid, start, count) => {
  try {
    const ids = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY
      }
    });

    return ids.data;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
}

let getMatchSummary = async (ids) => {

  try {
    const matchSummaries = await Promise.all(ids.map(async (matchId) => {
      const res = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
        headers: {
          'X-Riot-Token': RIOT_API_KEY
        }
      });

      const data = res.data;

      return {
        matchId: matchId,
        champion: data.championName,
        level: data.champLevel,
        kda: `${data.kills}/${data.deaths}/${data.assists}`,
        win: data.win,
        items: [
          data.item0,
          data.item1,
          data.item2,
          data.item3,
          data.item4,
          data.item5,
          data.item6
        ],
        name: data.riotIdGameName || data.summonerName,
        tag: data.riotIdTagline || '',
        position: data.individualPosition,
        cs: data.totalMinionsKilled,
        damage: data.totalDamageDealtToChampions,
        vision: data.visionScore,
        duration: data.info.gameDuration
      };
    }));

    return matchSummaries;
  } catch (error) {
    console.error('Error fetching match summaries:', error.response ? error.response.data : error.message);
    return [];
  }
}


router.get('/', async (req, res) => {
  let userInfo = await getSummonerInfo(gameName, tagLine);

  res.json(userInfo);
});

router.get('/rank', async (req, res) => {
  res.json(await getUserRank(req.user.puuid));
});

router.get('/matches', async (req, res) => {
  let userInfo = await getSummonerInfo(gameName, tagLine);
  let ids = await getMatchIds(userInfo.puuid, 0, 20);

  res.json(await getMatchSummary(ids));
});


module.exports = router;
