"use client"
import CollapseItem from "@/app/_components/CollapseItem";
import Navbar from "@/app/_components/Navbar";
import Stat from "@/app/_components/Stat";
import { useEffect, useState } from "react";

class TeamStats {
    private _goals_for: number = 0;
    private _goals_for_rank: number = 0;
    private _goals_against: number = 0;
    private _goals_against_rank: number = 0;
    private _clean_sheets: number = 0;
    private _clean_sheets_rank: number = 0;
    private _num_shots: number = 0;
    private _num_shots_rank: number = 0;
    private _num_crosses: number = 0;
    private _num_crosses_rank: number = 0;
    private _pass_completion: number = 0.0;
    private _pass_completion_rank: number = 0;
    private _final_third_completion: number = 0;
    private _final_third_rank: number = 0;
    public constructor({GF = 0, GFR = 0, GA = 0, GAR = 0, CS = 0, CSR = 0, NS = 0, NSR = 0, NC = 0, NCR = 0, PC = 0.0, PCR = 0, FT = 0, FTR = 0}: {GF?: number, GFR?: number, GA?: number, GAR?: number, CS?: number, CSR?: number, NS?: number, NSR?: number, NC?: number, NCR?: number, PC?: number, PCR?: number, FT?: number, FTR?: number} = {}) {
        this._goals_for = GF;
        this._goals_for_rank = GFR;
        this._goals_against = GA;
        this._goals_against_rank = GAR;
        this._clean_sheets = CS;
        this._clean_sheets_rank = CSR;
        this._num_shots = NS;
        this._num_shots_rank = NSR;
        this._num_crosses = NC;
        this._num_crosses_rank = NCR;
        this._pass_completion = PC;
        this._pass_completion_rank = PCR;
        this._final_third_completion = FT;
        this._final_third_rank = FTR;
    }
    get goals_for(): number {
        return this._goals_for;
    }
    get goals_for_rank(): number {
        return this._goals_for_rank;
    }
    get goals_against(): number {
        return this._goals_against;
    }
    get goals_against_rank(): number {
        return this._goals_against_rank;
    }
    get clean_sheets() : number {
        return this._clean_sheets;
    }
    get clean_sheets_rank() : number {
        return this._clean_sheets_rank;
    }
    get num_shots(): number {
        return this._num_shots;
    }
    get num_shots_rank(): number {
        return this._num_shots_rank;
    }
    get num_crosses(): number {
        return this._num_crosses;
    }
    get num_crosses_rank(): number {
        return this._num_crosses_rank;
    }
    get pass_completion(): number {
        return this._pass_completion;
    }
    get pass_completion_rank(): number {
        return this._pass_completion_rank;
    }
    get final_third_completion(): number {
        return this._final_third_completion;
    }
    get final_third_rank(): number {
        return this._final_third_rank;
    }
}

export default function Page({params} : {params : {team: string}}){
    const [imgSrc, setImgSrc] = useState('');
    const [img2Src, setImg2Src] = useState('');
    const [pressImgSrc, setPressImgSrc] = useState('');
    const [selected, setSelected] = useState('Premier League');
    const [goals, setGoals] = useState();
    const [teams, setTeams] = useState(new Array<string>());
    const [teamStats, setTeamStats] = useState(new TeamStats());

    const teamColors: Record<string, string> = {
        "Manchester City": "bg-[#6CABDD]",
        "Arsenal": "bg-[#EF0107]",
        "Everton": "bg-[#003399] text-white",
        "Aston Villa": "bg-[#95bfe5] text-[#670e36]",
        "AFC Bournemouth": "bg-[#DA291C] text-black",
        "Brighton & Hove Albion": "bg-[#0057B8]",
        "Burnley": "bg-[#6C1D45] text-[#ede939]",
        "Chelsea": "bg-[#034694] text-[#d1d3d4]",
        "Crystal Palace": "bg-[#1B458F] text-[#a7a5a6]",
        "Leicester City": "bg-[#003090] text-[#fdbe11]",
        "Liverpool": "bg-[#c8102E]",
        "Manchester United": "bg-[#DA291C] text-[#FBE122]",
        "Newcastle United": "bg-[#241F20] text-white",
        "Norwich City": "bg-[#FFF200] text-[#00A650]",
        "Southampton": "bg-[#d71920] text-[#130c0e]",
        "Tottenham Hotspur": "bg-[#132257] text-white",
        "Watford": "bg-[#FBEE23] text-[#11210C]",
        "West Ham United": "bg-[#7A263A] text-[#F3D459]",
        "Wolverhampton Wanderers": "bg-[#FDB913] text-[#231F20]",
        "Stoke City": "bg-[#E03A3E] text-[#1B449C]",
        "Swansea City": "bg-black text-white",
        "West Bromwich Albion": "bg-[#122F67] text-white",
        "Sunderland": "bg-[#fd1220] text-white"
    }
    const englishOrdinalRules = new Intl.PluralRules('en', { type: 'ordinal' })
/**
 * @link https://stackoverflow.com/a/57518703/223225
 */
    function numToOrdinal(num: number) {
        const category = englishOrdinalRules.select(num)
        switch (category) {
            case 'one': {
                return `${num}st`
            }
            case 'two': {
                return `${num}nd`
            }
            case 'few': {
                return `${num}rd`
            }
            default: {
                return `${num}th`
            }
        }
    }

    function getTeamColors(team: string): string {
        return teamColors[team];
    }
    function displayPlots() {
        const newImgSrc = `/api/plot_team_shots_end/${params.team}`;
        setImgSrc(newImgSrc);
        setTimeout(()=> {
            const newImg2Src = `/api/plot_team_shots_start/${params.team}`;
            setImg2Src(newImg2Src);
        }, 2000);
        setTimeout(()=>{
            const newPressImgSrc = `/api/plot_press_location/${params.team}`;
            setPressImgSrc(newPressImgSrc);
        }, 4000);
    }
    function getTeams() {
        fetch('/api/get_teams')
        .then(res => res.json()).then(data => setTeams(data));
    }
    function getGoals() {
        console.log(params.team);
        fetch(`/api/get_stats/${params.team}`)
        .then(res => res.json()).then(data => setTeamStats(new TeamStats({GF: data['GF'], GFR: data['GFR'], GA: data['GA'], GAR: data['GAR'], CS: data['CS'], CSR: data['CSR'], NS: data['TS'], NSR: data['TSR'], NC: data['TC'], NCR: data['TCR'], PC: data['PC'], PCR: data['PCR'], FT: data['FT'], FTR: data['FTR']})));
    }
    useEffect(()=> {
        displayPlots();
        getTeams();
        getGoals();
        console.log(teamStats)
    }, []);
   
    function ToolTipComponent(){
        return (
            <div className=" inline-block tooltip tooltip-info" data-tip="info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
        )
    }
    return (
        <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  
  <div className="drawer-content">
    <div className="container mx-[10%] w-full min-h-screen">
      <Navbar/>
      <div className='w-full justify-center flex flex-col items-center mb-8'>
        <h2 className='text-4xl text-center font-extrabold mb-4 p-2'>2015/16 season</h2>
        <div className='w-full flex items-center justify-center'>
          <div className="flex-1">
            <label htmlFor="my-drawer" className='text-2xl text-left font-extrabold p-2 btn btn-outline'>Change team</label>
          </div>
          <h2 className={'text-4xl text-center font-extrabold outline-2 outline p-2 rounded-md ' + (getTeamColors(decodeURIComponent(params.team))) }>{decodeURIComponent(params.team)}</h2>
          <div className='flex-1'></div>
        </div>
      </div>
      <div className="stats shadow-lg shadow-amber-300/75 outline outline-2 outline-amber-300">
                <Stat name={'Goals Scored'} value={teamStats.goals_for} rank={numToOrdinal(teamStats.goals_for_rank)} ToolTip={ToolTipComponent} />
                <Stat name={'Goals Conceeded'} value={teamStats.goals_against} rank={numToOrdinal(teamStats.goals_against_rank)} ToolTip={ToolTipComponent}/>
                <Stat name={'Clean Sheets'} value={teamStats.clean_sheets} rank={numToOrdinal(teamStats.clean_sheets_rank)} ToolTip={ToolTipComponent}/>
                <Stat name={'Number of Shots'} value={teamStats.num_shots} rank={numToOrdinal(teamStats.num_shots_rank)} ToolTip={ToolTipComponent}/>
                <Stat name={'Number of crosses'} value={teamStats.num_crosses} rank={numToOrdinal(teamStats.num_crosses_rank)} ToolTip={ToolTipComponent}/>
                <Stat name={'Pass Completion'} value={teamStats.pass_completion} rank={numToOrdinal(teamStats.pass_completion_rank)} ToolTip={ToolTipComponent}/>
                <Stat name={'Final Third Pass Completion'} value={teamStats.final_third_completion} rank={numToOrdinal(teamStats.final_third_rank)} ToolTip={ToolTipComponent}/>
                
        </div>
      <div className="flex flex-col justify-center">
        {imgSrc && <img className="mt-4 ring-4 ring-offset-8 ring-slate-800 p-4 bg-gray-800 scale-50" src={imgSrc}/>}
        {img2Src && <img className="mt-4 ring-4 ring-offset-8 ring-slate-800 p-4 bg-gray-800 scale-50" src={img2Src}/>}
        {pressImgSrc && <img className="mt-4 ring-4 ring-offset-8 ring-slate-800 p-4 bg-gray-800 scale-50" src={pressImgSrc}/>}
      </div>
    </div>
  </div>
  
  <div className="drawer-side z-10">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>

    <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <CollapseItem name="Premier League" selected={selected === 'Premier League'} setSelected={setSelected} items={teams}/>
        <CollapseItem name="Bundesliga" selected={selected === 'Bundesliga'} setSelected={setSelected}/>
        <CollapseItem name="Serie A" selected={selected === 'Serie A'} setSelected={setSelected}/>
        <CollapseItem name="La Liga" selected={selected === 'La Liga'} setSelected={setSelected}/>
        <CollapseItem name="Ligue 1" selected={selected === 'Ligue 1'} setSelected={setSelected}/>
    </div>
  </div>
</div>
    )
}

/**
 *  1.	Total Goals Scored: DONE
	2.	Total Goals Conceded: DONE
	3.	Clean Sheets: DONE
	4.	Average Possession
	5.	Shots: DONE
	6.	Pass Accuracy: DONE
	7.	Fouls Committed
	8.	Corners Won: DONE
	9.	Yellow Cards
	10.	Top Scorer


    Modal
    Tooltip for info_text
 */