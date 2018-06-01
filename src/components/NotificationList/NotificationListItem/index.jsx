import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, ButtonGroup, Media } from 'reactstrap';

class NotificationListItem extends PureComponent {

    /**
     * @param {Object} props - Passed in props.
     * @member {string} state.fulltext - Component state.
     */
    constructor(props) {
        super(props);

        this.state = {
            showFullText: false,
            successMessage: null,
            errorMessage: null
        }
    }

    /**
     * Truncates text if it's longer that specified limit.
     * @param {string} text - Text to be truncated.
     * @param {string} truncateLength - The length starting from which the text will be truncated.
     * @return {string} Truncated text.
     */
    truncateText(text, truncateLength) {
        const { showFullText } = this.state;
        if (text.length > truncateLength && !showFullText) {
            return `${text.substring(0, truncateLength)}...`;
        }
        return text;
    }

    /**
     * Toggles showing full text if text has been truncated based on this.state.showFullText
     */
    expandText = () => {
        const { showFullText } = this.state;
        this.setState({ showFullText: !showFullText });
    }

    /**
     * Call's the action based in to onClick handle and passes in the action attached to item's type object. If the passed in object return an object with properties isSuccess and message then a success or error message can be displayed.
     * @param {Function} func - Function to be called on onClick.
     * @param {Object} item - Notification list item passed to the function.
     */
    handleAction = (func, item) => {
        const resp = func(item);
        if (resp && resp.isSuccess) {
            this.setState({ successMessage: resp && resp.message ? resp.message : 'Done!' });
            setTimeout(() => this.setState({ successMessage: null }), 3000);
        } else {
            this.setState({ errorMessage: resp && resp.message ? resp.message : 'Something went wrong...' });
            setTimeout(() => this.setState({ errorMessage: null }), 3000);
        }
    }

    /**
     * Renders the actions passed into item.type.actions array
     * @param {Object} item - Notification list item.
     * @return {Object} JSX code for action buttons with onClick event handlers.
     */
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
    }

    /**
     * Renders individual list items
     * @param {Object} item - Notification list item.
     * @param {Map} priorityClasses - A map of priority name's and associated reactstrap colorClasses.
     * @param {string} truncateTextLength - The length starting from which the text will be truncated.
     * @return {Object} JSX code for Notification list item.
     */
    renderListItem(item, priorityClasses, truncateTextLength) {
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
                    <span className="date"><span className="fa fa-paper-clip"></span><b> {item.date.displayDate}</b></span>

                </div>

                <div className="description">
                    <h6>{item.category ? item.category.name : ''}</h6>
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
                            <p style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>{item.text.length > truncateTextLength ? this.truncateText(item.text, truncateTextLength) : item.text}</p>

                        </Media>
                    </Media>
                </div>
            </div>

        );
    }

    /**
     * Components render fucntion
     * @return {Object} JSX code for Notification list item.
     */
    render() {
        const { successMessage, errorMessage, showFullText } = this.state;
        const { item, priorityClasses, truncateTextLength } = this.props;
        return (
            <li className={!item.isRead ? "message unread" : "message" && (item.category && item.category.cssClass ? item.category.cssClass : '')} style={{ cursor: 'default', padding: '0.3rem' }}>
                {item.url &&
                    <Link to={item.url}>
                        {this.renderListItem(item, priorityClasses, truncateTextLength)}
                    </Link>
                }
                {!item.url && this.renderListItem(item, priorityClasses, truncateTextLength)}
                {item.text.length > truncateTextLength &&
                    <div>
                        <Button color="link" size="sm" onClick={this.expandText}>{showFullText ? 'Less' : 'More'}</Button>
                    </div>
                }
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
