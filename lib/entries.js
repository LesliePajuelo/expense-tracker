Entries = new Mongo.Collection('entries')

Meteor.methods(
{
	addEntry: function(text, ammount, date)
		{

			if (text != "" && ammount != "" && date != "" && ammount != 0)
			{
				Entries.insert(
					{	
						text: text,
						ammount: parseFloat(ammount),

						//parse dateString
						date: new Date(date),
						timestamp: new Date()
					})
			}	
			else
			{
				throw new Meteor.Error("invalid-input");
			}
		},

	deleteEntry: function(entryId)
		{
			Entries.remove(entryId)
		},

	editEntry: function(entryId, text, ammount, date)
		{
			if (text != "" && ammount != "" && date != "" && ammount != 0)
			{
				Entries.update(entryId, 
					{ 
						$set: 
							{ 
								text: text,
								ammount: parseFloat(ammount),

								//parse dateString
								date: new Date(date),
								timestamp: new Date()
							} 
					});
			}	
			else
			{
				throw new Meteor.Error("invalid-input");
			}
		}
})