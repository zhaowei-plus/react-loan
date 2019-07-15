import React, { Component } from 'react';
import moment from 'moment';
import { Icon } from 'doraemon';

export default class NowTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment()
        .format('YYYY年MMMDo    h:mm:ss a'),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: moment()
          .format('YYYY年MMMDo    h:mm:ss a'),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { time } = this.state;
    return (
      <span>
        <Icon type="clock-circle-o" />
      &nbsp;
        {time}
      </span>
    );
  }
}
