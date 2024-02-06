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
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <Table className="table-fixed overflow-scroll">
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableHead className="w-[200px]">Fist Name</TableHead>
          <TableHead className="w-[200px]">Last Name</TableHead>
          <TableHead className="w-[200px]">Role</TableHead>
          <TableHead className="w-[200px]">Company</TableHead>
          <TableHead className="w-[200px]">Check in</TableHead>
          <TableHead className="w-[200px]">Check out</TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
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
              {/* convert date to MM/DD/YYYY HH:MM format */}

              {person.lastCheckIn ? formatter.format(person.lastCheckIn) : '-'}
            </TableCell>
            <TableCell>
              {person.lastCheckOut
                ? formatter.format(person.lastCheckOut)
                : '-'}
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
