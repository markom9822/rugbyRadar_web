import './HeaderBanner.css';
import RugbyRadarLogo from '/RugbyRadar_AppIcon_WhiteTransparent.png';


export const HeaderBanner = () => {

    return (
        <div className="header-banner">
            <img src={RugbyRadarLogo}/>
            <p>Rugby  Radar</p>
        </div>
    )
}