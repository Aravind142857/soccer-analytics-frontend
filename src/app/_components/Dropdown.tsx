
interface Props {
    options: string[] | null
    label: string
    selected?: boolean | null
    setSelected?: Function | null
    setTeams?: Function | null
    get_teams?: boolean | null
    request_obj?: string | null
    handleTeamSelected?: Function | null
}


const Dropdown:React.FC<Props> = ({ label, options=null, selected=null, setSelected=null, setTeams=null, get_teams = null, request_obj = null, handleTeamSelected = null}) => {
    function handle_request(option:string): void{
        if (request_obj == null){
            return;
        }
        if (request_obj == 'teams') {
            getTeams(option);
            return;
        }
        // if (request_obj == 'team_stats') {
        //     getTeamStats(option);
        // }

    }
    function getTeams(competition:string){
        var competition_str:string = encodeURIComponent(competition);
        console.log(competition_str);
        fetch(`/api/teams_from_competitions/${competition_str}`)
        .then(res => res.json())
        .then(data => {
            setTeams!=null?setTeams(data['teams']):console.log();
        })
    }
    // function getTeamStats(team:string) {
    //     var team_str:string = encodeURIComponent(team);
    //     console.log(team_str);
    //     fetch(`/api/stats_from_team/${team_str}`);
    //     // .then(res => res.json())
    //     // .then(data => {
    //     //     setTeams!=null?setTeams(data['teams']):console.log();
    //     // })
    // }
    return (
        <div className="flex justify-center scale-150">
        <select className="bg-black text-2xl flex justify-center self-center outline outline-4 outline-white" defaultValue='Select a Competition' required onChange={(e)=>{
            setSelected != null?setSelected(e.target.value):selected;
            console.log(setTeams != null);
            (get_teams && setTeams!=null)?getTeams(e.target.value):null;
            handleTeamSelected?handleTeamSelected(e.target.value):null;
            
        }}>
            <option key={-1} value={''} disabled >Choose a {label}</option>
            {options != null? options.map((option, idx) => (
                <option key={idx} value={option}>
                    {option}
                </option>
            )): <option key={0} value={'unavailable'}>Unavailable</option>}
        </select>
        </div>
    );
}
export default Dropdown