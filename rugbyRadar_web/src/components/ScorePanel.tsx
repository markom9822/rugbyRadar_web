import { colors } from "../constants/tokens"
import { getHomeAwayTeamInfo } from "../store/utils/getTeamInfo"
import { getLeagueInfoFromDisplayName, getLeagueNameFromDisplayName, hexToRGB, isLeagueInPlanetRugbyAPI, isLeagueInRugbyViz, isLeagueInWorldRugbyAPI } from "../store/utils/helpers"
import './ScorePanel.css'

type ScorePanelProps = {
    leagueDisplayName: string
    index: number
    homeTeam: string
    awayTeam: string
    homeScore: string
    awayScore: string
    matchDate: Date
    matchTitle: string
    matchVenue: string
    matchLeague: string
    matchID: string
    eventState: string
    stateDetail: string
    eventTime: string,
    isLastItem: boolean,
    lastRefreshTime: string,
    OnPress: (index: number, id: string) => void
}

export const ScorePanel = ({ leagueDisplayName, homeTeam, awayTeam, homeScore, awayScore, matchDate,
    index, matchTitle, matchVenue, matchLeague, matchID, eventState, stateDetail, eventTime, isLastItem, lastRefreshTime, OnPress }: ScorePanelProps) => {

    console.info(leagueDisplayName)
    const leagueName = getLeagueNameFromDisplayName(leagueDisplayName)
    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if (homeTeamInfo === null) return
    if (awayTeamInfo === null) return
    if (homeTeamInfo === undefined) return
    if (awayTeamInfo === undefined) return

    const homeTextColour = (new Number(homeScore) >= new Number(awayScore)) ? (colors.text) : (hexToRGB('#FFFFFF', '0.5'));
    const awayTextColour = (new Number(awayScore) >= new Number(homeScore)) ? (colors.text) : (hexToRGB('#FFFFFF', '0.5'));

    const matchTime = matchDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    const scoreRender = (eventState: string) => {

        console.log(homeAwayInfo?.homeInfo.displayName)
        console.log(eventState)

        // not started yet
        if (eventState === "pre") {
            return (
                <div className="scoreDisplay">
                    <p>{matchTime}</p>
                </div>
            )
        }
        // not started yet
        if (eventState === "postponed") {
            return (
                <div className="scoreDisplay">
                    <p>Postponed</p>
                </div>
            )
        }
        // event finished
        else if (eventState === "post") {
            return (
                <div className="scoreDisplay">
                    <p>{homeScore}</p>
                    <span>FT</span>
                    <p>{awayScore}</p>
                </div>
            )
        }
        // event at halftime
        else if (eventState === "halfTime") {
            return (
                <div className="scoreDisplay">
                    <p>{homeScore}</p>
                    <span>HT</span>
                    <p>{awayScore}</p>
                </div>
            )
        }
        // event ongoing
        else {
            return (
                <div className="scoreDisplay">
                    <p>{homeScore}</p>
                    <span>{eventTime} {"'"}</span>
                    <p>{awayScore}</p>
                </div>
            )
        }
    }

    const lastRefreshHeader = (time: string) => {

        if (isLastItem) {
            return (
                <div>
                    <p> Last refresh: {time}</p>
                </div>
            )
        }

        return null
    }

    let linkID: string
    if (isLeagueInRugbyViz(leagueDisplayName)) {
        linkID = matchID + leagueName + "_RugbyViz"
    }
    else if (isLeagueInWorldRugbyAPI(leagueDisplayName)) {
        linkID = matchID + "_" + leagueName + "_WorldRugbyAPI"
    }
    else if (isLeagueInPlanetRugbyAPI(leagueDisplayName)) {
        linkID = matchID + "_" + leagueName + "_PlanetRugbyAPI"
    }
    else {
        linkID = matchID;
    }

    let homeAbbreviation = homeTeamInfo.abbreviation;
    let awayAbbreviation = awayTeamInfo.abbreviation;

    if (homeTeam.includes("U20")) {
        homeAbbreviation += " U20"
    }
    if (awayTeam.includes("U20")) {
        awayAbbreviation += " U20"
    }

    const homeGradientColour = hexToRGB(homeTeamInfo.colour, '0.7');
    const awayGradientColour = hexToRGB(awayTeamInfo.colour, '0.7');
    const matchLeagueLogo = getLeagueInfoFromDisplayName(matchLeague)?.leagueAltLogo

    const handlePressedScorePanel = () => {

        OnPress(index, linkID)
    }

    return (
        <div className="panelContainer">
            <div className="teamInfo">
                <img src={homeTeamInfo.logo}/>
                <p>{homeTeamInfo.abbreviation}</p>
            </div>

            {scoreRender(eventState)}

            <div className="teamInfo">
                <p>{awayTeamInfo.abbreviation}</p>
                <img src={awayTeamInfo.logo}/>
            </div>
        </div>
    )
}