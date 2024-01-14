import React from 'react';
import classes from './App.module.scss';
import {Link, Outlet} from "react-router-dom";
import About from "@/pages/About/About";
import avatarPng from '@/assets/icons8.png';
import avatarJpg from '@/assets/3d.jpg';
import Cloud from '@/assets/cloud.svg';

function TODO() {
    console.log('TODO FUNCTION')
}

export const App = () => {
    const [count, setCount] = React.useState<number>(0);

    if(__PLATFORM__ === 'desktop') {
        return <div>Desktop</div>
    }

    if(__PLATFORM__ === 'mobile') {
        return <div>Mobile</div>
    }

    return (
        <div>
            <h1>Platform{__PLATFORM__}</h1>
            <div>
                <img width={100} height={100} src={avatarPng} alt={''}/>
                <img width={100} height={100} src={avatarJpg} alt={''}/>
            </div>
            <div>
                <Cloud color={'red'} width={100} height={100} />
            </div>

            <Link to={'/About'}>about</Link>
            <br/>
            <Link to={'/Shop'}>shop</Link>
            <p className={classes.value}>Hello from App</p>
            <button className={classes.button} onClick={() => setCount(pevState => pevState + 1)}><span>{count}</span></button>
            <Outlet />
            <About />
        </div>

    );
};
