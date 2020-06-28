import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import Auth from './Auth';
import { Login}  from './Login';

export const Header = () => (
  <Navbar expand="lg" className="header">
    <Navbar.Brand href="/">PlanNUS</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Item><Login /></Nav.Item>
      </Nav>
  </Navbar>
)