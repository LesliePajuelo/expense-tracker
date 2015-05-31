//subscripitons
Meteor.subscribe('entries');

//events
Template.body.events(
{
	"submit .new-entry": function(event)
		{
			var text = event.target.text.value;
			var ammount = event.target.ammount.value;
			var date = event.target.date.value;

			// send add request to the server
			Meteor.call("addEntry", text, ammount, date);

			// empty form
			event.target.reset();

			return false;
		},

	"click *" : function(event)
		{
			// colapse any expanded entry
			Session.set("expanded-entry", "");
			Session.set("editing-entry", "");
		}
})

//helpers
Template.body.helpers(
{
	balance: function()
		{
			return _.reduce(
				Entries.find({}).fetch(), 
				function(memo, entry)
					{ 
						if (entry.ammount) 
							return memo + parseFloat(entry.ammount)
						else
							return memo 
					}, 
				0.0)
		}
})

Meteor.startup( function()
{
	// instantiate the date picking elements
	$('.datepicker').pickadate();
})
        