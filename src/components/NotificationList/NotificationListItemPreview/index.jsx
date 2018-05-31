import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Button, ButtonGroup, DropdownItem } from 'reactstrap';

class NotificationListItemPreview extends PureComponent {

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
                            return <Button key={action.icon} color={action.color} onClick={() => this.handleAction(action.func, item)} style={{padding: '0.1rem'}}><i className={action.icon}></i> {action.name}</Button>
                        })
                    }
                </div>
            )
        }
    }

    /**
     * Components render fucntion
     * @return {Object} JSX code for Notification list item.
     */
    render() {
        const { successMessage, errorMessage } = this.state;
        const { item, truncateTextLength } = this.props;
        return (
            <div className="message" style={{ borderBottom: '1px solid #c2cfd6' }}>
                <DropdownItem href="#" style={{border: 'none'}}>
                    <div>
                        <div>
                            <small className="text-muted">{item.sender.firstName} {item.sender.lastName}</small>
                            <small className="text-muted float-right mt-1">{item.date.displayDate}</small>
                        </div>
                        <div className="text-truncate font-weight-bold">
                            <span className={item.type.icon} /> {item.title}
                        </div>
                        <div className="small text-muted text-truncate">
                            {item.text.length > truncateTextLength ? this.truncateText(item.text, truncateTextLength) : item.text}
                        </div>
                    </div>

                    {successMessage && <p className="text-success description animated fadeIn">{successMessage}</p>}
                    {errorMessage && <p className="text-danger description animated fadeIn">{errorMessage}</p>}
                </DropdownItem>
                <ButtonGroup size="sm" style={{ padding: '0.1rem 0.5rem' }} className="message">
                    {this.renderActions(item)}
                </ButtonGroup>

            </div>
        );
    }
}

NotificationListItemPreview.propTypes = {
    item: propTypes.object.isRequired,
    truncateTextLength: propTypes.number.isRequired
}

export default NotificationListItemPreview;
