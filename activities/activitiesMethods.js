import { Meteor } from 'meteor/meteor';
import { Activities } from './activities';

Meteor.methods({
  'activities.checkIn': function(personId) {
    if (!personId) {
      throw new Meteor.Error('Person ID is required');
    }

    const activity = {
      personId,
      checkedIn: new Date(),
    };

    return Activities.insert(activity);
  },
  'activities.checkOut': function(personId) {
    const activity = {
      personId,
      createdAt: new Date(),
    };
    return Activities.insert(activity);
  },
});
