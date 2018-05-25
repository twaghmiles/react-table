import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, ButtonGroup, Media } from 'reactstrap';

class NotificationListItem extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            successMessage: null,
            errorMessage: null
        }
    }

    truncateText(text, truncateLength) {
        if (text.length > truncateLength) {
            return `${text.substring(0, truncateLength)}...`;
        }
        return text;
    }

    handleAction = (func, item) => {
        const resp = func(item);
        if (resp.isSuccess) {
            this.setState({ successMessage: resp.message });
            setTimeout(() => this.setState({ successMessage: null }), 3000);
        } else {
            this.setState({ errorMessage: resp.message });
            setTimeout(() => this.setState({ errorMessage: null }), 3000);
        }
    }

    renderActions(item) {
        if (item.type && item.type.actions) {
            return (
                <div>
                    {
                        item.type.actions.map(action => {
                            return <Button key={action.icon} color={action.color} onClick={() => this.handleAction(action.func, item)}><i className={action.icon}></i> {action.name}</Button>
                        })
                    }
                </div>    
            )
        }
        return <div></div>
    }

    renderListItem(item, priorityClasses) {
        return (
            <div>
                <div className="header">

                    <span className="from">
                        {priorityClasses &&
                            <h6>
                                <Badge color={priorityClasses.get(item.priority.name)}>{item.priority.name}</Badge>
                                <span className="title"> {item.title}</span>
                            </h6>}
                            {item.alert && <Alert color={item.alert.color}>{item.alert.text}</Alert>}
                    </span>
                    <span className="date"><span className="fa fa-paper-clip"></span> {item.date.toString()}</span>

                </div>

                <div className="description">
                    <h6>{item.category}</h6>
                    <Media>
                        {item.sender && item.sender.avatarUrl &&
                            <Media>
                                <Media object src={item.sender.avatarUrl} alt="Client avatar" style={{ height: '3rem' }} />
                            </Media>
                        }
                        <Media body>

                            <div className="title" style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>
                                {item.sender && item.sender && <span className="title"> {item.sender.firstName} {item.sender.lastName}</span>}
                            </div>
                            <p style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>{item.text}</p>

                        </Media>
                    </Media>
                </div>
            </div>

        );
    }

    render() {
        const { successMessage, errorMessage} = this.state;
        const { item, priorityClasses } = this.props;
        return (
            <li className={!item.isRead ? "message unread" : "message"} style={{ cursor: 'default' }}>
                {item.url &&
                    <Link to={item.url}>
                        {this.renderListItem(item, priorityClasses)}
                    </Link>
                }
                {!item.url && this.renderListItem(item, priorityClasses)}
                <ButtonGroup size="sm" style={{ padding: '0.2rem 0' }}>
                    {this.renderActions(item)}
                </ButtonGroup>
                {successMessage && <p className="text-success description animated fadeIn">{successMessage}</p>}
                {errorMessage && <p className="text-danger description animated fadeIn">{errorMessage}</p>}
            </li>)
    }
}

NotificationListItem.propTypes = {
    item: propTypes.object.isRequired,
    priorityClasses: propTypes.instanceOf(Map).isRequired
}

export default NotificationListItem;
