import React from 'react';

import {
    BrowserRouter as Router,        //For create component Router
    Route,                          //For route
    Link,                           //For Link to route
    useParams,                      //Hook for capture and use query and uri params
    useLocation,
    Outlet                          //Hook for definition sub routes

} from 'react-router-dom';

import { Routes } from 'react-router'; //Hook substitute for Switch

//Import Functions

import Signin from '../src/pages/public/SignIn';


//Main menu

function Menu(){
    return(
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/contacts">Contatos</Link>
                </li>
                <li>
                    <Link to="/messages">Lista de mensagens</Link>
                </li>
                <li>
                    <Link to="/signin">Sair</Link>
                </li>
            </ul>
        </div>
    )
}

//Functions of the Menu pages

//Option Home
function Home(){
    return(
        <div>
            <Menu/>
            <h2>Dashboard</h2>
        </div>
    )
}

//Option Contacts
function Contacts(){
    //let location = useLocation(); //Hook de path
    //let {pathname} = useLocation(); //Hook de path
    //let {match} = useRouteMatch();
    let path = '/contacts';
    return(
        <div>
            <Menu/>
            <h2>Lista contatos</h2>
            <ul>
                <li>
                    {/*<Link to={`${url}/1`}>Contato A</Link>*/}
                    <Link to={`${path}/1`}>Contato A</Link>
                </li>
                <li>
                    {/*<Link to='/contacs/2'>Contato B</Link>*/}
                    <Link to={`${path}/2`}>Contato B</Link>
                </li>
                <li>
                    {/*<Link to='/contacs/3'>Contato C</Link>*/}
                    <Link to={`${path}/3`}>Contato C</Link>
                </li>
            </ul>

            {/* Definition of the sub route contact using outlet hook */}
            <div>
                <Outlet/>
            </div>

        </div>
    );
}

// Function to sub route Contact
function Contact(){
    let {contactId} = useParams();
    return(
        <div>
            <h3>Contato: {contactId}</h3>
        </div>
    )
}

// Function Signup
function Signup(){
    return(
        <div>
            
            <h2>Cadastro</h2>
        </div>
    )
}

// Function Messages
function Messages(){
    return(
        <div>
            <Menu/>
            <h2>Lista de Mensagens</h2>
        </div>
    )
}


//Function AllRoutes/Routes for default redirect pages
export default function AllRoutes(){
    return(
            <Router>    
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/contacts/*" element={<Contacts /> } >
                        <Route path=":contactId" element={<Contact />} />
                    </Route>
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
    );
}

//export default AllRoutes;