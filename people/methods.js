import { Meteor } from 'meteor/meteor';

import { People } from './people';

Meteor.methods({
  'people.getAll'() {
    return People.find({}).fetch();
  },
  'people.getByCommunityId'(communityId) {
    return People.rawCollection()
      .aggregate([
        {
          $match: {
            communityId,
          },
        },
        {
          $lookup: {
            from: 'activities',
            localField: '_id',
            foreignField: 'personId',
            as: 'activities',
          },
        },
        {
          $sort: {
            'activities.checkedIn': -1,
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            companyName: 1,
            title: 1,
            activity: {
              $arrayElemAt: ['$activities', 0],
            },
          },
        },
      ])
      .toArray();
  },
});
