import React, { PureComponent, PropTypes } from 'react';
import { Button, ButtonGroup, ButtonDropdown, Card, CardHeader, CardBody, CardTitle, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import NotificationListItem from '../NotificationListItem';

class NotificationList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'date',
      sortDesc: false,
      dropdownOpen: false
    }

    this.handleMarkAllItemsAsRead = this.handleMarkAllItemsAsRead.bind(this);
    this.handleMarkAllItemsAsArchived = this.handleMarkAllItemsAsArchived.bind(this);
    this.toggle = this.toggle.bind(this);
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

  handleMarkAllItemsAsRead() {
    const { items } = this.props;
    this.props.handleMarkAllItemsAsRead(items);
  }

  handleMarkAllItemsAsArchived() {
    const { items } = this.props;
    this.props.handleMarkAllItemsAsArchived(items);
  }

  onSort(prop) {
    const { sortDesc } = this.state;
    this.setState({ sortBy: prop, sortDesc: !sortDesc });
  }

  renderSortingButtons() {
    const { sortableFields } = this.props;
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Sort by
      </DropdownToggle>
        <DropdownMenu>
          {
            sortableFields.map(fieldName => {
              return <DropdownItem onClick={e => this.onSort(fieldName)} key={fieldName}>
                Sort by {fieldName}
              </DropdownItem >
            })
          }
        </DropdownMenu>
      </ButtonDropdown>
    )
  }

  renderTableItems() {
    const { items } = this.props;

    return (
      <ul className="messages">
        {
          items
            .sort((a, b) => this.compare(b, a, this.state.sortBy, this.state.sortBy === 'priority' ? 'value' : null))
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

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  render() {
    return (
      <Card>
        <CardHeader>
          {this.props.icon && <i className={this.props.icon}></i>} {this.props.title}
        </CardHeader>
        <CardBody>
          <CardTitle>
            {this.renderSortingButtons()}
            <ButtonGroup>
              {this.props.handleMarkAllItemsAsRead && <Button color="success" onClick={this.handleMarkAllItemsAsRead}><i className="fa fa-envelope-open-o"></i> Mark all as read</Button>}
              {this.props.handleMarkAllItemsAsArchived && <Button color="success" onClick={this.handleMarkAllItemsAsArchived}><i className="fa fa-archive"></i> Mark all as archived</Button>}
            </ButtonGroup>
          </CardTitle>

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

export default NotificationList;