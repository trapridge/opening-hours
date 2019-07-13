// @flow strict

import { configure } from '@storybook/react';

// $FlowFixMe
const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}


configure(loadStories, module);
