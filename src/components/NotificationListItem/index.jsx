import React, { PureComponent } from 'react';
import { Badge, Button, ButtonGroup, Media } from 'reactstrap';

class DataTableItem extends PureComponent {

    truncateText(text, truncateLength) {
        if (text.length > truncateLength) {
            return `${text.substring(0, truncateLength)}...`
        }
        return text;
    }

    render() {
        const { item } = this.props;
        return (
            <li className={!item.isRead ? "message unread" : "message" }>
                <div>
                    <div className="header">

                        <span className="from">
                            {this.props.priorityClasses &&
                                <h6>
                                    <Badge color={this.props.priorityClasses.get(item.priority.name)}>{item.priority.name}</Badge>
                                    <span className="title"> {item.title}</span>
                                </h6>}
                        </span>
                        <span className="date"><span className="fa fa-paper-clip"></span> {item.date}</span>
                    </div>

                    <div className="description">
                        <h6>{item.category}</h6>
                        <Media>
                            {item.sender && item.sender.avatarUrl &&
                                <Media left href="#">
                                    <Media object src={item.sender.avatarUrl} alt="Client avatar" style={{ height: '3rem' }} />
                                </Media>}
                            <Media body>

                                <div className="title"  style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>
                                    {item.sender && item.sender && <span className="title"> {item.sender.firstName} {item.sender.lastName}</span>}
                                </div>                               
                                <p style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>{this.truncateText(item.body, 250)}</p>

                            </Media>
                        </Media>

                        <ButtonGroup size="sm">
                            <Button color="light" onClick={() => this.props.handleMarkAsRead(item)}><i className="fa fa-envelope-open-o"></i></Button>
                            <Button color="light" onClick={() => this.props.handleMarkAsArchived(item)}><i className="fa fa-archive"></i></Button>
                            <Button color="link"><a href={item.url}>{item.url}</a></Button>
                        </ButtonGroup>
                    </div>
                </div>
            </li>)
    }
}

export default DataTableItem;
