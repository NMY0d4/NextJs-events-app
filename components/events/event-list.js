import React from 'react';
import EventItem from './event-item';
import styles from './event-list.module.scss';

export default function EventList({ items }) {
  
  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
