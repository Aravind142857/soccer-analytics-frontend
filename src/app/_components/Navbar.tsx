
export default function Navbar(){
    return (
        <div className="navbar self-center w-full sticky top-4 mb-16 z-10 bg-slate-900 p-4 rounded-xl outline outline-2 outline-white shadow-lg shadow-white/75">
            <div className="navbar-start">
                <a className="btn btn-outline" role="button" href="/home">
                    <h1 className="text-4xl font-extrabold ">Soccer Analytics</h1>
                </a>
            </div>
            <div className="navbar-center">
                <button className="btn btn-outline btn-primary mr-2 text-lg">Get Data</button>
                <a className="btn btn-outline btn-secondary mr-2 text-lg" href="/team-stats">Team Stats</a>
                <button className="btn btn-outline btn-secondary mr-2 text-lg">Match Stats</button>
                <button className="btn btn-outline btn-secondary mr-2 text-lg">Player Stats</button>
                
            </div>

        </div>
    )
}