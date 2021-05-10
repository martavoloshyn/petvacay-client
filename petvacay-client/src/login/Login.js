import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../utils/services';

export class Login extends React.Component {
    state = {
        userEmail: undefined,
        password: undefined,
        status: undefined,
        errorMessage: undefined,
        isEmptyField: false
    };

    setEmail = (email) => {
        this.setState({ userEmail: email.target.value });
    };

    setPassword = (pass) => {
        this.setState({ password: pass.target.value });
    };

    insertLoginData = () => {
        const data = {
            userEmail: this.state.userEmail,
            password: this.state.password,
        };

        axios.post('http://localhost:8080/petvacay/api/v1/sign-in',
            data,
            { withCredentials: true })
            .then((response) => {
                this.setState({
                    status: response.status,
                });
            })
            .catch((err) => {
                this.setState({isEmptyField: this.isEmptyField()});
                this.setState({status: err.status});
                this.setState({ errorMessage: err.data.message });
            });
    };

    isEmptyField = () =>
        this.state.userEmail === undefined || this.state.userEmail === ''
        || this.state.password === undefined || this.state.password === '';


    toRedirect = () => this.state.status === 200 && window.location.replace('http://localhost:3000/');

    render() {
        return (
            <Modal.Dialog style={{ width: '400px', height: '400px' }}>
                <Modal.Header>
                    <Modal.Title style={{ textAlign: 'center' }}>Вхід у PetVacay</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-8">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control
                                required
                                type="userEmail"
                                placeholder="Введіть ваш email"
                                onChange={this.setEmail}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-8">
                        <Form.Group controlId="formPlaintextPassword">
                            <Form.Control
                                required
                                type="password"
                                placeholder="Введіть ваш пароль"
                                onChange={this.setPassword}
                            />
                        </Form.Group>
                    </div>

                    <div>
                        {
                            this.state.isEmptyField
                            && <div className="alert alert-secondary" role="alert">Всі поля повинні бути заповненими</div>
                        }
                        {
                            this.state.status === 401
                            && <div className="alert alert-danger" role="alert">Емейл або пароль було введено неправильно</div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" size="lg" onClick={this.insertLoginData}>Увійти</Button>
                    <Button variant="outline-dark" as={Link} to="/registration" size="lg">Реєстрація</Button>
                </Modal.Footer>

                <div>
                    {' '}
                    {this.toRedirect()}
                </div>
            </Modal.Dialog>
        );
    }
}

export default Login;
