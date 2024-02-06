import React from 'react';
import { Texts } from '../infra/constants';
import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { People } from '../people/people';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/components/ui/Table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/components/ui/Select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/components/ui/Pagination';

const PAGE_SIZE = 10;

export const App = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [people, setPeople] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const peopleSubscription = Meteor.subscribe(
      'people',
      selectedCommunity,
      currentPage,
      PAGE_SIZE
    );

    const computation = Tracker.autorun(
      () => {
        if (peopleSubscription.ready()) {
          const people = People.find().fetch();
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

  useEffect(() => {
    Meteor.call('communities.getAll', (err, res) => {
      if (err) console.log(err);
      else {
        setCommunities(res);
        setSelectedCommunity(res[0]?._id);
      }
    });
  }, []);

  const handleCommunityChange = value => {
    setSelectedCommunity(value);
  };

  const handleButtonClick = (personId, action) => {
    setButtonDisabled(personId);
    setTimeout(() => {
      setButtonDisabled('');
    }, 5000);
    if (action === 'checkIn') {
      Meteor.call('people.checkIn', personId, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      });
    } else {
      Meteor.call('people.checkOut', personId, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
      });
    }
  };

  if (!communities.length) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-4xl text-center p-10 font-semibold">
        {Texts.HOME_TITLE}
      </h1>

      <div className="flex justify-center flex-col items-center">
        <Select value={selectedCommunity} onValueChange={handleCommunityChange}>
          <SelectTrigger className="w-[180px] mb-10">
            <SelectValue placeholder="Select community" />
          </SelectTrigger>
          <SelectContent>
            {communities.map(community => (
              <SelectItem key={community._id} value={community._id}>
                {community.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* <h2 className="text-2xl mb-5">
          People in event: {getPeopleCheckedIn(people)}
        </h2>
        <h2 className="text-xl mb-5">
          People by Company: {getPeopleByCompany(people)}
        </h2>
        <h2 className="text-xl mb-5">
          People not checked in: {getPeopleNotCheckedIn(people)}
        </h2> */}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fist Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Check in</TableHead>
              <TableHead>Check out</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.map(person => (
              <TableRow key={person._id}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.title ?? '-'}</TableCell>
                <TableCell>{person.companyName ?? '-'}</TableCell>
                <TableCell>
                  {person.lastCheckIn ? person.lastCheckIn.toDateString() : '-'}
                </TableCell>
                <TableCell>
                  {person.lastCheckOut
                    ? person.lastCheckOut.toDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <button
                    className="bg-blue-400 p-2 rounded ml-2 disabled:opacity-50"
                    onClick={() =>
                      handleButtonClick(
                        person._id,
                        person.lastCheckIn ? 'checkOut' : 'checkIn'
                      )
                    }
                    disabled={buttonDisabled === person._id}
                  >
                    {person?.lastCheckIn ? 'Check out' : 'Check in'}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={people.length < PAGE_SIZE}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
