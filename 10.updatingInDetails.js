//updating

//find the same way
//db.users.updateOne({filter},{update operators})
//$set :{fields that should be updated or added}, it doesn't override other fields
//the same can be done with updateMany()

//incrementing , decrementing values

//$inc :{age:1} //age should be incremented by 1
//use +/- number to either inc or decrement

///////////$min,$max,$mul
//updateOne({filter},{$min:{age:35}}) //if the existing value is lower than 35, age will be set to 35

//updateOne({filter},{$max:{age:35}}) // if age is larger than 35, it will get changed to 35, otherwise it will be ignored

//mul multiply , multiply the field with a value
//use upsert to update or insert if it doesn't exist {upsert:true} , as a third option to updateOne() method
//updating matched array elements
//if you want to update a document where a field match array element
//db.users.find({hobbies:{$elematch:{title:sport,frequency:{$gte:3}}})

//db.users.updateMany({hobbies:{$elematch:{title:sport,frequency:{$gte:3}}},{$set:{"hobbies.$":{the new things i want to update}}}) "hobbies.$" means the one that match my condition, if we don't use it we will override existing array, now we we will only update the fields we want

//if we want to add a new field to the elements that match the condition i can do it like this "hobbies.$.newField" : value

///updating all array elements
