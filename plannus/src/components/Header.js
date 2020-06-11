import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

export const Header = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">PlanNUS</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="http://116.14.246.142:80/openid.php?nusnet_id">Login</Nav.Link></Nav.Item>
        </Nav>
    </Navbar>
  </Styles>
)