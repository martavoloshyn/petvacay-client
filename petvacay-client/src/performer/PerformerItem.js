import React from 'react';
import Card from "react-bootstrap/Card";

export class PerformerItem extends React.Component {

    render() {
        return (
            <div>
                <Card
                    border="primary"
                    className="text-center mx-auto"
                    style={{ width: '18rem', marginTop: '2rem' }}
                >
                    {/*<Card.Img*/}
                    {/*    variant="top"*/}
                    {/*    src={this.state.photoUrl}*/}
                    {/*/>*/}
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>

                        <Card.Text style={{ height: '3rem' }}>
                            Категорії:
                            {' '}
                            {this.props.categories.join(', ')}
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}