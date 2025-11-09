import { Link } from 'react-router-dom';
import './HeaderBanner.css';
import RugbyRadarLogo from '/RugbyRadar_AppIcon_WhiteTransparent.png';


export const HeaderBanner = () => {

    return (
        <div className="header-banner">
            <div className='logo-banner'>
                <img src={RugbyRadarLogo}/>
                <p>Rugby  Radar</p>
            </div>

            <div className='nav-banner'>
                <Link to="/">Fixtures</Link>
                <Link to="/teams">Teams</Link>
                <Link to="/leagues">Leagues</Link>
            </div>
        </div>
    )
}