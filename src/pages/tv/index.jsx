import React from 'react';
import PinjamRuangan from './pinjamRuangan';
import Team from './Team';

export default function TV() {
    return (
        <div className='grid grid-rows-5 grid-cols-8 gap-1 h-screen w-screen overflow-hidden'>
            <div className='col-span-2 row-span-3 bg-slate-200 overflow-hidden'>
                <PinjamRuangan />
            </div>
            <div className='col-span-2 row-span-3 bg-slate-200'>2</div>
            <div className='col-span-2 row-span-2 bg-slate-200 overflow-hidden'>
                <Team />
            </div>
            <div className='col-span-2 row-span-2 bg-slate-200'>4</div>
            <div className='col-span-2 row-span-2 bg-slate-200'>5</div>
            <div className='col-span-2 row-span-2 bg-slate-100'>7</div>
            <div className='col-span-2 row-span-2 bg-slate-200'>8</div>
            <div className='col-span-2 row-span-2 bg-slate-200'>9</div>
            <div className='col-span-4 row-span-2 bg-slate-200'>6</div>
        </div>
    );
}