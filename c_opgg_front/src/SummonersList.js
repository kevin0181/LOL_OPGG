import { useParams } from 'react-router-dom';

let SummonersList = () => {
    const { region, name, tag } = useParams();

    return (
        <>
            <div>SummonersList</div>
            <div>{region},{name},{tag}</div>
        </>
    )
}

export default SummonersList;