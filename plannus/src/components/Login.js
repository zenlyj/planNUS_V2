import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import Auth from './Auth';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

const onLogout = () => {
    Cookies.set("loggedIn", false);
    Redirect("/");
}
export const Login = () => (
    !Auth.isAuthenticated() ? <Nav.Link href="http://116.14.246.142:80/openid.php?nusnet_id">Login</Nav.Link> : <Nav.Link href="/" onClick={onLogout}>Logout</Nav.Link>
)