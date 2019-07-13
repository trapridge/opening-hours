// @flow strict

import React, { type ChildrenArray, type Element } from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.scss';

type Props = {
  children?: ChildrenArray<Element<typeof ListItem>>
};

export const List = ({ children }: Props) => (
  <ul className={styles.container}>{children}</ul>
);

export default List;
