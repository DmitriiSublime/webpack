import React from 'react';
import './App.scss';

export const App = () => {
    const [count, setCount] = React.useState<number>(0);


    return (
        <div>
            Hello from App
            <button onClick={() => setCount(pevState => pevState + 1)}><span>{count}</span></button>

        </div>
    );
};
