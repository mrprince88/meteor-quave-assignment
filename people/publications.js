import { People } from '../people/people.js';

Meteor.publish('people', function(communityId, currentPage, pageSize) {
  return People.find({ communityId }, { skip: currentPage, limit: pageSize });
});
