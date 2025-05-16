const spellIdToName = {
    1: 'SummonerBoost',
    3: 'SummonerExhaust',
    4: 'SummonerFlash',
    6: 'SummonerHaste',
    7: 'SummonerHeal',
    11: 'SummonerSmite',
    12: 'SummonerTeleport',
    14: 'SummonerIgnite',
    21: 'SummonerBarrier',
    32: 'SummonerSnowball',
    39: 'SummonerMark'
};

const getSpellImg = (spellId) => {
    const spellName = spellIdToName[spellId];
    if (!spellName) return null;
    return `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/spell/${spellName}.png`;
};

const getItemImg = (itemId) => {
    if (!itemId || itemId === 0) return null;
    return `https://ddragon.leagueoflegends.com/cdn/15.8.1/img/item/${itemId}.png`;
};

const renderPlayer = (p) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #eee', padding: '5px 0' }}>
        <img src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${p.champion}.png`} alt={p.champion} width="32" />
        <div>
            <div>{p.champion} - {p.name} ({p.position})</div>
            <div>KDA: {p.kda} | CS: {p.cs} | DMG: {p.damage} | Vision: {p.vision}</div>
            <div>
                스펠:&nbsp;
                {p.spells?.spell1Id && <img src={getSpellImg(p.spells.spell1Id)} alt="spell1" width="24" />}
                {p.spells?.spell2Id && <img src={getSpellImg(p.spells.spell2Id)} alt="spell2" width="24" />}
            </div>
            <div>
                아이템:&nbsp;
                {Array.isArray(p.items) && p.items.map((itemId, idx) =>
                    itemId !== 0 ? (
                        <img key={idx} src={getItemImg(itemId)} alt={`item${itemId}`} width="24" />
                    ) : null
                )}
            </div>
        </div>
    </div>
);

const MatchDetail = ({ match }) => {

    console.log('match:', match);

    if (!match || Object.keys(match).length === 0) {
        console.log('match가 아직 비어있음');
        return <div>로딩중...</div>;
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px', fontFamily: 'Arial' }}>
            {/* 매치 기본 정보 */}
            <div style={{ marginBottom: '10px' }}>
                <strong>{match.gameMode}</strong> | 큐 ID: {match.queueId} | {formatTime(match.gameStartTimestamp)}
                <div>Duration: {Math.floor(match.duration / 60)}분</div>
            </div>

            {/* 내 정보 */}
            <div style={{ background: match.win ? '#d0f0c0' : '#f8d7da', padding: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${match.champion}.png`}
                    alt={match.champion}
                    width="64"
                    height="64"
                    onError={(e) => e.target.style.display = 'none'}
                />
                <div>
                    <strong>{match.name}#{match.tag}</strong> ({match.position})
                    <div>챔피언: {match.champion} (Lv {match.level})</div>
                    <div>KDA: {match.kda}</div>
                    <div>CS: {match.cs} / Damage: {match.damage} / Vision: {match.vision}</div>
                    <div>
                        스펠:&nbsp;
                        {match.spells?.spell1Id && <img src={getSpellImg(match.spells.spell1Id)} alt="spell1" width="32" />}
                        {match.spells?.spell2Id && <img src={getSpellImg(match.spells.spell2Id)} alt="spell2" width="32" />}
                    </div>
                    <div>
                        아이템:&nbsp;
                        {Array.isArray(match.items) && match.items.map((itemId, idx) =>
                            itemId !== 0 ? (
                                <img key={idx} src={getItemImg(itemId)} alt={`item${itemId}`} width="32" />
                            ) : null
                        )}
                    </div>
                </div>
            </div>

            {/* 팀 정보 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h4>아군 팀</h4>
                    {Array.isArray(match.teams?.ally) ? match.teams.ally.map((p, idx) => (
                        <div key={idx}>{renderPlayer(p)}</div>
                    )) : <p>없음</p>}
                </div>
                <div style={{ flex: 1 }}>
                    <h4>적군 팀</h4>
                    {Array.isArray(match.teams?.enemy) ? match.teams.enemy.map((p, idx) => (
                        <div key={idx}>{renderPlayer(p)}</div>
                    )) : <p>없음</p>}
                </div>
            </div>
        </div>
    );
};

export default MatchDetail;
