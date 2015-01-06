socket.io-promise [![build status](https://secure.travis-ci.org/lmjabreu/socket.io-wildcard.png)](http://travis-ci.org/lmjabreu/socket.io-wildcard) [![devDependency Status](https://david-dm.org/lmjabreu/socket.io-wildcard/dev-status.png)](https://david-dm.org/lmjabreu/socket.io-wildcard#info=devDependencies)
==================

Extends socket.io with a promise and wildcard event.
Thanks to Luis Abreu for the Fork from https://github.com/lmjabreu/socket.io-wildcard

Examples
=====

```js
var socketio = require( 'socket.io' ),
    socketioWildcard = require( 'socket.io-wildcard' ),
    io = socketioWildcard( socketio ).listen( 8000 );

io.sockets.on( 'connection', function onConnection ( socket ) {
  socket.on( '*', function onWildcard ( event ) {
    // > { name: 'cake', args: [ { 'is a lie': true }, 'another argument' ] }
    console.log( event );
  } );

  socket.emit( 'cake', { 'is a lie': true }, 'another argument' );
} );
```
