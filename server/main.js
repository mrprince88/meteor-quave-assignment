import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import '../communities/communitiesMethods';
import '../people/peopleMethods';
import '../activities/activitiesMethods';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
