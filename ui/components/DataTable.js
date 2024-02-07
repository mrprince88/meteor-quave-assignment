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
          <TableHead className="w-[200px]">Full Name</TableHead>
          <TableHead className="w-[200px]">Company Name</TableHead>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead className="w-[200px]">Check-in date</TableHead>
          <TableHead className="w-[200px]">Check-out date</TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map(person => (
          <TableRow key={person._id}>
            <TableCell>
              {person.firstName} {person.lastName}
            </TableCell>
            <TableCell>{person.companyName ?? '-'}</TableCell>
            <TableCell>{person.title ?? '-'}</TableCell>
            <TableCell>
              {/* convert date to MM/DD/YYYY HH:MM format */}
              {person.lastCheckIn
                ? formatter.format(person.lastCheckIn)
                : 'N/A'}
            </TableCell>
            <TableCell>
              {person.lastCheckOut
                ? formatter.format(person.lastCheckOut)
                : 'N/A'}
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
