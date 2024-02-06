import { People } from '../people/people.js';

Meteor.publish('people', function(communityId, currentPage, pageSize) {
  return People.find(
    { communityId },
    { limit: pageSize, skip: (currentPage - 1) * pageSize }
  );
});

const getCounts = communityId => {
  const peopleCheckedIn = People.find({
    communityId: communityId,
    lastCheckIn: { $exists: true },
    lastCheckOut: { $exists: false },
  }).fetch();

  const peopleCheckedInByCompany = peopleCheckedIn.reduce(function(
    acc,
    person
  ) {
    if (person.companyName)
      acc[person.companyName] = acc[person.companyName] + 1 || 1;
    return acc;
  },
  {});

  const peopleNotCheckedInCount = People.find({
    communityId: communityId,
    lastCheckIn: { $exists: false },
  }).count();

  return {
    peopleCheckedInCount: peopleCheckedIn.length,
    peopleCheckedInByCompany: peopleCheckedInByCompany,
    peopleNotCheckedInCount: peopleNotCheckedInCount,
  };
};

Meteor.publish('peopleStats', function(communityId) {
  const self = this;

  const initialCounts = getCounts(communityId);
  self.added('peopleStats', communityId, initialCounts);

  const handle = People.find({ communityId: communityId }).observeChanges({
    changed: () => {
      self.changed('peopleStats', communityId, getCounts(communityId));
    },
  });

  self.ready();

  self.onStop(function() {
    handle.stop();
  });
});
