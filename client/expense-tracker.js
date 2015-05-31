//subscriptions
Meteor.subscribe('entries');

Meteor.subscribe('accounts');




//events

Template.body.events(
{
	"submit .new-entry": function(event){
		var name = event.target.name.value;
		var value = event.target.value.value;
		var date = event.target.date.value;

		Meteor.call("addEntry", name, value, date);

		event.target.reset();

		return false;
	}, 

	"click" : function(event){
		//toggle expanded entry
		Session.set("expanded-entry", "");
		Session.set("editing-entry", "")
	}
})

//helpers
Template.body.helpers({

	balance: function(){
		return _.reduce(
			Entries.find({}).fetch(),
				function(memo, entry)
				{
					if(entry.value)
						return memo + parseFloat(entry.value)
					else
						return memo
				},
				//entry
				0.0)			}
				
	})





Template.entryList.helpers({
  entries: Entries.find({}, {sort:{date:-1}}),

 dayDate: function(){
  	return moment(this.date).format("D MMMM, YYYY")
  },

  dateFromNow: function()
  {
  	return moment(this.date).fromNow();
  },
  editing: function()
  {
  	return Session.get("editing-entry") === this._id || false;
  },
  expanded: function(){
  	return Session.get("expanded-entry") === this._id || false;
  },

  negative: function(){
  	return this.value <0
  },

  positive: function(){
  	return this.value >0
  }

});

//Events

Template.entry.events(
{
	"click .entry": function(){

		var expanded = Session.get("expanded-entry") === this._id || false

		Session.set("expanded-entry", expanded? "": this._id)

		return false;
	},

	"click #delete-entry": function(){

		Meteor.call("deleteEntry", this._id)
		return false;

	},

	"click #edit-entry": function(){

		var editing = Session.get("editing-entry") === this._id || false
		Session.set("editing-entry", editing? "" : this._id)
		return false;

	}
})