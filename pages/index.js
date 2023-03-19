import Head from 'next/head';
import React from 'react';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>Next JS Events</title>
        <meta
          name='description'
          content='Find a lot of great event that allow you to evolve...'
        />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 3600,
  };
}
