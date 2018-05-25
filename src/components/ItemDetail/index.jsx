import React from 'react';
import { Card, CardBody } from 'reactstrap';
// import { Badge, Card, CardHeader, CardBody, Media } from 'reactstrap';

const ItemDetail = ({ item, priorityClasses }) => {
    return (
        <Card>

            {/* <CardHeader>
                <h5>
                    <Badge color={priorityClasses.get(item.priority.name)}>{item.priority.name}</Badge>
                    {item.title}
                    <span className="float-right">{item.date}</span>
                </h5>
            </CardHeader> */}
            <CardBody>
                <img src="https://peopledotcom.files.wordpress.com/2017/02/polar-bear-6.jpg" alt="ice bear" width="500" />
                {/* <Media>
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
                </Media> */}
            </CardBody>
        </Card>
    );
}

export default ItemDetail;