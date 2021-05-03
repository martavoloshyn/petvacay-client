import React from 'react';
import {PerformerItem} from "./PerformerItem";
import CardDeck from 'react-bootstrap/CardDeck';

export class PerformersList extends React.Component {

    render() {
        return (
            <div>
                <CardDeck className="d-flex justify-content-around">
                    {this.props.performers.map(element => (
                        <PerformerItem
                            key={element.userId}
                            id={element.userId}
                            name={element.firstName}
                            categories={element.categories}
                            city={element.city}
                            pricePerDay={element.pricePerDay}
                        />
                    ))}
                </CardDeck>
            </div>
        )
    }


}