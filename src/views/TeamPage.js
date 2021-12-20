import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import PlayerCard from '../components/PlayerCard';
import NavBar from '../components/NavBar';


const TeamPage = () => {
    const { teamId } = useParams();
    const [rosterState, setRosterState] = useState([]);
    const [playerTeamState, setPlayerTeamState] = useState('');
    
    useEffect(() => {
        const fetchRoster = async () => {
            const rosterResponse = await fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`);
            const rosterData = await rosterResponse.json();
            setRosterState(rosterData.roster);

            const teamResponse = await fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}`);
            const teamData = await teamResponse.json();
            setPlayerTeamState(teamData.teams[0].name);
        };
        fetchRoster();
    }, [teamId]);

    return (
        <>
            <NavBar showTeamsNav={true}/>
            <div style={{padding: 20}}>
                <h1 style={{marginTop: 10, marginBottom: 20, marginLeft: 5}}>{playerTeamState} Roster</h1>
                {rosterState && rosterState.map((player, index) => 
                    <PlayerCard player={player} key={index}/>
                )} 
            </div> 
        </>
    )
};

export default TeamPage; 