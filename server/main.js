import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import '../communities/methods';
import '../people/methods';
import '../people/publications';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
