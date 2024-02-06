import { People } from '../people/people.js';

Meteor.publish('people', function(communityId) {
  return People.find({ communityId });
});
