//methods, filters, operators
//query selectors
//projection operators
//

///////////////////////methods and filters and operators
//databas.mycollection.method({filter},)
//db.movies.find({year:2012}) equality
//db.movies.find({year:{$gt:2012}}) $gt is an operator greater than

///Read operators
//query selectors   //$gt   //locating data  (doesn't edit)
//projection operators //$  //(modify data presentation) selecting fields from the document you read

////////////////////////query selectors //see 4.2.query&projectionOperators

////////////reading
db.movies.findOne(); //first document
db.movies.find(); //find all documents

db.movies.findOne({}); //first document that fits the filter
db.movies.find({}); //find all documents that fits the filter

///////////////////////////////querying embedded fields and arrays
//querying using the . notation
db.movies.find({ "ratings.average": { $gt: 7 } }); //the . notation when used the key should be in ""

db.movies.find({ generes: "drama" }); //this is not exact equality, it will only get you the movies where genere include drama

db.movies.find({ generes: ["drama"] }); //strong equality

///////// $in , $nin

db.movies.find({ runtime: { $in: [50, 60] } }); //the runtime equal to 50 or 60
//nin, all values where the runtime is not

////////////////

//Logic operators

db.mycol
  .find({
    $and: [{ key1: value1 }, { key2: value2 }]
  })
  .pretty();

db.mycol
  .find({
    $or: [{ key1: value1 }, { key2: value2 }]
  })
  .pretty();
/////////and or together
//will show the documents that have likes greater than 10 and whose title is either 'MongoDB Overview' or by is 'tutorials point'.
db.mycol
  .find({
    likes: { $gt: 10 },
    $or: [{ by: "tutorials point" }, { title: "MongoDB Overview" }]
  })
  .pretty();

//elements operators
db.movies.find({ age: { $exists: true } }); //returns the documents where the age field exists
db.movies.find({ age: { $exists: true, $gt: 25 } }); //combining
db.movies.find({ age: { $exists: true, $ne: null } }); ///exists and not null
//type
//find documents where field's type equal to a type

/////////////////
///evaluation
//$regex  (try using text indexing)
///$expr //TODO

////////////////////querying arrays in depth

//we can use the . notation with arrays of embedded documents

$all; //means that the document should have all what comes next
$elemMatch; //if i write a query using $and, i can't gurantee that these results apply to each document
//if i need my two or more rules to apply to the same document to return, we use elematch

//cursor
//the find method returns a cursor, because we don't know how many result are going to be fetched
//and chances are we won't need all these data at the same time
//a cursor is pointer that stores the query and points to the next patch
//you fetch data document at a time
//in the shell we get 20 by default
//in our application using the driver we need to control that cursor manually
//cursor saves resources. because we get to choose how many we need to get each time
//
//applying cursor
//we get twenty document each time
db.movieData.find().next();
//we have .next() for find methods
//each time i use next(), the query is run again, this is different from saving the cursorDAta in a const
//const data = db.movieData.find()
//data,next() works now

//data.forEach(doc =>{ printjson(doc)}) // will cycle through the data we haven't fetched and print them, important note it will cycle through the ones we haven't fetched yet
//data.hasNext() ./returns true if it has next, false if it has been exhausted

//////////////////////////////////
/////////////sorting cursor results
/////////////////////////////////

const moviesCursorData = db.movies.find();
moviesCursorData.sort({ "rating.average": 1 }); //1 ascending, -1 descending
moviesCursorData.sort({ "rating.average": 1, runtime: 1 }); //multiple sorts

//////////skipping
/////helps with pagination
moviesCursorData.skip(10);
//limit() it will return the amount you specify, retrieving just the amount you want
// mongo will sort first then skip then limit, regardless of the order of the function calls

////////////shaping data (projection), getting the data we only want
//db.movies.find({},{name:1,genres:1,runtime:1,rating:1}).pretty()   // all the fields that i don't specify will get excluded, except for _id, we can explicitly exclude it _id:0

//projection with array data
//db.movies.find({genres:"Drama"},{"genres.$":1})  //this will only output the drama in genres
/**they probalby have other genres but i only projected these
 * { "_id" : ObjectId("5d232431ed4951c2ff642605"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("5d232431ed4951c2ff642606"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("5d232431ed4951c2ff642607"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("5d232431ed4951c2ff642609"), "genres" : [ "Drama" ] }
{ "_id" : ObjectId("5d232431ed4951c2ff64260a"), "genres" : [ "Drama" ] }

 */

//////////////////slice
//slice is a projection
db.movies.find({ "rating.average": { $gt: 9 } }, { generes: { $slice: 2 } }); //slice will only get me the first two elements of genres , it works like slice in JS

//
