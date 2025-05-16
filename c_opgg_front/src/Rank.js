import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Rank.css';

let Rank = () => {
    const { region, name, tag } = useParams();
    const [rankData, setRankData] = useState(null);

    const getTierImg = (tier) => {
        if (!tier) return '';
        return `https://opgg-static.akamaized.net/images/medals/${tier.toLowerCase()}.png`;
    };

    const getRankInfo = () => {
        axios.get('http://localhost:8080/user/rank', {
            params: {
                region,
                name,
                tag
            }
        }).then(res => {
            console.log('랭크 정보:', res.data);
            setRankData(res.data);
        }).catch(err => {
            console.error('랭크 정보 불러오기 실패:', err);
        });
    };

    useEffect(() => {
        getRankInfo();
    }, [region, name, tag]);

    if (!rankData) {
        return <div className="rank-box">랭크 정보를 불러오는 중...</div>;
    }

    return (
        <div className="rank-box">
             <div className="rank-player">{name}#{tag}</div>

            <h3>랭크 정보</h3>
            <div className="rank-tier">{rankData.tier} {rankData.rank}</div>
            <div>LP: {rankData.leaguePoints} LP</div>
            <div>승: {rankData.wins} / 패: {rankData.losses}</div>
        </div>
    )
};

export default Rank;
