import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/Table';
import { Meteor } from 'meteor/meteor';

export const DataTable = ({ people }) => {
  const [buttonDisabled, setButtonDisabled] = useState('');

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

  return (
    <Table className="auto">
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
              {person.lastCheckOut ? person.lastCheckOut.toDateString() : '-'}
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
  );
};
