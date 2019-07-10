// @flow strict

import React from 'react';
import OpeningHours from './components/OpeningHours/OpeningHours';
import logo from './logo.svg';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles['App']}>
      <OpeningHours
        openingHours={{
          monday: [],
          tuesday: [
            {
              type: 'open',
              value: 36000
            },
            {
              type: 'close',
              value: 64800
            }
          ],
          wednesday: [],
          thursday: [
            {
              type: 'open',
              value: 36000
            },
            {
              type: 'close',
              value: 64800
            }
          ],
          friday: [
            {
              type: 'open',
              value: 36000
            }
          ],
          saturday: [
            {
              type: 'close',
              value: 3600
            },
            {
              type: 'open',
              value: 36000
            }
          ],
          sunday: [
            {
              type: 'close',
              value: 3600
            },
            {
              type: 'open',
              value: 43200
            },
            {
              type: 'close',
              value: 75600
            }
          ]
        }}
      />
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React &lt;3
        </a>
      </header>
    </div>
  );
}

export default App;
