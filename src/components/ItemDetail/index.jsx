import React, { Component } from 'react';
import { Badge, Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap';

class ItemDetail extends Component {
    render() {
        const { item } = this.props;

        return (
            <Card>
                <CardHeader>
                    <h4><Badge color={this.props.priorityClasses.get(item.priority)}>{item.priority}  {item.date}</Badge></h4>
                </CardHeader>
                <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    <CardText>{item.body}</CardText>
                </CardBody>
            </Card>
        );
    }
}

export default ItemDetail;