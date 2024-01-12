import React from 'react';
import classes from './App.module.scss';
import {Link, Outlet} from "react-router-dom";

export const App = () => {
    const [count, setCount] = React.useState<number>(0);

    return (
        <div>
            <Link to={'/About'}>about</Link>
            <br/>
            <Link to={'/Shop'}>shop</Link>
            <p className={classes.value}>Hello from App</p>
            <button className={classes.button} onClick={() => setCount(pevState => pevState + 1)}><span>{count}</span></button>
            <Outlet />
        </div>

    );
};
