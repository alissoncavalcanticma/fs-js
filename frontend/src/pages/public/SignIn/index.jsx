
import React from 'react';

import {Form, Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Logo from '../../../assets/logo.png';
import { BoxContent, BoxForm } from './styles'; 

import {Link} from 'react-router-dom';


//Function SignIn
class Signin extends React.Component{

    handleSigin = async(event) => {
        //Evita que seja executada a request para própria Pagina
        event.preventDefault();    
    }

    render(){
        return(
            <Container>
                <Row className="justify-content-md-center"> 
                    <Col xs={12} md={5}>
                        <BoxContent>
                            <img src={Logo} alt='MailShrimp'/>
                        </BoxContent>
                        <BoxForm>
                            <h2>Login</h2>
                            <p>Informe seus dados para autenticar: </p>
                            <Form onSubmit={this.handleSigin}>
                                <Form.Group controlId='emailGroup'>
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu e-mail"/>
                                </Form.Group>
                                <Form.Group controlId="passwordGroup">
                                    <Form.Label>Senha:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite sua senha" />
                                </Form.Group>
                                <br />
                                <div className="d-grid gap-2">
                                    <Button variant="secondary" type="submit">
                                        Fazer Login
                                    </Button>
                                </div>
                            </Form>
                        </BoxForm>
                        <BoxContent>
                            <p>Novo na plataforma?</p>
                            <Link className="button" to="/signup">Crie sua conta agora</Link>
                        </BoxContent>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signin;