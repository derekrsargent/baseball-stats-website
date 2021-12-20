import React from 'react';
import { Link } from 'react-router-dom';


const TeamCard = ({team}) => {
    const textColor = '#06c'

    return (
        <div style={{float: 'left', width: 400, padding: 5}}>
            <div style={{clear: 'both'}}/>
            <div style={{flexDirection: 'row', display: 'flex', width: 300, padding: 5}}>
                <div style={{minWidth: 50, justifyContent: 'center', display: 'flex', padding: 5}}>
                    <Link to={`${team.id}`}>          
                        <img 
                            src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`} 
                            style={{minHeight: 25, maxHeight: 40, minWidth: 20, maxWidth: 50, borderRadius: 0}}
                            alt={`${team.name}'s logo`}
                        />
                    </Link>
                </div>
                <div style={{width: 300, padding: 5}}>   
                    <Link to={`${team.id}`} style={{color: '#000', textDecorationLine: 'none'}}>          
                        <p style={{marginLeft: 5, marginTop: 2, fontWeight: 'bold'}}>{team.name}</p>
                    </Link>
                    <div style={{flexDirection: 'row', display: 'flex', width: 300, color: textColor, fontWeight: '400', padding: 5}}>
                        <Link to={`${team.id}`} style={{color: textColor, textDecorationLine: 'none'}}>
                        <p>Roster</p>
                        </Link>
                        <p style={{marginLeft: 5, marginRight: 5}}>|</p>
                        <p>{`Established in ${team.firstYearOfPlay}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TeamCard;