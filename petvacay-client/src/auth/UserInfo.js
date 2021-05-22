import React from "react";
import jwt from 'jwt-decode';
import axios from "../utils/services";
import {CustomerRegistration} from "./CustomerRegistration";
import {PerformerRegistration} from "./PerformerRegistration";

export class UserInfo extends React.Component {
    cookiesToJson = () => Object.fromEntries(document.cookie.split(/; */).map((c) => {
        const [key, ...v] = c.split('=');
        return [key, decodeURIComponent(v.join('='))];
    }));

    state = {
        userId:(this.cookiesToJson().JWT && jwt(this.cookiesToJson().JWT).id),
        role:(this.cookiesToJson().JWT && jwt(this.cookiesToJson().JWT).roles)
    };

    isUserInfoFilled = () =>  {
        axios.get(`http://localhost:8080/petvacay/api/v1/user/${this.state.userId}` ,
            { withCredentials: true })
            .then((response) => {
                if(response.data.infoFilled){
                    window.location.replace('http://localhost:3000');
                }
            })
            .catch((err) => {
            });
    };

    componentWillMount() {
        this.isUserInfoFilled();
    }

    render() {
        return (
            <div>
                {this.state.role === "Customer" && <CustomerRegistration userId={this.state.userId}/>}
                {this.state.role === "Performer" && <PerformerRegistration userId={this.state.userId}/>}
            </div>
    )}
}