// @flow strict

import classNames from 'classnames';
import React, { type Node } from 'react';
import styles from './Box.module.scss';

type Props = {
  header: string,
  icon?: string,
  children?: Node,
};

export const Box = ({ header, icon, children }: Props) => {
  return (
    <div className={styles.container}>
      {icon && <img src={icon} alt="icon" />}
      <h1
        className={classNames({
          [styles.header]: true,
          [styles['with-icon']]: !!icon,
        })}
      >
        {header}
      </h1>
      <div>{children}</div>
    </div>
  );
};

export default Box;
