import { Stats } from "fs"

interface stats {
    name: string | null
    value: number | null
    rank: string | null
    ToolTip: Function | null
}
const Stat: React.FC<stats> = ({name = null, value = null, rank = null, ToolTip = null}) => {
    return (
        <div className="stat">
                    <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current">
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                    </div>
                    <div className="stat-title text-white/50">
                    <text className=" inline-block pr-2">{name}</text>
                    {ToolTip != null?ToolTip(): null}


                    </div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-desc text-lg">↘︎ {rank}</div>
                </div>
    )
}
export default Stat;