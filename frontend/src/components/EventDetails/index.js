import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import './EventDetails.css';
import { fetchOneEvent } from '../../store/event';
import { deleteEventThunk } from '../../store/event';

export default function EventDetails() {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const history = useHistory();
    const thisEvent = useSelector((state) => state.events[eventId]);
    //const thisEvent = data[eventId];
    //console.log(thisEvent, "this event ------")
    const thisUser = useSelector(state => state.session.user);
    const isOwner = thisUser?.id === thisEvent?.Group?.organizerId;

    const routeChange = () => {
        let path = `/events/${eventId}/edit`
        history.push(path);
    }

    let properStartDate = '';
    let properEndDate = '';
    if (thisEvent) {
        properStartDate = (new Date(thisEvent.startDate)).toLocaleString();
        properEndDate = (new Date(thisEvent.endDate)).toLocaleString();
    }
    useEffect(() => {
        dispatch(fetchOneEvent(eventId));

    }, [dispatch]);

    const handleDelete = async eventId => {
        const thisDelete = await dispatch(deleteEventThunk(eventId));
        history.push(`/events`);
    }


    if (!thisEvent) return null;
    return (
        <>
            {/* {showProperFullDate(thisEvent.startDate)} */}
            <div className='main-container'>
                <div className='event-top-container'>
                    <div className='public_'>{<div>{properStartDate}</div>}</div>
                    <div className='name'>{thisEvent.name}</div>
                    <div className='host-name'>Hosted by {thisEvent.Group.Organizer.firstName}</div>
                </div>
                <div className='top-container_'>
                    <div className='left-top-container'>
                        {thisEvent.EventImages && thisEvent.EventImages[0] && <img className='big-image' src={thisEvent.EventImages[0].url}></img>}
                        {(!thisEvent.EventImages || !thisEvent.EventImages[0]) && <div className='place-holder-group-img' ></div>}
                    </div>
                    <div className='right-top-container'>
                        <div className='event-private-name'>
                            <div className='name'>{thisEvent.Group.name}</div>
                            <div className='public_'> {thisEvent.Group.private ? "Private" : "Public"} Group</div>
                        </div>
                        <br />
                        <div className='event-start-end'>
                            <div>{properStartDate} to {properEndDate}
                            </div>
                            <div className='event-private'>{thisEvent.type} event</div>
                        </div>

                    </div>
                </div>
                <div className='middle-container'>
                    <div className='button-container'>
                        {!isOwner &&
                            <p className='notice'>You are not an organizer of this event</p>}
                        {isOwner &&
                            <button className='button' onClick={() => handleDelete(eventId)}>Delete Event</button>}

                    </div>
                    <div className='button-container'>
                        {/* {isOwner &&
                            <button className='button' onClick={routeChange}>Edit Event</button>} */}
                    </div>
                </div>
                <div className='bottom-bar'>
                    <div className='about'>About: {thisEvent.description}</div>
                    <div className='about'>Capacity: {thisEvent.capacity}</div>
                    <div className='about'>Price: ${thisEvent.price}</div>
                    <div className='about'>Venue: {thisEvent.Venue.address}, {thisEvent.Venue.city}, {thisEvent.Venue.state}</div>
                </div>
            </div>
        </>
    )
}
