import React from 'react';
import { Link } from 'react-router-dom';


const PlayerCard = ({player}) => {
    const textColor = '#06c';

    return (
        <div style={{float: 'left', width: 400, padding: 5}}>
            <div style={{clear: 'both'}}/>
            <div style={{flexDirection: 'row', display: 'flex', width: 300, padding: 5}}>
                <div style={{minWidth: 50, justifyContent: 'center', display: 'flex', padding: 5}}>
                    <Link to={`${player.person.id}`}>          
                        <img 
                            src={`https://content.mlb.com/images/headshots/current/60x60/${player.person.id}.png`}
                            style={{minHeight: 25, maxHeight: 40, minWidth: 20, maxWidth: 50, borderRadius: 0}}
                            alt={`${player.person.fullName}'s headshot`}
                        />
                    </Link>
                </div>
                <div style={{width: 300, padding: 5}}>   
                    <Link to={`${player.person.id}`} style={{color: '#000', textDecorationLine: 'none'}}>          
                        <p style={{marginLeft: 5, marginTop: 2, fontWeight: 'bold'}}>
                            {player.person.fullName}{player.jerseyNumber !== '' && `, #${player.jerseyNumber}`}
                        </p>
                    </Link>
                    <div style={{
                        flexDirection: 'row', 
                        display: 'flex', 
                        width: 300, 
                        color: textColor, 
                        fontWeight: '400', 
                        padding: 5
                    }}>
                        <Link to={`${player.person.id}`} style={{color: textColor, textDecorationLine: 'none'}}>
                        <p>Stats</p>
                        </Link>
                        <p style={{marginLeft: 5, marginRight: 5}}>|</p>
                        <p>{player.position.abbreviation}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PlayerCard;