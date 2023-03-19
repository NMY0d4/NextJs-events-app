import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../helpers/api-util';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilteredEvents() {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'https://gmweb-react-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
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
    filteredMonth > 12 ||
    error
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

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  const btnShowAllevents = (
    <div className='center'>
      <Button link='/events'>Show All Events</Button>
    </div>
  );

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

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = +filterData[0];
//   const filteredMonth = +filterData[1];

//   if (
//     !isFinite(filteredYear) ||
//     !isFinite(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2023 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     };
//   }

//   const filterDate = {
//     year: filteredYear,
//     month: filteredMonth,
//   };

//   const filteredEvents = await getFilteredEvents({
//     ...filterDate,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       filterDate,
//     },
//   };
// }
