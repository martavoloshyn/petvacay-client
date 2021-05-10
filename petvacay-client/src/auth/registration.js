import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from '../utils/services';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class Registration extends React.Component {
    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        cpassword: undefined,
        roleId: 1,
        status: undefined,
        invalidEmail: undefined,
        duplicateEmail: undefined,
        invalidPassword: undefined,
    };

    setEmail = (e) => {
        this.setState({
            email: e.target.value,
            invalidEmail: undefined,
            duplicateEmail: undefined,
        });
    };

    setRole = (e) => {
        this.setState({
            roleId: e.target.value
        });
    };

    setPassword = (e) => {
        this.setState({
            password: e.target.value,
            invalidPassword: undefined,
        });
    };

    setFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    };

    setLastName = (e) => {
        this.setState({ lastName: e.target.value });
    };

    setConfirmPassword = (e) => {
        this.setState({ cpassword: e.target.value });
    };

    insertRegistrationData = () => {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            roleId: this.state.roleId,
            status: 0,
        };

        axios.post('http://localhost:8080/petvacay/api/v1/registration',
            data,
            { withCredentials: true })
            .then((response) => {
                this.setState({
                    status: response.status,
                    invalidEmail: undefined,
                    duplicateEmail: undefined,
                    invalidPassword: undefined,
                });
            })
            .catch((err) => {
                //const errors = err.data.message;
                // const
                this.setState({status: err.status});
            });
    };

    isValidForm = () => this.arePasswordsEqual
            && !this.isEmptyField();

    arePasswordsEqual = () => this.state.cpassword === this.state.password;

    isEmptyField = () => this.state.firstName === undefined || this.state.firstName === ''
            || this.state.lastName === undefined || this.state.lastName === ''
            || this.state.email === undefined || this.state.email === ''
            || this.state.password === undefined || this.state.password === ''
            || this.state.cpassword === undefined || this.state.cpassword === '';

    isVisible = () => this.state.status === 200;

    render() {
        return (

            <div align="center">
                <h2>Реєстрація </h2>

                <div className="col-5 ">
                    <Form.Group controlId="formForFirstName">
                        <Form.Control type="firstName" placeholder="Введіть ваше ім'я" onChange={this.setFirstName} />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formForLastName">
                        <Form.Control
                            type="lastName"
                            placeholder="Введіть ваше прізвище"
                            onChange={this.setLastName}
                        />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Введіть ваш email"
                            onChange={this.setEmail}
                            isInvalid={!!this.state.invalidEmail || !!this.state.dublicationEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            {this.state.invalidEmail}
                            {this.state.dublicationEmail}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword">
                        <Form.Control
                            type="password"
                            placeholder="Введіть ваш пароль"
                            onChange={this.setPassword}
                            isInvalid={!!this.state.invalidPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {this.state.invalidPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group controlId="formPlaintextPassword2">
                        <Form.Control
                            type="password"
                            placeholder="Повторіть ваш пароль"
                            onChange={this.setConfirmPassword}
                        />
                    </Form.Group>
                </div>

                <div className="col-5">
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Роль
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Замовник"
                                value="1"
                                name="formHorizontalRadios"
                                checked={this.state.roleId===1}
                                onChange={this.setRole}
                                id="1"
                            />
                            <Form.Check
                                type="radio"
                                label="Виконавець"
                                value="2"
                                name="formHorizontalRadios"
                                checked={this.state.roleId===2}
                                onChange={this.setRole}
                                id="2"
                            />
                        </Col>
                    </Form.Group>
                </div>

                <div>
                    {' '}
                    {' '}
                    {this.isEmptyField() && <div className="alert alert-primary" role="alert">Всі поля повинні бути заповненими</div>}
                    {this.arePasswordsEqual() && <div className="alert alert-primary" role="alert">Паролі повинні співпадати</div>}
                    {this.state.status === 400 && <div className="alert alert-primary" role="alert">Обліковий запис для такого email вже існує</div>}
                </div>

                <button
                    className="btn btn-success"
                    onClick={this.insertRegistrationData}
                    disabled={!this.isValidForm()}
                >
Зареєструватися
                </button>

                <div>
                    {' '}
                    {this.isVisible()
                && <div className="alert alert-primary" role="alert">Для активації акаунту перевірте вашу поштову скриньку</div>}
                </div>

            </div>

        );
    }
}
