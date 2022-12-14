import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import './GroupDetails.css';
import { fetchOneGroup } from '../../store/group';
import { deleteGroupThunk } from '../../store/group';

export default function GroupDetails() {

    const dispatch = useDispatch();
    const { groupId } = useParams();
    const history = useHistory();
    const test = useSelector((state) => state.groups);
    const thisGroup = test[groupId];
    const thisUser = useSelector(state => state.session.user);

    const isOwner = thisUser?.id === thisGroup?.organizerId;
    const routeChange = () => {
        let path = `/groups/${groupId}/edit`
        history.push(path);
    }
    const routeChange2 = () => {
        let path = `/groups/${groupId}/events/new`
        history.push(path);
    }
    useEffect(() => {
        dispatch(fetchOneGroup(groupId))
    }, [dispatch]);

    const handleDelete = async groupId => {
        const thisDelete = await dispatch(deleteGroupThunk(groupId));
        history.push(`/groups`);
    }

    if (!thisGroup) return null;
    return (
        <>
            <div className='main-container'>
                <div className='top-container_'>
                    <div className='left-top-container'>
                        {thisGroup.GroupImages && thisGroup.GroupImages[0] && <img className='big-image' src={thisGroup.GroupImages[0].url}></img>}
                        {(!thisGroup.GroupImages || !thisGroup.GroupImages[0]) && <div className='place-holder-group-img' ></div>}
                    </div>

                    <div className='right-top-container'>
                        <div className='name'>{thisGroup.name}</div>
                        <div className='location'>🌍 {thisGroup.city}, {thisGroup.state}</div>
                        <div className='members-public'>👥 {thisGroup.numMembers} {thisGroup.numMembers === 1 ? "member" : "members"} · {thisGroup.private ? "Private" : "Public"} group </div>
                        <div className='organizer'>👤 Organized by {thisGroup.Organizer.firstName}</div>
                    </div>
                </div>
                <div className='middle-container'>
                    <div className='button-container'>
                        {isOwner &&
                            <button className='button' onClick={() => handleDelete(groupId)}>Delete Group</button>}
                    </div>
                    <div className='button-container'>
                        {isOwner &&
                            <button className='button' onClick={routeChange}>Edit Group</button>}
                    </div>
                    <div className='button-container'>
                        {isOwner &&
                            <button className='button' onClick={routeChange2}>Create Event</button>}
                    </div>
                    <div className='notice'>
                        {!isOwner &&
                            <p>You are not an organizer of this group</p>}
                    </div>

                </div>
                <div className='bottom-container'>
                    <div className='bottom-left-container'>
                        <div class='about'>
                            What we're about
                            <br />
                            {thisGroup.about}
                        </div>
                    </div>
                    {/* <div className='bottom-right-container'>Organizer: {thisGroup.Organizer.firstName} {thisGroup.Organizer.lastName}</div> */}
                </div>
                <br />
            </div>
        </>
    )
}
