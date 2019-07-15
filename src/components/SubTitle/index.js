import React from 'react';

export const SubTitle = props => (
  <span style={
    {
      display: 'inline-block',
      borderLeft: '3px solid #3177fd',
      paddingLeft: '8px',
      lineHeight: '16px',
      color: '#001830',
    }
  }
  > {
      props.title
    }
  </span>
);
