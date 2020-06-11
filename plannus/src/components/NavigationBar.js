import React from 'react';
import styled from "styled-components";
import {Router, Link} from 'react-router-dom';
/* This defines the actual bar going down the screen */
const StyledSideNav = styled.div`
  position: absolute;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 10%;     /* Set the width of the sidebar */
  background-color: #444; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;
export class NavigationBar extends React.Component {
  render() {
    return (
      <StyledSideNav>
        <ul>
          <li><Link to='/'>Timetable</Link></li>
          <li><Link to='/Diary'>Diary</Link></li>
          <li><Link to='/Stats'>Stats</Link></li>
          <li><Link to='/Settings'>Settings</Link></li>
        </ul>
      </StyledSideNav>
    );
  }
}
