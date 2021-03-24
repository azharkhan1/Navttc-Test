import url from "../core";


import socketIOClient from "socket.io-client";
const ENDPOINT = url;
const socket = socketIOClient(ENDPOINT);
export default socket;