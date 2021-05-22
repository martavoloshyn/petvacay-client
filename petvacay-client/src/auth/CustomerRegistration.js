import React from "react";
import axios from "../utils/services";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Button } from 'react-bootstrap';

export class CustomerRegistration extends React.Component {
    state = {
        galleryId: undefined,
        status: undefined,
        city: undefined,
        aboutInfo: undefined,
        phoneNumber: undefined,
        pets: [{
            type : null,
            name: null,
            isPedigreed : false,
            breed : null,
            needWalking : false,
            needSpecialCare : false,
            birthDate : moment.now().valueOf(),
            isExotic : false,
            petSizeId : 1
        }],
        files:[]
    };

    setCity = (e) => {
        this.setState({
            city: e.target.value
        });
    };

    setAboutInfo = (e) => {
        this.setState({
            aboutInfo: e.target.value
        });
    };

    setPhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        });
    };

    setPetType = (e) => {
        let pet = this.state.pets[0];
        pet.type = e.target.value;
        this.setState({
            pets: [pet]
        });
    };

    setPetName = (e) => {
        let pet = this.state.pets[0];
        pet.name = e.target.value;
        this.setState({
            pets: [pet]
        });
    };

    setPetPedigreed = (e) => {
        let pet = this.state.pets[0];
        pet.isPedigreed = e.target.checked;
        this.setState({
            pets: [pet]
        });
    };

    setPetBreed = (e) => {
        let pet = this.state.pets[0];
        pet.breed = e.target.value;
        this.setState({
            pets: [pet]
        });
    };

    setPetNeedWalking = (e) => {
        let pet = this.state.pets[0];
        pet.needWalking = e.target.checked;
        this.setState({
            pets: [pet]
        });
    };

    setPetNeedSpecialCare = (e) => {
        let pet = this.state.pets[0];
        pet.needSpecialCare = e.target.checked;
        this.setState({
            pets: [pet]
        });
    };

    setPetBirthDate = (e) => {
        let pet = this.state.pets[0];
        pet.birthDate = e.valueOf();
        this.setState({
            pets: [pet]
        });
    };

    setPetExotic = (e) => {
        let pet = this.state.pets[0];
        pet.isExotic = e.target.checked;
        this.setState({
            pets: [pet]
        });
    };

    setPetSizeId = (e) => {
        let pet = this.state.pets[0];
        pet.petSizeId = e.target.value;
        this.setState({
            pets: [pet]
        });
    };

    setFile = (e) => {
        this.setState({ files: e.target.files });
    };

    insertRegistrationData = () => {
        const data = {
            userId: this.props.userId,
            city: this.state.city,
            aboutInfo: this.state.aboutInfo,
            phoneNumber: this.state.phoneNumber,
            pets: this.state.pets
        };

        axios.post('http://localhost:8080/petvacay/api/v1/registration/customer',
            data,
            { withCredentials: true })
            .then(((response) => {
                this.setState({
                    status: response.status
                });
            }))
            .then((response) => {
                axios.get(`http://localhost:8080/petvacay/api/v1/user/${this.props.userId}/gallery`,
                    { withCredentials: true }).then((response) => {
                    this.setState({ galleryId: response.data });
                }).then((response) => {
                    const fileData = new FormData();
                    Array.from(this.state.files).forEach((file, i) => {
                        console.log(file);
                        fileData.append('files', file);
                    });
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    };
                    console.log(fileData);
                    axios.post(
                        `http://localhost:8080/petvacay/api/v1/gallery/${this.state.galleryId}/`,
                        fileData,
                      //  config,
                        { withCredentials: true }
                    ).then((response) => {
                        this.setState(
                            {
                                status: response.status,
                            },
                        );
                    }).then((response)=> {window.location.replace('http://localhost:3000');});
                });
            });

    };

    render() {
        return (

            <div align="center">
                <br/>
                <h2>Додайте інформацію про себе та свого улюбленця</h2>
                <br/>
                <div className="col-5 ">
                    <Form.Group>
                        <Form.Control size="lg" type="text" onChange={this.setCity} placeholder="Місто" />
                        <br/>
                        <Form.Control size="lg" type="text" onChange={this.setPhoneNumber} placeholder="Номер телефону" />
                        <br/>
                        <Form.Control size="lg" as="textarea" rows={3} onChange={this.setAboutInfo} placeholder="Інформація про себе" />
                    </Form.Group>
                    <Accordion >
                        <Card>
                            <Accordion.Toggle align="left" as={Card.Header} eventKey="0">
                                Улюбленець
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body align="left" >
                                    <Form.Group>
                                        <Form.Control size="lg" type="text" onChange={this.setPetType} placeholder="Тип тварини" />
                                        <br/>
                                        <Form.Control size="lg" type="text" onChange={this.setPetName} placeholder="Ім'я" />
                                        <br/>
                                        <Form.Check onChange={this.setPetPedigreed} label="Породистий"/>
                                        <br/>
                                        {this.state.pets[0].isPedigreed && <div><Form.Control size="lg" type="text" onChange={this.setPetBreed} placeholder="Порода" /><br/></div>}
                                        <Form.Group>
                                            <Form.Label>Розмір тварини</Form.Label>
                                            <Form.Control size="lg" onChange={this.setPetSizeId} as="select">
                                                <option value="1">Мала</option>
                                                <option value="2">Середня</option>
                                                <option value="3">Велика</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Label>Приблизна дата народження тварини</Form.Label>
                                        <br/>
                                        <DatePicker size="lg" id="example-datepicker" dateFormat="dd-MM-yyyy" selected={moment(this.state.pets[0].birthDate).toDate()} onChange={this.setPetBirthDate} />
                                        <br/>
                                        <br/>
                                        <Form.Check onChange={this.setPetNeedWalking} label="Необхідні прогулянки"/>
                                        <br/>
                                        <Form.Check onChange={this.setPetNeedSpecialCare} label="Потрібен спеціальний догляд"/>
                                        <br/>
                                        <Form.Check onChange={this.setPetExotic} label="Екзотична тварина"/>
                                    </Form.Group>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <br/>
                    <label
                        htmlFor="file-upload"
                        style={{
                            border: '1px solid #ccc',
                            width: '200px',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                            padding: '6px 30px',
                            cursor: 'pointer',
                        }}
                    >
                        Загрузити файли
                    </label>
                    <input align="left"
                        type="file"
                        id="file-upload"
                        style={{ display: 'none', margin: '10px 0px 60px 60px' }}
                        multiple
                        onChange={this.setFile}
                    />
                    <div>
                        {Array.from(this.state.files).map(file => (
                            <ul>
                                <li>{file.name}</li>
                            </ul>
                        ))}

                    </div>
                    <br/>
                    <Button
                        variant="outline-danger"
                        onClick={this.insertRegistrationData}
                        size="lg"
                    >
                        Зберегти
                    </Button>
                </div>

            </div>

        );
    }
}