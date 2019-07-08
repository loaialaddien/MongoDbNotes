//data schemas and modeling
//how to plan to store your data
// how to make sure it's stored like you want
//references and relations between collections
//schema validations

///////mongodb a schemaless database, it doesn't enforce a schema on your collection
//it will let you store whatever you want
//but your business model is probably going to require you to force a schema

//we have 3 basic models that we can follow

//anything is acceptable (any document can have whatever)
//a basic schema but can be extended (all documents have some basic input but some might have extra) (in  sql this extra data would be null here we'd just omit it)
//an enforced full equality(all documents have the same fields)

/////////////////////////////////////Data Types
/**
 * String − This is the most commonly used datatype to store the data. String in MongoDB must be UTF-8 valid.

Integer − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.

Boolean − This type is used to store a boolean (true/ false) value.

Double − This type is used to store floating point values.

Min/ Max keys − This type is used to compare a value against the lowest and highest BSON elements.

Arrays − This type is used to store arrays or list or multiple values into one key.

Timestamp − This can be handy for recording when a document has been modified or added.

Object − This datatype is used for embedded documents.

Null − This type is used to store a Null value.

Symbol − This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.

Date − This datatype is used to store the current date or time in UNIX time format. You can specify your own date time by creating object of Date and passing day, month, year into it.

Object ID − This datatype is used to store the document’s ID.

Binary data − This datatype is used to store binary data.

Code − This datatype is used to store JavaScript code into the document.

Regular expression − This datatype is used to store regular expression.
 */

//db.stats() gets you statistics about your data //shell method

///how to model

//which data does my app need               //fields and how they relate
//where do i need my data                   //gets the collections and groupings
//which kind of data do i want to display  //gets you the queries
//how often do you fetch your data         //optimize for easy fetching (duplicating)
//do you change your data a lot             //no duplication

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Relations///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//nested documents or References
/*nested {
username:"loai",
age:25,
address:{
    st:"sfdf",
    city:"fd"
}
}

or 
references 
{
    userId:1232323,
    favBooks:['id1','id2']
},{
    userId:111113,
    favBooks:['id3','id2']
},

or mixed save only the data you want and not the whole object 

*/
/**
 *                      one t o one relations
 * each document has a relation with another document, but each has one only (one document is associated with one and only one document in another collection)
 * each person has one id card , this id card can be stored
 * patient{
 * _id:fsdfsdfsf,
 * name:"lolo",
 * age:12,
 * patientHistory:"id123"
 *
 * }
 * patientHistory{
 * _id:"id123",
 * history:["flu"]
 * }
 * we can now access patient history from the id we get from the patient
 * but splitting here isn't utilizing the full might of mongodb
 * we can since it's one to one, embed the document in the patient
 *   patient{
 * _id:fsdfsdfsf,
 * name:"lolo",
 * age:12,
 *      patientHistory:{
 *
 *           history:["flu"]
 *      }
 *
 * }
 *
 
 */
/**
 * one to many relations
 * one document in a collection can be associated with one or more documents in another collection.
 *  For example, each customer can have many sales orders.
 * it can be made with references or with embedding documents
 */
/**
 * many to many
 * it's  a best practice to model many to many with references
 * A many-to-many relationship occurs when multiple documents in a table are associated with multiple document in another table. For example, a many-to-many relationship exists between customers and products
 */
