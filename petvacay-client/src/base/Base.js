import React from 'react';
import {Performers} from "../performer/Performers";

export class Base extends React.Component {

    render() {
        return (
          <div>
              <Performers/>
          </div>
        );
    }
}