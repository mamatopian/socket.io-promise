socket.io-promise
==================

Extends socket.io with a promised event. Very useful when you need reply from
socket.io clients within specified time. After specified timeout socket will automaticaly
unbind 'pong' event handler.

Examples
=====

Example 1.
===

```js
var socketio = require( 'socket.io' ),
    socketiosocket = require( 'socket.io/lib/socket' ),
    promise = require( 'promise' )(socketiosocket);

io.sockets.on( 'connection', function ( socket ) {
  socket.giveme( 'pong', function ( pongMessage ) {
    // > { status: 'im still alive or my timeout expired!' }
    console.log( pongMessage );
  }, 1000 );
} );
```

Example 2.
===

```js
var sockets = [];
var results = {};
var checkResults = function ( result, socket ){
// result = empty if client reached given timeout and did not respond
    var len = sockets.length;
    results[result.fileToRead].push(result);
    if( results.length == len )
    {   
        checkAllResults( results );
    }
};

io.sockets.on('connection', function ( socket ) {
    sockets.push( socket );
} );

...

// I need to compute specific task, which can fail on some clients,
// in that case Im getting an empty object in callback
for(var x = 0; x < sockets.length ; x++)
{
    sockets[x].giveme('contentOfFile', checkResults, '/etc/passwd', 10000);
}

```