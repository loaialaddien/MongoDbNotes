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
 * 
 *          embedding 
 * {
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   publisher: {
              name: "O'Reilly Media",
              founded: 1980,
              location: "CA"
            }
}
                references 
                {
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   publisher_id: "oreilly"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",
   publisher_id: "oreilly"
}
 */
/**
 * many to many
 * it's  a best practice to model many to many with references but sometimes embedding is better (for instance if you ordered something and already paid for it, then its price changed, in reference world, the new price will appear which is not what you paid, in a embedded world, the actual price will be the one)
 * A many-to-many relationship occurs when multiple documents in a collection are associated with multiple documents in another collection. For example, a many-to-many relationship exists between customers and products
 *
 */
/**
 * we can use an approach that mixes references and embedding
 * like embedding just the data we want and adding a reference to it
 *
 */

///////////////////////////joining with $lookup
/**
 * Performs a left outer join to an unsharded collection in the same database to filter in documents from the “joined” collection for processing.
 *  To each input document, the $lookup stage adds a new array field whose elements are the matching documents from the “joined” collection.
 *  The $lookup stage passes these reshaped documents to the next stage.
 db.orders.insert([
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }
])

db.inventory.insert([
   { "_id" : 1, "sku" : "almonds", description: "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", description: "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", description: "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", description: "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, description: "Incomplete" },
   { "_id" : 6 }
])
 
 db.orders.aggregate([
   {
     $lookup:
       {
         from: "inventory",   
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
])
results 
{
   "_id" : 1,
   "item" : "almonds",
   "price" : 12,
   "quantity" : 2,
   "inventory_docs" : [
      { "_id" : 1, "sku" : "almonds", "description" : "product 1", "instock" : 120 }
   ]
}
{
   "_id" : 2,
   "item" : "pecans",
   "price" : 20,
   "quantity" : 1,
   "inventory_docs" : [
      { "_id" : 4, "sku" : "pecans", "description" : "product 4", "instock" : 70 }
   ]
}
{
   "_id" : 3,
   "inventory_docs" : [
      { "_id" : 5, "sku" : null, "description" : "Incomplete" },
      { "_id" : 6 }
   ]
}

 */

/**
  * schema validation  https://docs.mongodb.com/manual/core/schema-validation/index.html
  * mongodb is totally flexible, but you might want to enforce it for your business need
  * when you try to add or update, and you have a schema, the schema will then either accept or reject your input based on the rules in the schema
  * in the schema you can set which documents you want to validate and the rules and also what to do if validation fails 
  * you can also set the validation mode to either strict (all inserts and updates), moderate(all inserts and updates after the schema is enforced (old won't be affected))
  * for validation if the validation fails you can either throw error or warn and log but proceed
  * /**validationLevel option, which determines how strictly MongoDB applies validation rules to existing documents during an update, and
validationAction option, which determines whether MongoDB should error and reject documents that violate the validation rules or warn about the violations in the log but allow invalid documents.
  *  
  * 
  *         adding a collection validation 
  * 
  * To specify validation rules when creating a new collection, use db.createCollection() with the validator option.
  * To add document validation to an existing collection, use collMod command with the validator option.


  db.createCollection("students", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "year", "major", "gpa", "address.city", "address.street" ],
         properties: {
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            gender: {
               bsonType: "string",
               description: "must be a string and is not required"
            },
            year: {
               bsonType: "int",
               minimum: 2017,
               maximum: 3017,
               exclusiveMaximum: false,
               description: "must be an integer in [ 2017, 3017 ] and is required"
            },
            major: {
               enum: [ "Math", "English", "Computer Science", "History", null ],
               description: "can only be one of the enum values and is required"
            },
            gpa: {
               bsonType: [ "double" ],
               minimum: 0,
               description: "must be a double and is required"
            },
            "address.city" : {
               bsonType: "string",
               description: "must be a string and is required"
            },
            "address.street" : {
               bsonType: "string",
               description: "must be a string and is required"
            }
         }
      }
   }
})
//////
/////////////to add a validation for an existing collection OR changing existing one 
db.runCommand( {                //runCommand is used for adminstrative command
   collMod: "contacts",
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "phone", "name" ],
      properties: {
         phone: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         name: {
            bsonType: "string",
            description: "must be a string and is required"
         }
      }
   } },
   validationLevel: "moderate"
} )
  */
