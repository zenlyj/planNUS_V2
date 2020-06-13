import React, { Component } from "react";
import {Container, Row, Col} from 'reactstrap';
import Timetable from './components/Timetable'

export const Home = (props) => {

    return (
        <React.Fragment>
            <Timetable />
        </React.Fragment>
    )
}