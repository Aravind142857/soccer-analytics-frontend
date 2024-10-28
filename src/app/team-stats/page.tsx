"use client"
import Link from 'next/link';
import Dropdown from '../_components/Dropdown';
import Navbar from '../_components/Navbar';
import {useState, useEffect} from 'react';

export default function Home() {
    const [data, setData] = useState(null);
    const [buttonLabels, setButtonLabels] = useState(null);
    const [optionSelected, setOptionSeleceted] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    
    const handleSelectedTeam = (team:string) => {
        setSelectedTeam(team);
    };
    useEffect(()=>{
        // fetch('/api/data')
        // .then(res => res.json()).then(data => setData(data));
        fetch('/api/competitions15_16')
        .then(res => res.json()).then(data => setButtonLabels(data));
    }, []);

    return (
        <div className="container mx-auto w-full min-h-screen">
            <Navbar />
            <main className='px-[30%]'>
                <div className='mb-14'>
                    <h2 className='text-2xl mb-16'>2015/16 season</h2>
                    <Dropdown options={buttonLabels!=null?buttonLabels['competitions']:null} label={'competition'} setSelected={setOptionSeleceted} setTeams={setTeams} get_teams={true}/>
                </div>
                
                {(teams && teams.length > 0)?<Dropdown options={teams} label={'team'} handleTeamSelected={handleSelectedTeam}/> :<></>}
                {selectedTeam != ''?<div className='w-full flex justify-center mt-8'><Link className='btn btn-link btn-outline justify-center btn-info text-2xl font-serif' href={`/team-stats/team/${selectedTeam}`}>{selectedTeam}</Link></div>: <></>}
           </main>
        </div>
        
    )
}
// Shot Ends done
