import { Meteor } from 'meteor/meteor';

import { People } from './people';

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
