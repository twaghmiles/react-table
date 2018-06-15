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
            <div className="notification-item">
                <div className="notification-item-header">
                    <span className="notification-item-title">{item.title}</span>
                </div>
                <div className="notification-item-body">
                    <div className="notification-item-avtar-wrapper">
                        <img className="img-avatar" src={item.sender && item.sender.avatarUrl ? item.sender.avatarUrl : "https://cdn1.iconfinder.com/data/icons/rcons-user-action/512/user-512.png"} alt="admin@admin.com" />
                    </div>
                    <div className="notification-item-content-wrapper">
                        { item.category && <h6>{item.category.name}</h6>}
                        <div className="notification-item-description">
                            {item.text.length > truncateTextLength ? this.truncateText(item.text, truncateTextLength) : item.text}
                        </div>
                        <div className="notification-item-sender-name">
                            {item.sender && <span className="title"> {item.sender.firstName || ''} {item.sender.lastName || ''}</span>}
                            <span className="notification-item-date">{item.date.displayDate}</span>
                        </div>
                    </div>
                </div>
                <div className="notification-item-footer">
                    {item.url ? <Link to={item.url}>More Info</Link> : <span></span>}
                    <div className="notification-item-action-wrapper">
                        {item.type && item.type.actions && item.type.actions.map((action, i) => {
                            return <span className={`notification-item-action notification-item-action-${action.color}`}>{action.name}</span>
                        })}
                    </div>
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
            <li className={`notification-item-wrapper notification-item-${priorityClasses.get(item.priority.name)} ${!item.isRead ? "unread" : ""}`}>
                {this.renderListItem(item, priorityClasses, truncateTextLength)}
            </li>
        )
    }
}

NotificationListItem.propTypes = {
    item: propTypes.object.isRequired,
    priorityClasses: propTypes.instanceOf(Map).isRequired
}

export default NotificationListItem;
