///indexes
//if i want to search something in my database (products) using (productName), if productName isn't indexed
//mongodb will do a collection scan, which is mongo will go through the entire collection to fulfil this query, look at every single document and see if the productName matches the one i gave to it
//for very large collection this can take a while

//if i have an index,for the product name, which means that mongo will create an ordered list of all the values in the productName,
//it's not an ordered list of the document as a whole but just for the field that has the index, every document in that list has the productName and a pointer to the original document it belongs to
//now mongo will do an index scan instead of the collection scan, it'll go to the productName index, and it knows that the productName is sorted, so it'll skip part of the list prior to the one i want, this creates efficient, fast searches

//cavitates of Indexes
//indexes make for a fast update or search queries but it slows inserting
//because upon each insert request, it will update all the indexes in the touched collection
// you have to chose indexes carefully

/////////////////////////////
////in mongo there's an explain() method that's before your query
//this method works for update, delete, find methods
//
/**result of using explain() , we can use explain("executionStats") for more details about the time
 * {
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "contacts.contacts",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"dob.age" : {
				"$gt" : 60
			}
		},
		"winningPlan" : {
			"stage" : "PROJECTION",
			"transformBy" : {
				"name" : 1,
				"dob" : 1
			},
			"inputStage" : {
				"stage" : "COLLSCAN",
				"filter" : {
					"dob.age" : {
						"$gt" : 60
					}
				},
				"direction" : "forward"
			}
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "loai-e5450",
		"port" : 27017,
		"version" : "4.0.10",
		"gitVersion" : "c389e7f69f637f7a1ac3cc9fae843b635f20b766"
	},
	"ok" : 1

 */
/**
 * executionStats without index 
 * "executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1222,
		"executionTimeMillis" : 7,   //notice time
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 5000,
		"executionStages" : {

 */

//adding an index
//db.contacts.createIndex({"dob.age"}) //you can use either embedded fields of top level fields

//after creating the index, the time drops to 3 millieseconds
//now there'll be 2 excution stages (paths that mongo could have used to perform query)
//Index scan not projection

////DROPPING INDEX
//db.contacts.dropIndex("dob.age:1");
//if you have a query that will return a large portion of your documents, index will slow the process not fasten it

///creating compound indexes
//if you want to get males over certain age
//for this you can create a compound index
//it won't create two indexes
//another thing is the order matters when creating this index
//db.createIndex({"dob.age":1,gender:1}) //33 male 33 male 34 male 34 female
//db.createIndex({gender:1,"dob.age":1}) //male 33 male 33 male 34 female 34
//another thing about it, it can be used for the two values together also for the left value, since it's ordered in it too

//using indexes for sorting
//mongo can sort in the same way the index is sorted

///the default index
//db.contacts.getIndexes()  //gets all the indexes you have, there's by default an index on _id

//configuring indexes (guarantying uniqueness)
//db.contacts.createIndex({email:1},{unique:true}) //emails can't be duplicated

//////////partial indexing
/**if you want your index to work on a subset of data, where a condition happens
 *
 * def:
 * Partial indexes only index the documents in a collection that meet a specified filter expression.
 *  By indexing a subset of the documents in a collection,
 *  partial indexes have lower storage requirements and reduced performance costs for index creation and maintenance.
 */
db.restaurants.createIndex(
  { cuisine: 1, name: 1 },
  { partialFilterExpression: { rating: { $gt: 5 } } }
);
