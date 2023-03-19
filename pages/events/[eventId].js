import { Fragment } from 'react';
import EventLogistics from '../../components/events/event-logistics';
import EventSummary from '../../components/events/event-summary';
import EventContent from '../../components/events/event-content';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import ErrorAlert from '../../components/ui/error-alert';

export default function Event({ event }) {

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
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

export async function getStaticProps(context) {
  
  const { eventId } = context.params;

  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: { event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((ev) => ({ params: { eventId: ev.id } }));

  return {
    paths,
    fallback: true,
  };
}
