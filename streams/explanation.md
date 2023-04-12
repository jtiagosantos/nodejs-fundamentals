## What is strems?

Streams is send/receive data piece by piece until sending all the data. Each piece we called "chunks"

* Readable Streams 
  - Send chunks from client to server (read data)
  - Just Read data
  
* Writable Streams 
  - Send chunks from server to client (process data)
  - Just process data
  
* Tranform Streams 
  - Read data from a stream and send data to another stream
  - Duplex Stream -> it can make two operations: read/send data
  - Usually it's used to communicate two other streams