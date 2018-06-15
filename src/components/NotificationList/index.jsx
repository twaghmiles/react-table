import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import NotificationListItem from './NotificationListItem';
// import { NotificationListItem } from '../../CompisiteComponent'

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
    if (resp && resp.isSuccess) {
      this.setState({ successMessage: resp && resp.message ? resp.message : 'Done!' });
      setTimeout(() => this.setState({ successMessage: null }), 3000);
    } else {
      this.setState({ errorMessage: resp && resp.message ? resp.message : 'Something went wrong...' });
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
              return <Button
                key={action.icon} color={action.color} onClick={() => this.handleAction(action.func)}><i className={action.icon}></i> {action.name}</Button>
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
    const { sortableFields, emptyPage, priorityClasses, truncateTextLength } = this.props;
    const { filteredItems, sortBy } = this.state;
    const sortableProperty = sortableFields.find(f => f.title === sortBy);
    if (filteredItems && filteredItems.length > 0) {
      return (
        <ul className="notifications">
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

  render() {
    const { successMessage, errorMessage } = this.state;
    const { icon, title, actions, sortableFields, filters } = this.props;
    return (
      <div className="notification-list-wrapper">
        <div className="notification-list-filter-wrapper">
          {this.renderButtonDropdown('isSortingDropdownOpen', sortableFields, this.handleSort, 'title', 'Sort by')}
          {this.renderButtonDropdown('isFilteringDropdownOpen', filters, this.handleFilter, 'predicateFunc', 'Show')}
          <ButtonGroup>
            {this.renderActions(actions)}
          </ButtonGroup>
        </div>
        <div className="notification-list-container">
          {this.renderTableItems()}
        </div>
      </div>
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

export default NotificationList;