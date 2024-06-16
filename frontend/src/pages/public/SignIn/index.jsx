
import React from 'react';

import {Alert, Form, Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Logo from '../../../assets/logo.png';
import { BoxContent, BoxForm } from './styles'; 

//usar withRouter para usar props na rota ** Também precisa ajustar o export
import {Link} from 'react-router-dom';

//método que aciona o axios
import api from '../../../services/api';
//método responsável por salvar o login no localStorage
import { login } from '../../../services/auth';


//Function SignIn
class Signin extends React.Component{

    state = {
        email: '',
        password: '',
        error: ''
    }

    handleSigin = async(event) => {
        //Evita que seja executada a request para própria Pagina
        event.preventDefault();
        
        const {email, password, error} = this.state;

        if(!email || !password){
            this.setState({error: "Informe e-mail e senha para logar."})
        }else{
            //Apaga objeto de erro
            this.setState({error: ""})

            //Chamada de endpoint POST /accounts para login
            try {
                const response = await api.post('accounts/login', {
                    email, password
                });
                login(response.data.token);
                // eslint-disable-next-line react/prop-types
                //this.props.useHistory.push("/");

            } catch (error) {
                console.log(error);
                this.setState({error: "Ocorreu um erro ao logar."})
            }
        }
    }


    renderError = () => {
        return (
            <Alert variant="danger">
                {
                    this.state.error
                }
            </Alert>
        )
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
                            {this.state.error && this.renderError()}
                            <Form onSubmit={this.handleSigin}>
                                <Form.Group controlId='emailGroup'>
                                    <Form.Label>E-mail:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu e-mail"
                                        onChange={e => this.setState({email: e.target.value})}
                                        />
                                </Form.Group>
                                <Form.Group controlId="passwordGroup">
                                    <Form.Label>Senha:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Digite sua senha" 
                                        onChange={e => this.setState({password: e.target.value})}
                                        />
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