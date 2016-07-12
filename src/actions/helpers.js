'use strict';
/*
* Function to format the query and add keys to the query object based on the tags
*
* Returned object should look like:
*  {
*    passengers: [],
*    geography: [] // key only added if there are geo tags,
*    marketing: [] // key only added if there are marketing tags,
*    travelPeriod: []
*    departureAirports: []
*  }
*/
export function formatQuery (store) {
  const {
     search: {
      tags,
      numberOfChildren,
      numberOfAdults,
      childAges,
      departureDate,
      durationWeeks,
      departureAirport
    }
  } = store;
  const formattedTags = formatTags(tags);
  const passengers = combinePassengersForQuery(childAges, numberOfChildren, numberOfAdults);
  const departureAirports = constructDepartureAirportQuery(departureAirport);
  const travelPeriod = constructTravelPeriodQuery(departureDate, durationWeeks);
  const query = {passengers: passengers, travelPeriod: travelPeriod, departureAirports: departureAirports, ...formattedTags};
  query.related = true;
  return query;
}

/*
* Formats the tags for a graphql mutation query
*/

export function formatTags (tags) {
  return tags.reduce((q, tag) => {
    const type = tag.id.split(':')[0];
    const field = type === 'geo' ? 'geography' : type;
    const value = q[field] || {};
    const updatedQuery = {
      ...q,
      [field]: [
        ...value,
        tag.id
      ]
    };
    return updatedQuery;
  }, {});
}

/*
* Formats the passengers for a graphql mutation query
*/

export function combinePassengersForQuery (childAgeArray, numberOfChildren, numberOfAdults) {
  const slicedChildAgeArray = childAgeArray.slice(0, numberOfChildren);
  const childPassengers = slicedChildAgeArray.map(slicedChildAge => {
    const date = new Date();
    const year = date.getFullYear() - slicedChildAge;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return ({birthday: `${year}-${month}-${day}`});
  });
  let adultPassengers = [];
  for (let i = 0; i < numberOfAdults; i++) {
    const date = new Date();
    const year = date.getFullYear() - 20;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    adultPassengers.push({birthday: `${year}-${month}-${day}`});
  }
  const combinedPassengers = [...childPassengers, ...adultPassengers];
  return combinedPassengers;
}

/*
* Formats the travel period for a graphql search mutation query
*/

export function constructTravelPeriodQuery (departureDate, duration) {
  const nights = duration * 7;
  const travelPeriod = {
    departureBetween: [departureDate],
    nights: [nights]
  };
  return travelPeriod;
}

/*
* Formats the departure airpot for a graphql search mutation query
*/

export function constructDepartureAirportQuery (departureAirport) {
  const airportCode = departureAirport.split(' ')[2];
  const departureAirportMapped = `airport:master.${airportCode}`;
  const airport = [departureAirportMapped];
  return airport;
}
