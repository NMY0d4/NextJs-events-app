import Link from 'next/link';
import React from 'react';
import styles from './button.module.scss';

export default function Button(props) {
  const { link, children } = props;

  return (
    <Link href={link} className={styles.btn}>
      {children}
    </Link>
  );
}
