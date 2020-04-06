import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import Initializing from '../components/Initializing';

storiesOf('Initializing', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return <Initializing />;
  });
