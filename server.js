const express = require("express");
const helmet = require("helmet");
const server = express();
const cors = require('cors');

const routeAction = require('./Routes/actionRoute');
const routeProject = require('./Routes/projectRoute');



server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/project', routeProject);
server.use('/api/action', routeAction);

server.get('/', (req, res) => {
    res.send('Server is Up');
});

server.listen(5000, () => {
    console.log('server listening on port 5000');
  });