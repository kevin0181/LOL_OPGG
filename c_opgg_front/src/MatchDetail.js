import React from 'react';

const MatchDetail = ({ match }) => {

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
            <div style={{ background: match.win ? '#d0f0c0' : '#f8d7da', padding: '10px', marginBottom: '20px' }}>
                <strong>{match.name}#{match.tag}</strong> ({match.position})
                <div>챔피언: {match.champion} (Lv {match.level})</div>
                <div>KDA: {match.kda}</div>
                <div>CS: {match.cs} / Damage: {match.damage} / Vision: {match.vision}</div>
                <div>스펠: {match.spells?.spell1Id ?? 'N/A'}, {match.spells?.spell2Id ?? 'N/A'}</div>
                <div>아이템: {Array.isArray(match.items) ? match.items.join(', ') : 'N/A'}</div>
            </div>

            {/* 팀 정보 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h4>아군 팀</h4>
                    {Array.isArray(match.teams?.ally) ? match.teams.ally.map((p, idx) => (
                        <div key={idx} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                            {p.champion} - {p.name} ({p.position})<br />
                            KDA: {p.kda} | CS: {p.cs} | DMG: {p.damage} | Vision: {p.vision}<br />
                            스펠: {p.spells?.spell1Id ?? 'N/A'}, {p.spells?.spell2Id ?? 'N/A'}<br />
                            아이템: {Array.isArray(p.items) ? p.items.join(', ') : 'N/A'}
                        </div>
                    )) : <p>없음</p>}
                </div>
                <div style={{ flex: 1 }}>
                    <h4>적군 팀</h4>
                    {Array.isArray(match.teams?.enemy) ? match.teams.enemy.map((p, idx) => (
                        <div key={idx} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                            {p.champion} - {p.name} ({p.position})<br />
                            KDA: {p.kda} | CS: {p.cs} | DMG: {p.damage} | Vision: {p.vision}<br />
                            스펠: {p.spells?.spell1Id ?? 'N/A'}, {p.spells?.spell2Id ?? 'N/A'}<br />
                            아이템: {Array.isArray(p.items) ? p.items.join(', ') : 'N/A'}
                        </div>
                    )) : <p>없음</p>}
                </div>
            </div>
        </div>
    );
};

export default MatchDetail;
