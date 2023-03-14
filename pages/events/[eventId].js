import { Router, useRouter } from 'next/router';
import { Fragment } from 'react';
import EventLogistics from '../../components/events/event-logistics';
import EventSummary from '../../components/events/event-summary';
import EventContent from '../../components/events/event-content';
import { getEventById } from '../../dummy-data';
import ErrorAlert from '../../components/ui/error-alert';

export default function Event() {
  const router = useRouter();
  const event = getEventById(router.query.eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
}
