Meteor.publish('entries', function(){
	return Entries.find({});
});

Meteor.publish('accounts', function(){
	return Accounts.find({});
});