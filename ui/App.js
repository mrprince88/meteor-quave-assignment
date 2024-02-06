import React from 'react';
import { Texts } from '../infra/constants';
import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { People } from '../people/people';
import { DataTable } from '../ui/components/DataTable';
import SelectComponent from '../ui/components/ui/Select';
import PaginationComponent from '../ui/components/ui/Pagination';
import Statistics from './components/Statistics';

const PAGE_SIZE = 10;

export const App = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const peopleSubscription = Meteor.subscribe(
      'people',
      selectedCommunity,
      currentPage,
      PAGE_SIZE
    );

    // Tracker.autorun will re-run the function whenever the reactive data changes
    // Tried using useTracker but for some reason it was reruning 4 times on every change
    const computation = Tracker.autorun(
      () => {
        if (peopleSubscription.ready()) {
          const people = People.find({}).fetch();
          setPeople(people);
        }
      },
      {
        onError: err => {
          console.log(err);
        },
      }
    );

    return () => {
      computation.stop();
      peopleSubscription.stop();
    };
  }, [selectedCommunity, currentPage]);

  // get all communities
  useEffect(() => {
    Meteor.call('communities.getAll', (err, res) => {
      if (err) console.log(err);
      else {
        setCommunities(res);
        setSelectedCommunity(res[0]?._id);
      }
    });
  }, []);

  // return loading if communities are not loaded
  if (!communities.length) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-4xl text-center p-10 font-semibold">
        {Texts.HOME_TITLE}
      </h1>

      <div className="p-10">
        <SelectComponent
          value={selectedCommunity}
          onValueChange={value => setSelectedCommunity(value)}
          options={communities}
          placeholder="Select a community"
        />

        <Statistics communityId={selectedCommunity} />
      </div>

      <DataTable people={people} />
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={PAGE_SIZE}
        itemsSize={people.length}
      />
    </>
  );
};
