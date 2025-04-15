const express = require('express');
const router = express.Router();
const axios = require('axios');

const RIOT_API_KEY = 'RGAPI-dfc9773a-35f1-47e9-bac9-c6144b97d7c0'; // 발급받은 API 키
const gameName = 'Hide on bush'; // 닉네임
const tagLine = 'KR1'; // 태그라인

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
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }
}


router.get('/', (req, res) => {
  getSummonerInfo(gameName, tagLine);
});



module.exports = router;
