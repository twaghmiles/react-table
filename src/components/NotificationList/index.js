import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Alert, Button, ButtonGroup, ButtonDropdown, Card, CardHeader, CardBody, CardTitle, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import NotificationListItem from './NotificationListItem';

class NotificationList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'date',
      sortDesc: false,
      filteredItems: this.props.items,
      isSortingDropdownOpen: false,
      isFilteringDropdownOpen: false,
      successMessage: null,
      errorMessage: null
    }
  }

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

  toggle = (key) => {
    const isDropdownOpen = this.state[key];
    this.setState({
      [key]: !isDropdownOpen
    });
  }

  handleAction = (func) => {
    const resp = func();
    if (resp.isSuccess) {
      this.setState({ successMessage: resp.message });
      setTimeout(() => this.setState({ successMessage: null }), 3000);
    } else {
      this.setState({ errorMessage: resp.message });
      setTimeout(() => this.setState({ errorMessage: null }), 3000);
    }
  }

  handleSort = (fieldName) => {
    const { sortDesc } = this.state;
    this.setState({ sortBy: fieldName, sortDesc: !sortDesc });
  }

  handleFilter = (predicateFunc) => {
    const { items } = this.props;
    this.setState({ filteredItems: items.filter(predicateFunc) });
  }

  handleClick(func, obj, prm) {
    return func(obj[prm]);
  }

  renderActions(actions) {
    if (actions) {
      return (
        <div>
          {
            actions.map(action => {
              return <Button key={action.id} color={action.color} onClick={() => this.handleAction(action.func)}><i className={action.icon}></i> {action.name}</Button>
            })
          }
        </div>
      )
    }
  }

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

  renderTableItems() {
    const { sortableFields } = this.props;
    const { filteredItems, sortBy } = this.state;
    const sortableProperty = sortableFields.find(f => f.title === sortBy);

    return (
      <ul className="messages">
        {
          filteredItems
            .sort((a, b) => this.compare(b, a, sortBy, sortableProperty ? sortableProperty.sortByProp : null))
            .map(item => {
              return (
                <NotificationListItem
                  item={Object.assign({}, item)}
                  priorityClasses={this.props.priorityClasses}
                  handleMarkAsArchived={this.props.handleMarkAsArchived}
                  handleMarkAsRead={this.props.handleMarkAsRead}
                  key={item.id} />
              )
            })
        }
      </ul>
    )
  }

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
            {this.renderButtonDropdown('isFilteringDropdownOpen', filters, this.handleFilter, 'predicateFunc', 'Filter by')}
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
  priorityClasses: propTypes.instanceOf(Map).isRequired,
  handleMarkAsArchived: propTypes.func,
  handleMarkAllItemsAsArchived: propTypes.func,
  handleMarkAsRead: propTypes.func,
  handleMarkAllItemsAsRead: propTypes.func
}

export default NotificationList;