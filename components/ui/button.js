import Link from 'next/link';
import React from 'react';
import styles from './button.module.scss';

export default function Button(props) {
  const { link, children, onClick } = props;

  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
