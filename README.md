# Live-Camera-IP-stream

We are trying to stream a http url using react.js, node.js w the url integrated into it.
We will create two folders,

1- Backend for the server side running (node.js) which will include files such as server.js and other json filess like package.json & package-lockjson. This folder will also include the uploads folder which will store the captured images from the stream. 

2- Frontend for displaying the camera stream. We have created a react app so all the jsx and html files will be stored here. Ive stored it in the CCTV folder and into it theres another src folder for all the app.jsx, main.jsx , CameraStream.jsx( as a component) and other css files (optional as not needed). The index.html file too as its the base. And the json files i.e. package-lock.jsoc and package.json which automatically gets created after creating an react app.

To manage cors error we are including proxy middleware and also installing cors.
multer for uploading files.
Axios for fetching URL data.
Tailwind for css
React for frontend
Node for backend.

At last, we need to split the terminal for the backend and frontend execution. 
and get into the Backend and CCTV folder using cd command.
and then we have to install the npm using "npm install"
and run the server using "node server.js" command and on the other terminal
and for the frontend exe we'll use the command "npm run dev" to run the frontend (App.jsx).

You must be able to see the stream working fine and after capturing the button, the live image will automatically be stored in uploads folder.

The Image will be in the jpg format whereas the stream is running in mjpg format.
