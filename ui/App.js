import React from 'react';
import { Texts } from '../infra/constants';
import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

export const App = () => {
  const [communities, setCommunities] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    Meteor.call('communities.getAll', (err, res) => {
      if (err) console.log(err);
      else {
        console.log(res);
        setCommunities(res);
      }
    });
  }, []);

  const handleCommunityChange = event => {
    const communityId = event.target.value;
    Meteor.call('people.getByCommunityId', communityId, (err, res) => {
      if (err) console.log(err);
      else {
        console.log(res);
        setPeople(res);
      }
    });
  };

  const handleButtonClick = (personId, action) => {
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
    <div className="w-full">
      <h1 className="text-4xl text-center p-10 font-semibold">
        {Texts.HOME_TITLE}
      </h1>

      <div className="flex justify-center flex-col items-center">
        <select
          onChange={handleCommunityChange}
          className="w-[200px] h-[40px] rounded border border-gray-300 mb-10"
        >
          <option value="">{Texts.SELECT_COMMUNITY}</option>
          {communities.map(community => (
            <option key={community._id} value={community._id}>
              {community.name}
            </option>
          ))}
        </select>

        <table className="table-auto">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2">Fist Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Check in</th>
              <th className="px-4 py-2">Check out</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr key={person._id}>
                <td className="border px-4 py-2">{person.firstName}</td>
                <td className="border px-4 py-2">{person.lastName}</td>
                <td className="border px-4 py-2">{person.title ?? '-'}</td>
                <td className="border px-4 py-2">
                  {person.companyName ?? '-'}
                </td>
                <td className="border px-4 py-2">
                  {person.lastCheckIn ? person.lastCheckIn.toDateString() : '-'}
                </td>
                <td className="border px-4 py-2">
                  {person.lastCheckOut
                    ? person.lastCheckOut.toDateString()
                    : '-'}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-400 p-2 rounded ml-2 disabled:opacity-50"
                    onClick={() =>
                      handleButtonClick(
                        person._id,
                        person.lastCheckIn ? 'checkOut' : 'checkIn'
                      )
                    }
                    disabled={person.lastCheckOut}
                  >
                    {person?.lastCheckIn ? 'Check out' : 'Check in'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
