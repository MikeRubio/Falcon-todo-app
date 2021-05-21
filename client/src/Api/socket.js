import sailsIOClient from "sails.io.js";
import socketIOClient from "socket.io-client";

const ios = sailsIOClient(socketIOClient);

ios.sails.autoConnect = true;
ios.sails.reconnection = true;
ios.sails.url = "http://localhost:1337";

export default ios;
