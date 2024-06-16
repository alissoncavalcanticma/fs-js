import React from "react";
import {Container, Form, Row, Col, Alert, FormGroup, FormLabel} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { BoxContent, BoxForm } from './styles'; 

import Logo from '../../../assets/logo.png';

class SignUp extends React.Component {
    render(){
        return(
            <Container>
                <Row className="justify-content-md-center"> 
                    <Col xs={12} md={7}>
                        <BoxContent>
                            <img src={Logo} alt='MailShrimp'/>
                        </BoxContent>
                        <BoxForm>
                            <h2>Cadastro</h2>
                            <p>Preencha com seus dados!</p>
                            <Form>
                                <FormGroup controlId="nomeGroup">
                                    <FormLabel>Nome:</FormLabel>
                                    <Form.Control type="text" placeholder="Digite seu nome"/>
                                </FormGroup>
                                <FormGroup controlId="emailGroup">
                                    <FormLabel>E-mail:</FormLabel>
                                    <Form.Control type="email" placeholder="Digite seu e-mail"/>
                                </FormGroup>
                                <FormGroup controlId="dominioGroup">
                                    <FormLabel>Domínio:</FormLabel>
                                    <Form.Control type="url" placeholder="Digite seu domínio"/>
                                </FormGroup>
                                <FormGroup controlId="senhaGroup">
                                    <FormLabel>Senha:</FormLabel>
                                    <Form.Control type="password" placeholder="Digite sua senha"/>
                                </FormGroup>
                                <br />
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit">
                                        Realizar cadastro
                                    </Button>
                                </div>
                            </Form>
                            <BoxContent>
                                <Link className="button" to="/signin">Voltar para o login</Link>
                            </BoxContent>
                        </BoxForm>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SignUp;