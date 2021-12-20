import React, { useState, useEffect } from 'react';
import TeamCard from '../components/TeamCard';
import NavBar from '../components/NavBar';


const TeamsPage = () => {
    const [allTeamsState, setAllTeamsState] = useState([]);
    
    const fetchTeams = async () => {
        const allTeamsResponse = await fetch('https://statsapi.mlb.com/api/v1/teams?sportId=1');
        const allTeamsData = await allTeamsResponse.json();
        setAllTeamsState(allTeamsData.teams);
    };

    useEffect(() => {
        fetchTeams(); 
    }, []);

    return (
        <>
            <NavBar/>
            <div style={{padding: 20}}>
                <h1 style={{marginTop: 10, marginBottom: 20, marginLeft: 5}}>MLB Teams</h1>
                {allTeamsState && allTeamsState.map((team, index) => 
                    <TeamCard team={team} key={index}/>
                )} 
            </div> 
        </>
    )
};

export default TeamsPage;