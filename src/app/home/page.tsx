"use client"
import Dropdown from '../_components/Dropdown';
import Navbar from '../_components/Navbar';
import {useState, useEffect} from 'react';

export default function Home() {
    const [data, setData] = useState(null);
    const [buttonLabels, setButtonLabels] = useState(null);
    const [optionSelected, setOptionSeleceted] = useState(null);
    useEffect(()=>{
        // fetch('/api/data')
        // .then(res => res.json()).then(data => setData(data));
        fetch('/api/buttonLabels')
        .then(res => res.json()).then(data => setButtonLabels(data));
    }, []);
    return (
        <div className="container mx-auto w-full min-h-screen">
            <Navbar />
            <div className='flex flex-col justify-center'>
                <h1 className='flex self-center mb-8 text-4xl underline font-extrabold'>Soccer Data</h1>
                <h1 className='flex self-center mb-8 text-2xl font-serif'>Brought to you by the StatsBomb open data</h1>
            </div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {/* <p>Competitions: {buttonLabels != null?buttonLabels['competition_names']:""}</p> */}
            {/* <p>Season: {buttonLabels != null?buttonLabels['season_names']:""}</p> */}
            <Dropdown options={buttonLabels!= null? Object.keys(buttonLabels): null} label={'competition'} selected={optionSelected} setSelected={setOptionSeleceted}/>
            {optionSelected!=null && (
                <>
                    <Dropdown options={buttonLabels!= null? buttonLabels[optionSelected]: null} label={'season'} />
                </>
            )}
        </div>
    );
}