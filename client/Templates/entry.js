
Template.entry.helpers(
{
	negative: function() 
		{
			return this.ammount < 0
		},

	positive: function() 
		{
			return this.ammount > 0
		},

	expanded: function()
		{
			return Session.get("expanded-entry") === this._id || false;
		},

	editing: function()
		{
			return Session.get("editing-entry") === this._id || false;
		},

	dateFromNow: function()
		{
			return moment(this.date).fromNow();
		},

	dayDate: function()
		{
			return moment(this.date).format("MMMM D, YYYY")
		}
})

Template.entry.events(
{
	"click .entry": function()
		{
			var expanded = Session.get("expanded-entry") === this._id || false

			Session.set("expanded-entry", expanded? "" : this._id)

			return false;
		},

	"click #delete-entry": function()
		{
			Meteor.call("deleteEntry", this._id)

			return false;
		},

	"click #edit-entry": function()
		{
			var editing = Session.get("editing-entry") === this._id || false

			Session.set("editing-entry", editing? "" : this._id)

			return false;
		},

	"submit .edit-entry": function(event)
		{
			var text = event.target.text.value;
			var ammount = event.target.ammount.value;
			var date = event.target.date.value;

			Meteor.call("editEntry", this._id, text, ammount, date)

			// close the edit panel
			Session.set("editing-entry", "")

			return false;
		}

})