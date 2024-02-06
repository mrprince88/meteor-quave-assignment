import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/Table';
import ActionButton from './ActionButton';

export const DataTable = ({ people }) => {
  return (
    <Table className="table-fixed overflow-scroll">
      <TableHeader className="bg-gray-200">
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
              <ActionButton person={person} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
