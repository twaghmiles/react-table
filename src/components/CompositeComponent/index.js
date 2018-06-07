import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Alert, Badge, Button, ButtonGroup, ButtonDropdown, Card, CardHeader, CardBody, CardTitle, CardText, DropdownItem, DropdownMenu, DropdownToggle, Media } from 'reactstrap';

export class NotificationList extends PureComponent {

    constructor(props) {
        super(props);

        const { defaultSortBy, items } = this.props;

        this.state = {
            sortBy: defaultSortBy || 'date',
            sortDesc: false,
            filteredItems: items,
            isSortingDropdownOpen: false,
            isFilteringDropdownOpen: false,
            successMessage: null,
            errorMessage: null
        }
    }

    /**
     * Compares 2 objects based on their property values .
     * @param {Object} a - Object to be compared.
     * @param {Object} b - Notification list item passed to the function.
     * @param {any} propIn1 - Property of the passed in objects a and b.
     * @param {any} propIn2 - Property of propIn1 of the passed in objects a and b.
     * @return {number} Comparison result.
     */
    compare(a, b, propIn1, propIn2) {
        let prop1 = null;
        let prop2 = null;
        if (this.state.sortDesc) {
            prop1 = !!propIn2 ? b[propIn1][propIn2] : b[propIn1];
            prop2 = !!propIn2 ? a[propIn1][propIn2] : a[propIn1];
        } else {
            prop1 = !!propIn2 ? a[propIn1][propIn2] : a[propIn1];
            prop2 = !!propIn2 ? b[propIn1][propIn2] : b[propIn1];
        }

        let comparison = 0;
        if (prop1 > prop2) {
            comparison = 1;
        } else if (prop1 < prop2) {
            comparison = -1;
        }
        return comparison;
    }

    /**
     * Toggles dropdown visibility
     * @param {string} key - A key in the state object based on which to toggle visibility
     */
    toggle = (key) => {
        const isDropdownOpen = this.state[key];
        this.setState({
            [key]: !isDropdownOpen
        });
    }


    /**
     * Call's the passed in function with item as it's parameter . If the passed in object return an object with properties isSuccess and message then a success or error message can be displayed.
     * @param {Function} func - Function to be called on onClick.
     * @param {Object} item - Notification list item passed to the function.
     */
    handleAction = (func) => {
        const resp = func();
        if (resp && resp.isSuccess) {
            this.setState({ successMessage: resp && resp.message ? resp.message : 'Done!' });
            setTimeout(() => this.setState({ successMessage: null }), 3000);
        } else {
            this.setState({ errorMessage: resp && resp.message ? resp.message : 'Something went wrong...' });
            setTimeout(() => this.setState({ errorMessage: null }), 3000);
        }
    }

    /**
     * Sets the sort by property and toggles asc/desc sorting
     * @param {string} fieldName - Functions based into filter iterator.
     */
    handleSort = (fieldName) => {
        const { sortDesc } = this.state;
        this.setState({ sortBy: fieldName, sortDesc: !sortDesc });
    }

    /**
     * Filters notification list items based on a predicate function
     * @param {Function} predicateFunc - Functions based into filter iterator.
     */
    handleFilter = (predicateFunc) => {
        const { items } = this.props;
        this.setState({ filteredItems: items.filter(predicateFunc) });
    }

    /**
     * Call's the passed in function with passed in object's passed in property
     * @param {Function} func - Function to be called.
     * @param {Object} obj - Notification list item passed to the function.
     * @param {any} prm - Notification list item passed to the function.
     * @return {any} Value retrieved by calling the function.
     */
    handleClick(func, obj, prm) {
        return func(obj[prm]);
    }

    /**
     * Renders the actions passed into the function.
     * @param {Array} actions - Actions with correspoding functions to rendered with event handlers.
     * @return {Object} JSX code for action buttons with onClick event handlers.
     */
    renderActions(actions) {
        if (actions) {
            return (
                <div>
                    {
                        actions.map(action => {
                            return <Button
                                key={action.icon} color={action.color} onClick={() => this.handleAction(action.func)}><i className={action.icon}></i> {action.name}</Button>
                        })
                    }
                </div>
            )
        }
    }

    /**
     * Renders button dropdowns with corresponding action and label names.
     * @param {boolean} isOpenKey - Indicates if dropdown is open or not
     * @param {arr} arr - An array of dropdown values.
     * @param {Function} action - A function to be called on each dropdown item.
     * @param {any} actionPrm - A parameter to passed into the function call.
     * @param {string} actionName - Text to be displayed on dropdown group.
     * @return {Object} JSX code for action buttons with onClick event handlers.
     */
    renderButtonDropdown(isOpenKey, arr, action, actionPrm, actionName) {
        const isDropdownOpen = this.state[isOpenKey];
        return (
            <ButtonDropdown isOpen={isDropdownOpen} toggle={() => this.toggle(isOpenKey)}>
                <DropdownToggle caret>
                    {actionName}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        arr.map(e => {
                            return <DropdownItem onClick={() => this.handleClick(action, e, actionPrm)} key={e.title}>
                                {actionName} {e.title}
                            </DropdownItem >
                        })
                    }
                </DropdownMenu>
            </ButtonDropdown>
        )
    }

    /**
     * Renders notification list items inside notification list
     * @return {Object} JSX code for Notification list.
     */
    renderTableItems() {
        const { sortableFields, emptyPage, priorityClasses, truncateTextLength } = this.props;
        const { filteredItems, sortBy } = this.state;
        const sortableProperty = sortableFields.find(f => f.title === sortBy);
        if (filteredItems && filteredItems.length > 0) {
            return (
                <ul className="messages">
                    {
                        filteredItems
                            .sort((a, b) => this.compare(b, a, sortBy, sortableProperty ? sortableProperty.sortByProp : null))
                            .map(item => {
                                return (
                                    <NotificationListItem
                                        item={Object.assign({}, item)}
                                        priorityClasses={priorityClasses}
                                        truncateTextLength={truncateTextLength}
                                        key={item.id} />
                                )
                            })
                    }
                </ul>
            )
        } else {
            return (
                <div>
                    {emptyPage}
                </div>
            );
        }

    }

    /**
     * Components render fucntion
     * @return {Object} JSX code for Notification list.
     */
    render() {
        const { successMessage, errorMessage } = this.state;
        const { icon, title, actions, sortableFields, filters } = this.props;
        return (
            <Card>
                <CardHeader>
                    {icon && <i className={icon}></i>} {title}
                </CardHeader>
                <CardBody>
                    <CardTitle>
                        {this.renderButtonDropdown('isSortingDropdownOpen', sortableFields, this.handleSort, 'title', 'Sort by')}
                        {this.renderButtonDropdown('isFilteringDropdownOpen', filters, this.handleFilter, 'predicateFunc', 'Show')}
                        <ButtonGroup>
                            {this.renderActions(actions)}
                        </ButtonGroup>
                    </CardTitle>
                    {successMessage &&
                        <Alert color="success animated fadeIn">
                            {successMessage}
                        </Alert>
                    }
                    {errorMessage &&
                        <Alert color="danger animated fadeIn">
                            {errorMessage}
                        </Alert>
                    }
                    <div className="animated fadeIn">
                        <div className="email-app mb-4" style={{ border: 'none' }}>
                            <main className="inbox">
                                {this.renderTableItems()}
                            </main>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

NotificationList.propTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.string,
    items: propTypes.array.isRequired,
    priorityClasses: propTypes.instanceOf(Map),
    sortableFields: propTypes.array,
    actions: propTypes.array,
    filters: propTypes.array
}

export class NotificationListItem extends PureComponent {

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
                <CardHeader style={{ padding: '0.3rem 0.7rem', borderBottom: 'none' }} className={!!item.category ? item.category.cssClass : ''}>
                    <div className="header" style={{ margin: '0' }}>
                        <span className="from">
                            {priorityClasses &&
                                <h6>
                                    <Badge color={priorityClasses.get(item.priority.name)}>{item.priority.name}</Badge>
                                    <span className="title"> {item.title}</span>
                                </h6>}
                            {item.alert && <Alert color={item.alert.color} style={{ padding: '0.2rem 0.3rem' }}>{item.alert.text}</Alert>}

                        </span>
                    </div>
                </CardHeader>
                <CardBody style={{ padding: '0.5rem' }}>
                    <CardText>
                        <h6>{item.category ? item.category.name : ''}</h6>
                        <Media>
                            {item.sender && item.sender.avatarUrl &&
                                <Media>
                                    <Media object src={item.sender.avatarUrl} alt="Client avatar" className="img-avatar" style={{ height: '3.5rem' }} />
                                </Media>
                            }
                            <Media body>

                                <div className="title" style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>
                                    {item.sender && item.sender && <span className="title"> {item.sender.firstName} {item.sender.lastName}</span>}
                                    <span className="description date" style={{ float: 'right' }}><span className="fa fa-paper-clip"></span>{item.date.displayDate}</span>
                                </div>
                                <p style={item.sender && item.sender.avatarUrl && { margin: '0 0.5rem' }}>{item.text.length > truncateTextLength ? this.truncateText(item.text, truncateTextLength) : item.text}</p>

                            </Media>
                        </Media>
                    </CardText>
                </CardBody>
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
            <li className={(item.category && item.category.cssClass ? item.category.cssClass : 'x') && (item.isRead ? "message unread" : "message")}
                style={{ cursor: 'default', padding: '0', marginBottom: '0.2rem', border: 'none' }}>
                <Card style={{border: 'none'} && item.isRead ? {backgroundColor: '#f0f3f5'} : {}}>
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
                    <ButtonGroup size="sm" style={{ padding: '0.4rem' }}>
                        {this.renderActions(item)}
                    </ButtonGroup>
                    {successMessage && <p className="text-success description animated fadeIn">{successMessage}</p>}
                    {errorMessage && <p className="text-danger description animated fadeIn">{errorMessage}</p>}
                </Card>


            </li>)
    }
}

NotificationListItem.propTypes = {
    item: propTypes.object.isRequired,
    priorityClasses: propTypes.instanceOf(Map).isRequired,
    truncateTextLength: propTypes.number.isRequired
}

export class NotificationListItemPreview extends PureComponent {

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
     * Call's the passed in function with item as it's parameter . If the passed in object return an object with properties isSuccess and message then a success or error message can be displayed.
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
                            return <Button key={action.icon} color={action.color} onClick={() => this.handleAction(action.func, item)} style={{ padding: '0.1rem' }}><i className={action.icon}></i> {action.name}</Button>
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
                <DropdownItem href="#" style={{ border: 'none' }}>
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

