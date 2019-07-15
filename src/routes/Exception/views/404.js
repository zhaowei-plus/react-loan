import React, { PureComponent } from 'react';
import { Exception } from 'doraemon';
import ExceptionBase from './exception-base';

export default class NotFound extends PureComponent {
  render() {
    return (
      <ExceptionBase>
        <Exception.NotFound />
      </ExceptionBase>
    );
  }
}
