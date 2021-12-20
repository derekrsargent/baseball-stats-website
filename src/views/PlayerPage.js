import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import NavBar from '../components/NavBar';
import './styles.css';


const PlayerPage = () => {
    const { playerId, teamId } = useParams();
    const [playerState, setPlayerState] = useState([]);
    const [playerBioState, setPlayerBioState] = useState([]);
    const [playerPositionState, setPlayerPositionState] = useState('');
    const [playerTeamState, setPlayerTeamState] = useState('');

    useEffect(() => {
        const fetchPlayer = async () => {
            const playerResponse = await fetch(
                `https://statsapi.mlb.com/api/v1/people/${playerId}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`
            );
            const playerData = await playerResponse.json();
            setPlayerState(playerData.people[0].stats);
            setPlayerBioState(playerData.people[0]);
            setPlayerPositionState(playerData.people[0].primaryPosition.name);
        };
        fetchPlayer();
    }, [playerId]);

    useEffect(() => {
        const fetchTeam = async () => {
            const teamResponse = await fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}`);
            const teamData = await teamResponse.json();
            setPlayerTeamState(teamData.teams[0].name);
        };
        fetchTeam();
    }, [teamId]);

    const DisplayStats = ({stats}) => {
        return (
            <div style={{padding: 5}}>
                {stats.group.displayName === 'pitching' && <DisplayPitchingStats stats={stats.splits} />}
                {stats.group.displayName === 'fielding' && <DisplayFieldingStats stats={stats.splits} />}
                {stats.group.displayName === 'hitting' && <DisplayHittingStats stats={stats.splits} />}
            </div>
        )
    };

    const DisplayPitchingStats = ({stats}) => {
        return (
            <table>
                <caption>Pitching Stats</caption>
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>Strikeouts</th>
                        <th>WHIP</th>
                        <th>ERA</th>
                        <th>Saves</th>
                    </tr>
                    {stats.map((statsByYear, index) => {
                        return (
                            <tr key={index}>
                                <td>{statsByYear.season}</td>
                                <td>{stats[index].team && stats[index].team.name}</td>
                                <td>{statsByYear.stat.gamesPlayed}</td>
                                <td>{statsByYear.stat.wins}</td>
                                <td>{statsByYear.stat.strikeOuts}</td>
                                <td>{statsByYear.stat.whip}</td>
                                <td>{statsByYear.stat.era}</td>
                                <td>{statsByYear.stat.saves}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    const DisplayFieldingStats = ({stats}) => {
        return (
            <table>
                <caption>Fielding Stats</caption>
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Games Played</th>
                        <th>Assists</th>
                        <th>Errors</th>
                        <th>Fielding</th>
                        <th>Double Plays</th>
                        <th>Triple Plays</th>
                    </tr>
                    {stats.map((statsByYear, index) => {
                        return (
                            <tr key={index}>
                                <td>{statsByYear.season}</td>
                                <td>{stats[index].team && stats[index].team.name}</td>
                                <td>{stats[index].position && stats[index].position.abbreviation}</td>
                                <td>{statsByYear.stat.games}</td>
                                <td>{statsByYear.stat.assists}</td>
                                <td>{statsByYear.stat.errors}</td>
                                <td>{statsByYear.stat.fielding}</td>
                                <td>{statsByYear.stat.doublePlays}</td>
                                <td>{statsByYear.stat.triplePlays}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    const DisplayHittingStats = ({stats}) => {
        return (
            <table>
                <caption>Hitting Stats</caption>
                <tbody>
                    <tr>
                        <th>Season</th>
                        <th>Team</th>
                        <th>Games Played</th>
                        <th>Batting Average</th>
                        <th>OPS</th>
                        <th>Hits</th>
                        <th>Runs</th>
                        <th>Homeruns</th>
                        <th>RBI</th>
                        <th>Strikeouts</th>
                    </tr>
                    {stats.map((statsByYear, index) => {
                        return (
                            <tr key={index}>
                                <td>{statsByYear.season}</td>
                                <td>{stats[index].team && stats[index].team.name}</td>
                                <td>{statsByYear.stat.gamesPlayed}</td>
                                <td>{statsByYear.stat.avg}</td>
                                <td>{statsByYear.stat.ops}</td>
                                <td>{statsByYear.stat.hits}</td>
                                <td>{statsByYear.stat.runs}</td>
                                <td>{statsByYear.stat.homeRuns}</td>
                                <td>{statsByYear.stat.rbi}</td>
                                <td>{statsByYear.stat.strikeOuts}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    return (
        <>
            <NavBar showTeamsNav={true} teamId={133} teamName={playerTeamState}/>
            <div style={{padding: 5}}>  
                <div style={{padding: 5}}>  
                    <div style={{ float: 'left', width: 100, padding: 5 }}>
                        <img 
                            src={`https://content.mlb.com/images/headshots/current/60x60/${playerBioState.id}@2x.png`} 
                            alt='Player Headshot'  
                            style={{width: '100'}}
                        />
                    </div>
                    <div style={{padding: 5}}> 
                        <h1>{playerBioState.firstLastName}</h1> 
                        <p style={{ color: '#080808', fontWeight: 'bold' }}>{playerPositionState}</p>
                        <p style={{ marginTop: 6}}>
                            Bats: {playerBioState.batSide && playerBioState.batSide.description}
                        </p>      
                        <p>
                            Throws: {playerBioState.pitchHand && playerBioState.pitchHand.description}
                        </p>      
                        <p>
                            Born: {playerBioState.birthDate}
                        </p> 
                    </div> 
                </div>
                <div style={{padding: 5}}>    
                    {playerState && playerState.map((stats, index) => 
                            <DisplayStats key={index} stats={stats} />
                    )}
                    {!playerState && 
                        <p style={{fontSize: 14, fontWeight: 'bold', marginTop: 20}}>No stats available.</p>
                    }
                </div>
            </div>
        </>
    )
};

export default PlayerPage; 