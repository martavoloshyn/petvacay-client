import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../utils/services';

export class ActivationUser extends React.Component {
    state = {
        status: undefined,
        errorMessage: undefined,
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.put(`http://localhost:8080/petvacay/api/v1/registration/activation?activationCode=${this.props.match.params.activationCode}`,
            { withCredentials: true })
            .then((response) => {
                this.setState({ status: response.status });
            })
            .catch((err) => {
                this.setState({ errorMessage: err.data.message });
            });
    };

    render() {
        return (

            <div>
                <div>
                    {this.state.errorMessage
                        && (
                            <div className="alert alert-danger" role="alert">
                                Код активації не зареєстровано в системі
                            </div>
                        )
                    }
                </div>
                <div>{this.state.status === 200 && <Redirect to="/login" />}</div>
            </div>
        );
    }
}

export default ActivationUser;

