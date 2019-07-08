//application  (frontend UI, backEnd, drivers for different language)
//data layer   (mongodb)

//drivers send queries and add data commands to the  server , and it forwards it to the storage engine who then stores it
/**
 * The storage engine is the component of the database that is responsible for managing how data is stored,
 *  both in memory and on disk. MongoDB supports multiple storage engines,
➤ WiredTiger Storage Engine (Default)
WiredTiger is the default storage engine starting in MongoDB 3.2. 
It is well-suited for most workloads and is recommended for new deployments.
 WiredTiger provides a document-level concurrency model, checkpointing, and compression, among other features.
 */

//we can user mongodb shell instead of the drivers , other uses for the shell is the adminstration

//in the data layer  storage engine can work  the file system or with the memory (much faster) to Read and write data
//the engine loads data in memory and manages this data from there, or writes in memory then store it in the file system
