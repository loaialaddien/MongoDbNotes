////diving a little bit deeper in shell
//start mongodb as a process or a service
//configuring mongodb server
//fix issues

//https://docs.mongodb.com/manual/mongo/

//starting a new server with $ sudo mongod
///                          $ sudo mongod --port  to change the default port
///                          $ sudo mongod --help  to get all the commands
///                          $ sudo mongod --logpath where the logs are going to be written
///                          $ sudo mongod --dbpath where the database files are going to be set
///                          $ sudo mongod --dbpath the path you want, now you'll have a new place for your database
///                          $ sudo mongod --fork --logpath
/*when using --fork you have to use --logpath 
this will run mongo as a service 
it'll work in the background
this is why i have to logpath because it can't log to the front screen

//mongo db config file, where you store configuration
//to tell mongo to use it  $ sudo mongod --config the path to config file 

*/
//starting mongo shell       $ mongo
//for help                  $ mongo --help
//
