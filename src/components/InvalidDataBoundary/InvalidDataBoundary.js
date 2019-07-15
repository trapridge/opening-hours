// @flow strict

import React, { Component, type Element, type Node } from 'react';
import List from '../ui/List/List';
import ListItem from '../ui/ListItem/ListItem';

type Props = {
  children: Node
};

type State = {
  hasError: boolean
};

export class InvalidDataBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render(): Element<typeof List> | Node {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <List>
          <ListItem key="invalid">
            <span>Invalid data</span>
          </ListItem>
        </List>
      );
    }

    return this.props.children;
  }
}

export default InvalidDataBoundary;
