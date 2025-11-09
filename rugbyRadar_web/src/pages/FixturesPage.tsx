import { useState } from "react";
import { getLeagueFixtures } from "../store/utils/getLeagueFixtures"
import { ScorePanel } from "../components/ScorePanel";
import './FixturesPage.css'


export type MatchInfo = {
    homeTeam: string,
    awayTeam: string,
    homeScore: string,
    awayScore: string,
    matchDate: Date,
    matchTitle: string,
    matchVenue: string,
    matchLeague: string,
    matchID: string,
    eventState: string,
    stateDetail: string,
    eventTime: string,
    isDateHeader: boolean,
}


export function FixturesPage() {

    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);
    const [lastRefresh, setLastRefresh] = useState('');


    const handleGetFixtures = async (datesArray: Date[], targetLeagueName: string) => {

        console.info('pressed get fixtures');
        const resultArray = await getLeagueFixtures(datesArray, targetLeagueName);
        console.info(resultArray);
        setMatchesArray(resultArray);
    }

    const handlePressScorePanel = () => {

    }


    return (
        <div className="pageContainer">
            <button onClick={() => handleGetFixtures([new Date()], 'autumnNations')}>Get Fixtures</button>

            <div>
                {matchesArray.map((item, index) => (
                    <ScorePanel
                        leagueDisplayName={item.matchLeague}
                        homeTeam={item.homeTeam}
                        homeScore={item.homeScore}
                        awayTeam={item.awayTeam}
                        awayScore={item.awayScore}
                        matchDate={item.matchDate}
                        matchTitle={item.matchTitle}
                        matchLeague={item.matchLeague}
                        matchVenue={item.matchVenue}
                        matchID={item.matchID}
                        index={index}
                        eventState={item.eventState}
                        stateDetail={item.stateDetail}
                        eventTime={item.eventTime}
                        isLastItem={index === matchesArray.length - 1}
                        lastRefreshTime={lastRefresh}
                        OnPress={handlePressScorePanel}
                    />
                ))}
            </div>
        </div>
    )

}