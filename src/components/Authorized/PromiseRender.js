import React from 'react';
import { Spin } from 'doraemon';

export default class PromiseRender extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      component: null,
    };
  }

  componentDidMount() {
    const { promise, ok, error } = this.props;
    Promise.all(promise.map((func) => {
      return func();
    })).then((res) => {
      const urlData = res[0];
      let isPermit;
      if (urlData.result) {
        isPermit = urlData.result.isPermit;
      } else {
        isPermit = false;
      }
      if (isPermit) {
        this.setState({
          component: () => ok,
        });
      } else {
        this.setState({
          component: () => error,
        });
      }
    }).catch(() => {
      this.setState({
        component: () => error,
      });
    });
  }
  render() {
    const Component = this.state.component;

    return Component ? (
      <Component {...this.props} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
