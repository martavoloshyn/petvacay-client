import React from "react";
import axios from "../utils/services";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Button } from 'react-bootstrap';

export class PerformerRegistration extends React.Component {

    getAllCategories = () => {
        axios.get('http://localhost:8080/petvacay/api/v1/category/all',
            { withCredentials: true })
            .then((response) => {
                this.setState({
                    allCategories: response.data
                });
            })
            .catch((err) => {
                //const errors = err.data.message;
                // const
                this.setState({status: err.status});
            });
    };

    state = {
        status: undefined,
        city: undefined,
        aboutInfo: undefined,
        phoneNumber: undefined,
        birthDate : moment.now().valueOf(),
        cardNumber: undefined,
        street: undefined,
        building: undefined,
        apartment: undefined,
        allCategories: [],
        categories: [],
        files: []
    };

    componentDidMount() {
        axios.get('http://localhost:8080/petvacay/api/v1/category/all',
            { withCredentials: true })
            .then((response) => {
                this.setState({
                    allCategories: response.data
                },() => {
                });
            })
            .catch((err) => {
                //const errors = err.data.message;
                // const
                this.setState({status: err.status});
            });
    }

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

    setFile = (e) => {
        this.setState({ files: e.target.files });
    };

    setPhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        });
    };

    setBirthDate = (e) => {
        this.setState({
            birthDate: e.valueOf()
        });
    };

    setCardNumber = (e) => {
        this.setState({
            cardNumber: e.target.value
        });
    };

    setStreet = (e) => {
        this.setState({
            street: e.target.value
        });
    };

    setBuilding = (e) => {
        this.setState({
            building: e.target.value
        });
    };

    setApartment = (e) => {
        this.setState({
            apartment: e.target.value
        });
    };

    setCategories = (e) => {
        this.setState({
            categories: [].slice.call(e.target.selectedOptions).map(item => ({categoryId: item.id, categoryName:item.value}))
        });
    };

    insertRegistrationData = () => {
        const data = {
            userId: this.props.userId,
            city: this.state.city,
            aboutInfo: this.state.aboutInfo,
            phoneNumber: this.state.phoneNumber,
            birthDate : this.state.birthDate,
            cardNumber: this.state.cardNumber,
            street: this.state.street,
            building: this.state.building,
            apartment: this.state.apartment,
            categories: this.state.categories/*.map(option=>({categoryId:option.key,categoryName:option.innerText}))*/
        };

        axios.post('http://localhost:8080/petvacay/api/v1/registration/performer',
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

        // axios.post('http://localhost:8080/petvacay/api/v1/registration/performer',
        //     data,
        //     { withCredentials: true })
        //     .then((response) => {
        //         this.setState({
        //             status: response.status
        //         });
        //     })
        //     .catch((err) => {
        //         //const errors = err.data.message;
        //         // const
        //     });
        // window.location.replace('http://localhost:3000');
    };

    render() {
        const categories = this.state.allCategories;
        return (

            <div align="center">
                <br/>
                <h2>Додайте інформацію про себе</h2>
                <br/>
                <div className="col-5 ">
                    <Form.Group>
                        <Form.Control size="lg" type="text" onChange={this.setCity} placeholder="Місто" />
                        <br/>
                        <Form.Control size="lg" type="text" onChange={this.setPhoneNumber} placeholder="Номер телефону" />
                        <br/>
                        <Form.Control size="lg" as="textarea" rows={3} onChange={this.setAboutInfo} placeholder="Інформація про себе" />
                        <br/>
                        <div align="left"><Form.Label>Дата народження</Form.Label>
                        <br/>
                        <DatePicker align="left" size="lg" id="example-datepicker" dateFormat="dd-MM-yyyy" selected={moment(this.state.birthDate).toDate()} onChange={this.setBirthDate} />
                        </div>
                        <br/>
                        <Form.Control size="lg" type="text" onChange={this.setCardNumber} placeholder="Номер банківської карти" />
                        <br/>
                        <Form.Control size="lg" type="text" onChange={this.setStreet} placeholder="Вулиця" />
                        <br/>
                        <Form.Control size="lg" type="text" onChange={this.setBuilding} placeholder="Будинок" />
                        <br/>
                        <Form.Control size="lg" type="text" onChange={this.setApartment} placeholder="Квартира" />
                        <br/>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <div align="left"><Form.Label>Категорії</Form.Label></div>
                            <Form.Control as="select" multiple onChange={this.setCategories}>
                                {this.state.allCategories.map(category => (
                                    <option id={category.categoryId}>{category.categoryName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Group>
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