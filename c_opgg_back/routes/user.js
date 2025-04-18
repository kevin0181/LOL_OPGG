const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
let authenticateToken = require('./../jwtConfig');

require('dotenv').config();

const RIOT_API_KEY = 'RGAPI-5102e48a-e588-44bd-a377-47b40b0092dc'; // 발급받은 API 키
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

router.get('/', async (req, res) => {

  let userInfo = await getSummonerInfo(gameName, tagLine);
  userInfo.jwt_puuid = generateToken(userInfo.puuid);

  res.json(userInfo);

});

router.get('/rank', authenticateToken, async (req, res) => {
  res.json(await getUserRank(req.user.puuid));
});



module.exports = router;
