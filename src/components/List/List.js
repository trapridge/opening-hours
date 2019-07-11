// @flow strict

import React, { type ChildrenArray, type Element } from 'react';
import styles from './List.module.scss';

type Props = {
  children?: ChildrenArray<Element<'li'>>
};

export const List = ({ children }: Props) => (
  <ul className={styles.container}>{children}</ul>
);

export default List;
