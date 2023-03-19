import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../helpers/api-util';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilteredEvents({ hasError, events, filterDate }) {
  const router = useRouter();
  const filterData = router.query.slug;

  const btnShowAllevents = (
    <div className='center'>
      <Button link='/events'>Show All Events</Button>
    </div>
  );

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        {btnShowAllevents}
      </Fragment>
    );
  }

  const filteredEvents = events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
          {btnShowAllevents}
        </ErrorAlert>
      </Fragment>
    );
  }

  const date = new Date(filterDate.year, filterDate.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    !isFinite(filteredYear) ||
    !isFinite(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2023 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const filterDate = {
    year: filteredYear,
    month: filteredMonth,
  };

  const filteredEvents = await getFilteredEvents({
    ...filterDate,
  });

  return {
    props: {
      events: filteredEvents,
      filterDate,
    },
  };
}
