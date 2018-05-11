import React, { PureComponent } from 'react';
import { Badge, Card, CardHeader, CardBody, CardTitle, CardText, Media } from 'reactstrap';

class ItemDetail extends PureComponent {
    render() {
        const { item } = this.props;

        return (
            <Card>
                <CardHeader>
                    <h5>
                        <Badge color={this.props.priorityClasses.get(item.priority.name)}>{item.priority.name}</Badge>
                        {item.title}
                        <span className="float-right">{item.date}</span>
                    </h5>
                </CardHeader>
                <CardBody>
                    <Media>
                        {item.sender && item.sender.avatarUrl &&
                            <Media left href="#">
                                <Media object src={item.sender.avatarUrl} alt="Client avatar" style={{ height: '3rem' }} />
                            </Media>}
                        <Media body style={item.sender && item.sender && { margin: '0 0.5rem' }}>
                            <div className="title">
                                {item.sender && item.sender && <span className="title"> {item.sender.firstName} {item.sender.lastName}</span>}
                            </div>
                            <p>{item.body}</p>

                        </Media>
                    </Media>
                </CardBody>
            </Card>
        );
    }
}

export default ItemDetail;