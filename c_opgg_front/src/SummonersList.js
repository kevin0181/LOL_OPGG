import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchDetail from './MatchDetail';
import Home from './Home';
import Rank from './Rank';

let SummonersList = () => {
    const { region, name, tag } = useParams();
    const [matches, setMatches] = useState([]);

    let getMatchList = async () => {

        axios.get('http://localhost:8080/user/matches', {
            params: {
                region: region,
                name: name,
                tag: tag
            }
        }).then(res => {
            console.log(res.data);
            setMatches(res.data);
        }).catch(err => {
            console.error('매치 리스트 불러오기 실패:', err);
        });
    }

    useEffect(() => {
        getMatchList();
    }, [region, name, tag]);

    return (
        <div>
            <Home className="home-top" />
            <Rank />
            {matches.length > 0 ? (
                matches.map((match, idx) => (
                    <MatchDetail key={idx} match={match} />
                ))
            ) : (
                <p>전적을 불러오는 중...</p>
            )}
        </div>
    )
}

export default SummonersList;