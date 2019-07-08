//to connect
// $sudo mongod
//to enter the mongo shell
// $mongo

//cls to clear window
//entering commands and work with database
// $ show dbs to get all the databases on your server

//creating new database or connecting to one that exists
//$use flights  //this will create a databse called flights if it doesn't exist
//note that flights won't actually get created until i enter data in it
// adding data
//db.collectionname.queryCommand
//db will be the database i'm referencing
//followed by the collection i want to work with
//then the query
//db.flightData.insertOne({"departureAirport":"Cairo"})
//the collection if it doesn't exist it'll be created, just like the database
/**
 * you'll get this message after a successful operation
 * {
	"acknowledged" : true,
	"insertedId" : ObjectId("5d2201d60218ccc850db3ba6")
}

getting all the data in the collection
db.flightData.find()

we can chain method .pretty  to format it

mongodb adds objectid _id to each document you create



 */

///Json vs Bson
//bson is binary it's what's stored in the document,
//the drivers doest the converting
//it also supports other types, like for instance ObjectId,
//json doesn't understand ObjectId but bson does
//we will work with json though and leave the converting to the drivers

//in mongodb , two documents in the same collection doesn't have to have the same schema
//mongo will simply add what you throw at it
//we can add our own id, but we need to make sure it's unique
//so a good rule of thumb, just use the generated one
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////CRUD//////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//create using insertOne(data,options)
//create using insertMany(data,options)

//Read find() get all
//Read find({filter}) get matching
//Read findOne() get first matching it also can take a filter
db.flightData.find({distance:{$gt:1000}}) //find the flights with distance greater than 1000
//$gt is a query operator
//for more see operator

//find command gives you back a cursor and not all the data
//because it might be too big so it sends cursor object, it has meta data that can make you cycle through results and fetch the next data
//in shell use $it to get more 
//we can get all the data if we used a method like .toArray()
db.passengers.find().toArray()
//we can use forEach to loop through elements and do the coding you want
db.passengers.find().forEach((data)=>{printjson(data)})




//update 
updateOne({filter},data,options)
//update 
updateMany({filter},data,options)
//update 
update({filter},data,options)
//update 
replaceOne(filter,data,options)
db.flightData.updateOne({distance:12000},{$set{flag:"delete"}})//, if flag does exist, its value will change to delete, if it doesn't it will be added
//$set is an update operator, see 4.update operators.js
db.flightData.updateMany({},{$set:{flag:"toDelete"}}) //, passing an empty object{} as a filter makes you select all the documents
db.flightData.update({},{flag:"toDelete"}) //notice without hte operator

//difference between update and updateMany
//update will change the whole element to just {flag:"delete"}
//update will take the object and replace the current object with the new one, we can use $set with it to make it work like updateMany
//to replace use ReplaceOne() instead of using update()





//delete 
deleteOne(filter,options)
//delete 
deleteMany(filter,options)
//deleting all the data deleteMany() needs a filter, so we can updateMany for our documents to add a common field, then delete them
//or we can pass an empty object {} as a filter to delete all the documents in a collection



///projection
//projection is filtering on server(mongodb) not in memory
db.passengers.find({},{name:1}) //in the second parameter, we put all the fields we want to output, like name:1, 1 means include, 0 exclude, (only exclude _id)
//the above code will get you the name and _id, to exclude _id, db.passengers.find({},{name:1,_id:0 } ).pretty()



///embedded documents  (up to 100 level)
//adding a document within a document
//db.flightData.updateMany({},{$set:{status:{desc:"on time",lastUpdate:"an hour ago"}}})
/**
 * "_id" : ObjectId("5d22262dbf7bbbc3a2414e7e"),
	"departureAirport" : "LHR",
	"arrivalAirport" : "TXL",
	"aircraft" : "Airbus A320",
	"distance" : 950,
	"intercontinental" : false,
	"status" : {
		"desc" : "on time",
		"lastUpdate" : "an hour ago"
	}

 */

 ////////////Arrays of data
 //adding an array to passenger documents , not a nested document but a list 
 db.passengers.updateMany({},{$set:{hobbies:["3","2","1"]}})


///accessing structured data
//arrays
db.passengers.findOne().hobbies //this will get us the hobbies array
db.passengers.find({hobbies:"1"}) //this will look for passengers with hobbies array that include "1"
//objects
db.flightData.find({"status.desc":"on time"}) //when using . notation, we have to wrap it in "" like "status.desc" otherwise it will fail


/////////////dropping a whole collection 
db.flightData.drop()

