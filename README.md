socket.io-promise  [
==================

Extends socket.io with a promised event.

Examples
=====

server.js

```js
var socketio = require( 'socket.io' ),
    socketiosocket = require( 'socket.io/lib/socket' ),
    promise = require( 'promise' )(socketiosocket);

io.sockets.on( 'connection', function onConnection ( socket ) {
  socket.givePromise( 'pong', function ( pongMessage ) {
    // > { status: 'im still alive or my timeout expired!' }
    console.log( pongMessage );
  }, 1000 );
} );
```
