import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

export default function ActionButton({ person }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // if the person checked in less than 5 seconds ago, disable the button
    if (!person.lastCheckIn) return;

    const timeLeft = 5000 - (new Date() - person.lastCheckIn);

    if (timeLeft > 0) {
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
      }, timeLeft);
    }
  }, [person.lastCheckIn]);

  const handleButtonClick = (personId, action) => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
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
    <button
      className="bg-blue-400 p-2 rounded ml-2 disabled:opacity-50"
      onClick={() =>
        handleButtonClick(
          person._id,
          person.lastCheckIn ? 'checkOut' : 'checkIn'
        )
      }
      disabled={buttonDisabled || person.lastCheckOut}
    >
      {person?.lastCheckIn ? 'Check out' : 'Check in'}{' '}
      {person?.firstName + ' ' + person?.lastName}
    </button>
  );
}
