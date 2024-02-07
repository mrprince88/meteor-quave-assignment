import React, { useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';

const PeopleStats = new Mongo.Collection('peopleStats');

export default function Statistics({ communityId }) {
  const [peopleCheckedInCount, setPeopleCheckedInCount] = useState(0);
  const [peopleNotCheckedInCount, setPeopleNotCheckedInCount] = useState(0);
  const [peopleCheckedInByCompany, setPeopleCheckedInByCompany] = useState([]);

  useEffect(() => {
    const peopleStats = Meteor.subscribe('peopleStats', communityId);
    const computation = Tracker.autorun(() => {
      if (peopleStats.ready()) {
        const stats = PeopleStats.findOne(communityId);

        console.log('stats', stats);
        setPeopleCheckedInCount(stats.peopleCheckedInCount);
        setPeopleNotCheckedInCount(stats.peopleNotCheckedInCount);
        setPeopleCheckedInByCompany(stats.peopleCheckedInByCompany);
      }
    });
    return () => {
      computation.stop();
      peopleStats.stop();
    };
  }, [communityId]);

  return (
    <div className="text-2xl md:text-lg">
      <h2>People in the event right now: {peopleCheckedInCount}</h2>
      {peopleCheckedInByCompany.length !== 0 && (
        <h2>
          People by company in the event right now:
          {peopleCheckedInByCompany?.map(([company, count], index) => (
            <span key={company}>{`${
              index !== 0 ? ', ' : ' '
            }${company} (${count})`}</span>
          ))}
        </h2>
      )}
      <h2>People not checked-in: {peopleNotCheckedInCount}</h2>
    </div>
  );
}
