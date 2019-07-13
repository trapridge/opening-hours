// @flow strict

import React, { type Element } from 'react';
import styles from './ListItem.module.scss';

type Props = {
  key?: string,
  children?: Element<any> | string
};

export const ListItem = ({ children, key }: Props) => (
  <li key={key} className={styles.item}>
    {children}
  </li>
);

export default ListItem;
