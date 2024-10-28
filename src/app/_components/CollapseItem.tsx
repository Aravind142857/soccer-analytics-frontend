import Link from "next/link"


interface Props {
    name: string | null
    selected?: boolean | undefined
    setSelected: Function
    items?: Array<string> | undefined
}
const CollapseItem: React.FC<Props> = ({name = null, selected = undefined, setSelected, items})=> {
    return (
        
        <div className="collapse">
            <input type='radio' name='league' checked={selected} onChange={()=> setSelected(name)}/>
            <div className="collapse-title text-xl font-medium">{name}</div>
            <div className="collapse-content">
                <ul>
                    {items?items.map((item) => (
                        <li><a href={`/team-stats/team/${item}`}>{item}</a></li>
                    )):<></>}
                </ul>
            </div>
        </div>
    );
}
export default CollapseItem