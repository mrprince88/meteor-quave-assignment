## Explaination

Initial Setup:

- On server, I created Meteor methods to get all communities from the collection.
- On client, In App.js file in ui folder we call the method and show those communities in a select component.
- On server, For people list also intially we created a Meteor method to fetch people based on community id.
- On client, we call the same meteor method to fetch the people when community changes and show data in a table

Once we have the initial setup ready, next steps:

- To add check in/check out feature I initally thought of creating a separate collection to store that data and adding an aggregation by combining data from both the collections.
- We also have to add pub/sub modal to have reactivity when change in check-in/check-out date changes. During my research I found that we cannot run aggregate directly on the collections, so we cannot return a cursor for subscribing.
- I ended up storing lastCheckIn and lastCheckOut time in the people collection.
- So I created a pub/sub on people list based on communityId.
- On client, we subscribe to the pople list whenever communityId changes. If we already have an open subscription we close the previous one.
- We add button in the table for check in/check out. We call methods on button click and update lastCheckIn/lastCheckOut time.
- Whenever people collection changes, the data on client is automatically changes.
- We add timeout on ActionButton whenever button is tapped to disable the button for 5 seconds.
- For adding pagination in the list, we add page state to the pub/sub also to return only data for a particular page only.

For stats:

- We add a pub/sub for stats over the whole list of people for communities. We have store those stats to a different collection in the MiniMongo on client side.
