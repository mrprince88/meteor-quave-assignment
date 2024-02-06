import { People } from '../people/people.js';

Meteor.publish('people', function(communityId, currentPage, pageSize) {
  return People.find(
    { communityId },
    { limit: pageSize, skip: (currentPage - 1) * pageSize }
  );
});
