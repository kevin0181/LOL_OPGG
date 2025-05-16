import { useState } from "react";
import { useNavigate } from "react-router-dom";

let Home = () => {

    const [region, setRegion] = useState('KR');
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!name || !tag) {
            alert('이름과 태그를 입력하세요.');
            return;
        }
        console.log(`검색 - 지역: ${region}, 이름: ${name}, 태그: ${tag}`);
        
        navigate(`/match/${region}/${name}/${tag}`);
    };

    return (
        <div>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="KR">KR</option>
                <option value="NA">NA</option>
                <option value="EUW">EUW</option>
                <option value="EUNE">EUNE</option>
                <option value="JP">JP</option>
            </select>

            <input
                type="text"
                placeholder="소환사 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="태그 (예: 1234)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />

            <button onClick={handleSearch}>검색</button>
        </div>
    )
}

export default Home;