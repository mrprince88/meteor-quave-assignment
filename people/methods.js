import { Meteor } from 'meteor/meteor';

import { People } from './people';

// We define methods to interact with the People collection.
// Here i thought it would bea good idea to add a separate collection for the check in and check out of the people.
// But that quickly become cumbersome and i decided to add the check in and check out fields to the people collection itself.

Meteor.methods({
  'people.getAll'() {
    return People.find({}).fetch();
  },
  'people.getByCommunityId'(communityId) {
    return People.find({ communityId }).fetch();
  },
  'people.checkIn'(personId) {
    if (People.findOne(personId).lastCheckIn) {
      throw new Meteor.Error(
        'already-checked-in',
        'This person is already checked in'
      );
    }
    return People.update(
      { _id: personId },
      { $set: { lastCheckIn: new Date() } }
    );
  },
  'people.checkOut'(personId) {
    if (!People.findOne(personId).lastCheckIn) {
      throw new Meteor.Error('not-checked-in', 'This person is not checked in');
    }
    return People.update(
      { _id: personId },
      { $set: { lastCheckOut: new Date() } }
    );
  },
});
