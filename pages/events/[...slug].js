import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilteredEvents() {
  const router = useRouter();
  const filterData = router.query.slug;
  const btnShowAllevents = (
    <div className='center'>
      <Button link='/events'>Show All Events</Button>
    </div>
  );

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }
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
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        {btnShowAllevents}
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

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

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}
