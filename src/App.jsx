import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import moment from 'moment';
import './index.css'

import NotificationList from './components/NotificationList';
// import { NotificationList } from './components/CompositeComponent';
// import { NotificationList } from 'notification-list';
// import { NotificationList } from '../dist';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Arrears',
            icon: 'fa fa-bank',
            items: [
                {
                    id: Math.floor(Math.random() * 1000000 + 1),
                    type: {
                        name: 'followUp',
                        icon: '',
                        actions: [
                            {
                                name: 'Approve',
                                icon: 'fa fa-envelope-open-o',
                                func: this.handleMarkAsRead,
                                color: 'success'
                            },
                            {
                                name: 'Reject',
                                icon: 'fa fa fa-archive',
                                func: this.handleMarkAsArchived,
                                color: 'danger'
                            },
                            {
                                name: 'PTP',
                                icon: 'fa fa-phone-square',
                                func: this.handlePhonecall,
                                color: 'warning'
                            }
                        ]
                    },
                    title: "B Check check check",
                    date: {
                        dateObj: new Date("2018-05-24 20:20"),
                        displayDate: moment("2018-05-24 20:20", "YYYY-MM-DD hh:mm").fromNow()
                    },
                    alert: {
                        text: 'Very late payment  + has suspicious face',
                        color: 'danger'
                    },
                    priority: {
                        name: "High",
                        value: 1
                    },
                    category: {
                        name: 'Important',
                        icon: 'fa fa-exclamation-triangle',
                        cssClass: ''
                    },
                    url: '/detail',
                    isRead: true,
                    isArchived: false,
                    sender: {
                        firstName: 'Alan',
                        lastName: 'Turing',
                        avatarUrl: 'https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTUzMTE2Njg3/alan-turing-9512017-1-402.jpg'
                    },
                    text: "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee."
                },
                {
                    id: Math.floor(Math.random() * 1000000 + 1),
                    type: {
                        name: 'type 1',
                        actions: [
                            {
                                name: 'Approve',
                                icon: 'fa fa-envelope-open-o',
                                func: this.handleMarkAsRead,
                                color: 'success'
                            },
                            {
                                name: 'Reject',
                                icon: 'fa fa fa-archive',
                                func: this.handleMarkAsArchived,
                                color: 'danger'
                            }
                        ]
                    },
                    title: "A Check check check",
                    date: {
                        dateObj: new Date("2015-03-03"),
                        displayDate: moment("2015-03-03", "YYYY-MM-DD").fromNow()
                    },
                    priority: {
                        name: "Low",
                        value: 3
                    },
                    category: null,
                    url: null,
                    isRead: true,
                    isArchived: false,
                    sender: null,
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et porttitor massa. Pellentesque sodales ante metus, quis gravida dolor accumsan et. Cras maximus, quam vitae fermentum consequat, mi magna aliquam ligula, ac hendrerit velit nibh ac mauris. Suspendisse ultricies dignissim enim, sit amet scelerisque ante tristique at. In tortor felis, tincidunt consequat purus eu, hendrerit pretium dui. Nunc volutpat, lacus ut placerat cursus, nulla lacus aliquet velit, id cursus odio nibh eget dolor. Vestibulum dictum congue ligula, a varius sem aliquet ut. Nunc commodo ligula nibh, sed condimentum dolor lacinia at. In euismod euismod luctus. Mauris ac arcu odio. Proin feugiat, ante et fermentum ullamcorper, eros massa consectetur est, eu congue metus erat eget neque. Suspendisse potenti. Sed sed volutpat nulla, id varius eros. Suspendisse potenti.`
                },
                {
                    id: Math.floor(Math.random() * 1000000 + 1),
                    type: {
                        name: 'type 1',
                        actions: [
            
                        ]
                    },
                    title: "D Check check check",
                    date: {
                        dateObj: new Date("2018-04-20 07:20"),
                        displayDate: moment("2018-04-20 12:20", "YYYY-MM-DD hh:mm").fromNow()
                    },
                    priority: {
                        name: "Medium",
                        value: 2
                    },
                    category: {
                        name: 'Important',
                        icon: 'fa fa-exclamation-triangle',
                        cssClass: ''
                    },
                    url: null,
                    isRead: false,
                    isArchived: false,
                    sender: {
                        firstName: "Rick",
                        lastName: 'Sanchez',
                        avatarUrl: 'https://vignette.wikia.nocookie.net/rickandmorty/images/8/8f/Rickk22.png/revision/latest?cb=20170911060616'
                    },
                    text: "something something in the month of may"
                },
                {
                    id: Math.floor(Math.random() * 1000000 + 1),
                    type: {
                        name: 'type 1',
                        actions: [
                            {
                                name: 'Approve',
                                icon: 'fa fa-envelope-open-o',
                                func: this.handleMarkAsRead,
                                color: 'success'
                            },
                            {
                                name: 'Reject',
                                icon: 'fa fa fa-archive',
                                func: this.handleMarkAsArchived,
                                color: 'danger'
                            },
                            {
                                name: 'PTP',
                                icon: 'fa fa-phone-square',
                                func: this.handlePhonecall,
                                color: 'warning'
                            }
                        ]
                    },
                    title: "C Check check check",
                    date: {
                        dateObj: new Date(),
                        displayDate: moment().fromNow()
                    },
                    priority: {
                        name: "High",
                        value: 1
                    },
                    category: null,
                    url: null,
                    isRead: false,
                    isArchived: false,
                    sender: null,
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et porttitor massa. Pellentesque sodales ante metus, quis gravida dolor accumsan et. Cras maximus, quam vitae fermentum consequat, mi magna aliquam ligula, ac hendrerit velit nibh ac mauris. Suspendisse ultricies dignissim enim, sit amet scelerisque ante tristique at. In tortor felis, tincidunt consequat purus eu, hendrerit pretium dui. Nunc volutpat, lacus ut placerat cursus, nulla lacus aliquet velit, id cursus odio nibh eget dolor. Vestibulum dictum congue ligula, a varius sem aliquet ut. Nunc commodo ligula nibh, sed condimentum dolor lacinia at. In euismod euismod luctus. Mauris ac arcu odio. Proin feugiat, ante et fermentum ullamcorper, eros massa consectetur est, eu congue metus erat eget neque. Suspendisse potenti. Sed sed volutpat nulla, id varius eros. Suspendisse potenti.`
                }
            ],
            priorityClasses: new Map([['High', 'danger'], ['Medium', 'warning'], ['Low', 'success']]),
            sortableFields: [
                { title: 'priority', sortByProp: 'value' },
                { title: 'date', sortByProp: 'dateObj' },
                { title: 'title' }
            ],
            actions: [
                {
                    name: 'Mark all as read',
                    icon: 'fa fa-envelope-open-o',
                    func: this.handleMarkAllItemsAsRead,
                    color: 'success'
                },
                {
                    name: 'Archive all',
                    icon: 'fa fa-archive',
                    func: this.handleMarkAllItemsAsArchived,
                    color: 'success'
                }
            ],
            filters: [
                { title: 'All', predicateFunc: (item) => !!item },
                { title: 'Unread', predicateFunc: (item) => !item.isRead },
                { title: 'Archived', predicateFunc: (item) => item.isArchived }
            ],
            emptyPage: <Alert color="primary">All clear, nothing to see here...</Alert>,
            truncateTextLength: 500,
            defaultSortBy: 'date'
        }
    }

    handlePhonecall = (item) => {
        console.log('.. ring ring', item);
        const isBiggerThanZero = Math.round(Math.random()) > 0;
        return {
            isSuccess: isBiggerThanZero ? true : false,
            message: isBiggerThanZero ? 'success message' : 'error message'
        };
    }

    handleMarkAsArchived = (item) => {
        let { items } = this.state;
        items = items.map(i => {
            if (i.id === item.id) {
                return Object.assign(i, i.isArchived = !i.isArchived);
            } else {
                return i;
            }
        });
        this.setState({ items: [...items], selectedItems: items.filter(i => i.isArchived) });
        const isBiggerThanZero = Math.round(Math.random()) > 0;
        return {
            isSuccess: isBiggerThanZero ? true : false,
            message: isBiggerThanZero ? 'success message' : 'error message'
        };
    }

    handleSmth = (item) => {
        console.log(item);
    }

    handleMarkAllItemsAsArchived = (item) => {
        let { items } = this.state;
        items = items.map(i => Object.assign(i, i.isArchived = true));
        this.setState({ items: [...items], selectedItems: items });
        const isBiggerThanZero = Math.round(Math.random()) > 0;
        return {
            isSuccess: isBiggerThanZero ? true : false,
            message: isBiggerThanZero ? 'success message' : 'error message'
        };
    }

    handleMarkAsRead = (item) => {
        const isBiggerThanZero = Math.round(Math.random()) > 0;
        if (isBiggerThanZero) {
            let { items } = this.state;
            items = items.map(i => {
                if (i.id === item.id) {
                    return Object.assign(i, i.isRead = !i.isRead);
                } else {
                    return i;
                }
            });
            this.setState({ items: [...items] });
        }
        return {
            isSuccess: isBiggerThanZero ? true : false,
            message: isBiggerThanZero ? 'success message' : 'error message'
        };
    }

    handleMarkAllItemsAsRead = (item) => {
        const isBiggerThanZero = Math.round(Math.random()) > 0;
        if (isBiggerThanZero) {
            let { items } = this.state;
            items = items.map(i => Object.assign(i, i.isRead = true));
            this.setState({ items: [...items] });
        }
        return {
            isSuccess: isBiggerThanZero ? true : false,
            message: isBiggerThanZero ? 'success message' : 'error message'
        };
    }

    render() {
        return (
            <NotificationList {...this.state} />
        )
    }
}

export default App;