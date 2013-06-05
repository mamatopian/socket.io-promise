module.exports = function ( socketio ) {
  // Add support for wilcard event
  socketio.Manager.prototype.onClientMessage = function onClientMessage ( id, packet ) {
    if ( this.namespaces[ packet.endpoint ] ) {
      this.namespaces[ packet.endpoint ].handlePacket( id, packet );
      // BEGIN: Wildcard patch
      packet2 = JSON.parse( JSON.stringify( packet ) );
      packet2.name = '*';
      if ( packet2.args instanceof Array ) {
        packet2.args.push( packet.name );
      } else {
        packet2.args = [ packet2.args, packet.name ];
      }
 
      this.namespaces[ packet.endpoint ].handlePacket( id, packet2 );
      // END: Wildcard patch
    }
  };
 
  return socketio;
};
