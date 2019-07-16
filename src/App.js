// @flow strict

import axios from 'axios';
import React, { Component, type Element, Fragment } from 'react';
import type { OpeningHoursRecords } from './components/OpeningHours/OpeningHours';
import OpeningHours from './components/OpeningHours/OpeningHours';

type Props = {};

type State = {
  openingHoursData: OpeningHoursRecords | void,
  loading: boolean,
  loadError: boolean,
};

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openingHoursData: undefined,
      loading: false,
      loadError: false,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true, loadError: false });
      const { data } = await axios.get('data.json');
      this.setState({ openingHoursData: data, loading: false });
    } catch (error) {
      this.setState({ loading: false, loadError: true });
    }
  }

  render(): Element<typeof Fragment> {
    const { openingHoursData, loading, loadError } = this.state;

    return (
      <>
        {loading && 'Loading opening hours'}
        {loadError && 'Cannot load opening hours'}
        {!loading && !loadError && openingHoursData && (
          <OpeningHours data={openingHoursData} />
        )}
      </>
    );
  }
}

export default App;
