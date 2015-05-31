Template.body.events(
{
	"submit .new-entry": function(event)
		{
			var text = event.target.text.value;
			var value = event.target.val.value;
			var date = event.target.date.value;

			// send add request to the server
			Meteor.call("addEntry", text, value, date);

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

Template.body.helpers(
{
	balance: function()
		{
			return _.reduce(
				Entries.find({}).fetch(), 
				function(memo, entry)
					{ 
						if (entry.val) 
							return memo + parseFloat(entry.val)
						else
							return memo 
					}, 
				0.0)
		}
})
        