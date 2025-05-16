import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

let Home = ({ className = 'home-center' }) => {

    const [region, setRegion] = useState('KR');
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!name || !tag) {
            alert('이름과 태그를 입력하세요.');
            return;
        }
        navigate(`/match/${region}/${name}/${tag}`);
    };

    return (
        <div className={className}>
            <div className="search-bar">
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="region-select">
                    <option value="KR">Korea</option>
                    <option value="NA">NA</option>
                    <option value="EUW">EUW</option>
                    <option value="EUNE">EUNE</option>
                    <option value="JP">JP</option>
                </select>

                <input
                    type="text"
                    placeholder="플레이어 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="name-input"
                />

                <span className="tag-text">#</span>
                <input
                    type="text"
                    placeholder="KR1"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="tag-input"
                />

                <button onClick={handleSearch} className="search-button">.GG</button>
            </div>
        </div>
    )
}

export default Home;
