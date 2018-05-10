import React, { Component } from 'react';
import { Badge, Form, FormGroup, Label, Input } from 'reactstrap';

class DataTableItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: []
        }
    }

    truncateText(text, truncateLength) {
        if (text.length > truncateLength) {
            return `${text.substring(0, truncateLength)}...`
        }
        return text;
    }

    render() {
        const { item } = this.props;
        return (
            <li className="message unread">
                <a>
                    <div className="actions" style={{ margin: '0 0.5rem' }}>
                        <Form>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onClick={e => this.props.onChecked(item, e)} />{' '}
                                </Label>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="header">

                        <span className="from">
                            { this.props.priorityClasses && <h5><Badge color={this.props.priorityClasses.get(item.priority)}>{item.priority}</Badge></h5>}                            
                        </span>
                        <span className="date"><span className="fa fa-paper-clip"></span> {item.date}</span>
                    </div>
                    <div className="title">
                        {item.title}
                    </div>
                    <div className="description">
                        {this.truncateText(item.body, 250)}
                    </div>
                </a>
            </li>)
    }
}

export default DataTableItem;
