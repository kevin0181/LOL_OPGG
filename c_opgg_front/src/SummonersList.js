import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

let SummonersList = () => {
    const { region, name, tag } = useParams();

    let getMatchList = async () => {

        axios.get('http://localhost:8080/user/matches', {
            params: {
                region: region,
                name: name,
                tag: tag
            }
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.error('매치 리스트 불러오기 실패:', err);
        });
    }

    useEffect(() => {
        getMatchList();
    }, [region, name, tag]);

    return (
        <>
            <div>SummonersList</div>
            <div>{region},{name},{tag}</div>
        </>
    )
}

export default SummonersList;