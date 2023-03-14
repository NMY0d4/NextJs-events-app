import { useRouter } from 'next/router';
import React from 'react';
import { getFilteredEvents } from '../../dummy-data';

export default function FilteredEvents() {
  const router = useRouter();
  const filterData = router.query.slug;
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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filteredEvents || filteredEvents === 0) {
    return <p>No events found for the chosen filter!</p>
  }

  return (
    <div>
      <h1>Filtered Events</h1>
    </div>
  );
}
