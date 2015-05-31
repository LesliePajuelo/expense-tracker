Meteor.methods(
{
	addEntry: function(text, val, date)
		{

			if (text != "" && val != "" && date != "" && val != 0)
			{
				Entries.insert(
					{	
						text: text,
						val: parseFloat(val),

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

	editEntry: function(entryId, text, val, date)
		{
			if (text != "" && val != "" && date != "" && val != 0)
			{
				Entries.update(entryId, 
					{ 
						$set: 
							{ 
								text: text,
								val: parseFloat(val),

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