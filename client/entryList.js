Template.entryList.helpers(
{
	entries: Entries.find({}, {sort: {date: -1}})
});