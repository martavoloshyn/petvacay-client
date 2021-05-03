import React from 'react';
import axios from 'axios';
import {PerformersList} from "./PerformersList";

export class Performers extends React.Component {

    state = {
      performers: []
    };

    getData = () => {
        axios.get(`http://localhost:8080/petvacay/api/v1/performer/filter`,
            { withCredentials: true }).then((response) => {
            this.setState({ performers: response.data });
        });
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <PerformersList
                    performers={this.state.performers}
                />
            </div>
        )
    }
}