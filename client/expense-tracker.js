//subscriptions
Meteor.subscribe('entries');

Meteor.subscribe('accounts');




//events

Template.body.events(
{
	"submit": function(event){
		var name = event.target.name.value;
		var value = event.target.value.value;
		var date = event.target.date.value;

		Meteor.call("addEntry", name, value, date);

		event.target.reset();

		return false;
	}
});

//helpers
Template.entryList.helpers({
  entries: Entries.find({}, {sort:{createdAt:-1}})
});