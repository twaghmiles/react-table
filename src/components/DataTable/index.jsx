import React, { PureComponent } from 'react';
import { Button, ButtonGroup, ButtonDropdown, Card, CardHeader, CardBody, CardTitle, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import DataTableItem from '../DataTableItem';

class DataTable extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'date',
      sortDesc: false,
      checkedItems: [],
      dropdownOpen: false
    }

    this.onChecked = this.onChecked.bind(this);
    this.handleMarkAllItemsAsRead = this.handleMarkAllItemsAsRead.bind(this);
    this.handleMarkAllItemsAsArchived = this.handleMarkAllItemsAsArchived.bind(this);
    this.applyPropFun = this.applyPropFun.bind(this)
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

  applyPropFun() {
    const { checkedItems } = this.state;
    this.props.fun(this.props.items);
  }

  handleMarkAllItemsAsRead() {
    const { items } = this.props;
    this.props.handleMarkAllItemsAsRead(items);
  }

  handleMarkAllItemsAsArchived() {
    const { items } = this.props;
    this.props.handleMarkAllItemsAsArchived(items);
  }

  onChecked(item, e) {
    let { checkedItems } = this.state;
    const isChecked = !!checkedItems.find(f => f.id === item.id);
    if (e.target.checked && !isChecked) {
      checkedItems = [...checkedItems, item];
    } else if (!e.target.checked) {
      checkedItems = checkedItems.filter(f => f.id !== item.id);
    }
    this.setState({ checkedItems });
  }

  onSort(prop) {
    const sortDesc = !this.state.sortDesc;
    this.setState({ sortBy: prop, sortDesc });
  }

  renderSortingButtons() {
    const { sortByProps } = this.props;
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Sort by
      </DropdownToggle>
        <DropdownMenu>
          {
            sortByProps.map(propName => {
              return <DropdownItem onClick={e => this.onSort(propName)} key={propName}>
                Sort by {propName}
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
                <DataTableItem
                  item={Object.assign({}, item)}
                  priorityClasses={this.props.priorityClasses}
                  onChecked={this.onChecked}
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
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
              {this.props.fun && <Button color="success" onClick={this.handleMarkAllItemsAsRead}><i className="fa fa-envelope-open-o"></i> Mark all as read</Button>}
              {this.props.fun && <Button color="success" onClick={this.handleMarkAllItemsAsArchived}><i className="fa fa-archive"></i> Mark all as archived</Button>}
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

export default DataTable;