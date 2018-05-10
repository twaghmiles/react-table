import React, { Component } from 'react';
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import DataTableItem from '../DataTableItem';

class DataTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'priority',
      sortDesc: false,
      checkedItems: []
    }

    this.onChecked = this.onChecked.bind(this);
  }

  compare(a, b, prop) {
    let prop1 = null;
    let prop2 = null;
    if (this.state.sortDesc) {
      prop1 = b[prop].toLowerCase();
      prop2 = a[prop].toLowerCase();
    } else {
      prop1 = a[prop].toLowerCase();
      prop2 = b[prop].toLowerCase();
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
    this.props.fun(checkedItems);
  }

  onChecked(item, e) {
    let checkedItems = this.state.checkedItems;
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

  renderTableItems() {
    const { items } = this.props;

    return (
      <ul className="messages">
        {
          items
            .sort((a, b) => this.compare(b, a, this.state.sortBy))
            .map(item => {
              return (
                <DataTableItem
                  item={item}
                  priorityClasses={this.props.priorityClasses}
                  onChecked={this.onChecked}
                  key={item.id} />
              )
            })
        }
      </ul>
    )
  }

  render() {
    return (
      <Card>
        <CardHeader>
          { this.props.icon && <i className={this.props.icon}></i> } {this.props.title}
        </CardHeader>
        <CardBody>
          <CardTitle>
          <ButtonGroup>
            { this.props.sortByProps && this.props.sortByProps.includes('priority') 
              && <Button color="light" active={this.state.sortBy === 'priority'} onClick={e => this.onSort('priority')}>
                  Sort by severity
                  </Button> 
            }
            { this.props.sortByProps && this.props.sortByProps.includes('date') 
              && <Button color="light" active={this.state.sortBy === 'date'} onClick={e => this.onSort('date')}>
                  Sort by date
                  </Button> 
            }
            { this.props.sortByProps && this.props.sortByProps.includes('title') 
              && <Button color="light" active={this.state.sortBy === 'title'} onClick={e => this.onSort('title')}>
                  Sort by title
                  </Button> 
            }
            { this.props.fun && <Button color="success" onClick={() => this.applyPropFun()}>Apply function</Button>}            
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