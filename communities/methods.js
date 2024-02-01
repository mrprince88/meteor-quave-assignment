import { Meteor } from 'meteor/meteor';
import { Communities } from './communities';

Meteor.methods({
  'communities.getAll'() {
    return Communities.find({}).fetch();
  },
});
