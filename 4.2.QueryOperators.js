/**
 * Query Selectors
Comparison
For comparison of different BSON type values, see the specified BSON comparison order.

Name	Description
$eq	        Matches values that are equal to a specified value.
$gt	        Matches values that are greater than a specified value.
$gte        Matches values that are greater than or equal to a specified value.
$in	        Matches any of the values specified in an array.
$lt	        Matches values that are less than a specified value.
$lte	    Matches values that are less than or equal to a specified value.
$ne	        Matches all values that are not equal to a specified value.
$nin	    Matches none of the values specified in an array.


Logical
Name	Description
$and	Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
$not	Inverts the effect of a query expression and returns documents that do not match the query expression.
$nor	Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
$or	    Joins query clauses with a logical OR returns all documents that match the conditions of either clause.

Projection Operators
Name	    Description
$	        Projects the first element in an array that matches the query condition.
$elemMatch	Projects the first element in an array that matches the specified $elemMatch condition.
$meta	    Projects the document’s score assigned during $text operation.
$slice	    Limits the number of elements projected from an array. Supports skip and limit slices.


Element
Name	Description
$exists	Matches documents that have the specified field.
$type	Selects documents if a field is of the specified type.


Evaluation
Name	        Description
$expr	        Allows use of aggregation expressions within the query language.
$jsonSchema	    Validate documents against the given JSON Schema.
$mod	        Performs a modulo operation on the value of a field and selects documents with a specified result.
$regex	        Selects documents where values match a specified regular expression.
$text	        Performs text search.
$where	        Matches documents that satisfy a JavaScript expression.


Array
Name	Description
$all	Matches arrays that contain all elements specified in the query.
$elemMatch	Selects documents if element in the array field matches all the specified $elemMatch conditions.
$size	Selects documents if the array field is a specified size.


Bitwise
Name	Description
$bitsAllClear	Matches numeric or binary values in which a set of bit positions all have a value of 0.
$bitsAllSet	Matches numeric or binary values in which a set of bit positions all have a value of 1.
$bitsAnyClear	Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.
$bitsAnySet	Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.
Comments


Name	Description
$comment	Adds a comment to a query predicate.



 */
