import { UserButton } from '@clerk/clerk-react';
import React, { FC } from 'react';
import { Route } from 'react-router';
import Discover from '../Discov/Discover';
import NavBar from '../NavBar/NavBar';
import { useAuth } from '@clerk/clerk-react';
import ProfilePage from '../ProfilePage/ProfilePage';


function Dashboard(){
    const userId = useAuth().userId;
    return (
        <>
            <NavBar />
            <UserButton/>
            {userId === null ? <Discover/> : <ProfilePage /> }
        </>
    );
};

export default Dashboard;