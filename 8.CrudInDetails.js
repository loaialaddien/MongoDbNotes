///Create
///how to create
///how to import data
/// insertOne() single document
//insertMany([]) array
//insert() either single or array (use the above methods)

//mongoimport   for importing data

///////////////working with ordered inserts
//an ordered insert means that when you insertMany([]), each one will be processed alone, so if one fails, it'll cancel the entier operation but it won't roll back
//this means that if you add 3 documents using insertMany() and some error happens adding item number 2, item 1 will be added and 2 and 3 won't
//this might not be what wanted
//for these cases we can path an argument to insertMany([],{ordered:false}) ''it's true by default
//now if it fails in 1 or 2, the other documents will be added
/////////important/////////////////////////for rolling back, use transactions

////write concern options used with insert methods
//https://docs.mongodb.com/manual/reference/write-concern/index.html
//Write concern describes the level of acknowledgment requested from MongoDB for write operations
//{ w: <value>, j: <boolean>, wtimeout: <number> } w:1,j:false is the default , 1 means you get acknowledged for writing, false means no writing in to do journal
/**
 * the w option to request acknowledgment that the write operation has propagated to a specified number of mongod instances or to mongod instances with specified tags.
    the j option to request acknowledgment that the write operation has been written to the on-disk journal, and
    the wtimeout option to specify a time limit to prevent write operations from blocking indefinitely.
 */
//db.users.insertOne({name:"ss",age:12},{writeConcern:{w:1,j:true}})

///////////////////////atomicity
//In MongoDB, a write operation is atomic on the level of a single document, even if the operation modifies multiple embedded documents within a single document.
//atomic means that if you're adding a document and while adding this document an error occurs, it'll roll back
//either the write succeeds as a whole or fails as awhole
//if you're using insertMany you'll get this but at a document level not the whole collection (see transaction for more on how to roll back from multiple)

//////////////////////////////////////////////////////importing data
//https://docs.mongodb.com/manual/reference/program/mongoimport/index.html
//you need to be in the same directory as the file you want to add, in the terminal not in the shell
//mongoimport --db users --collection contacts --file contacts.json
// you can also add some modifiers --drop   if the collection already exists, drop it then import, without this command it will append
///                                --jsonArray to tell it that the file is array of documents not one document
//
