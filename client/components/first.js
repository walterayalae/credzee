import React from 'react';

export default class First extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="first">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}
