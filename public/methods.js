Meteor.methods(
{
	addEntry: function(name, value, date)
	{
		Entries.insert(
		{
			name: name,
			value: value,
			date: date,
			timestamp: new Date(date)
		}),

	deleteEntry: function(entryID){
		Entries.remove(entryID)
	},

	editEntry: function(entryID, name, value, date){
		Entries.update(entryID){$set:{
			name: name, 
			value, value,
			date, new Date(date),
			timestamp: new Date()
		}}
	}
	