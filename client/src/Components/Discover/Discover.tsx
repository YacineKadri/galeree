import React, { FC } from 'react';

interface Discover {
    message: string;
}


function Discover(props:Discover){
    return (
        <>
            <h1>Welcome {props.message}</h1>
        </>
    );
};

export default Discover;