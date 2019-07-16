// @flow strict

import React, { type Element } from 'react';
import styles from './ListItem.module.scss';

type Props = {
  children?: Element<any> | string,
};

export const ListItem = ({ children, ...rest }: Props) => (
  <li className={styles.item} {...rest}>
    {children}
  </li>
);

export default ListItem;
