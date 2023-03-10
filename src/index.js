import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import cors from 'cors'
import { Server } from "socket.io";
import http from "http";
import { fileURLToPath } from 'url';



const app = express();
const server = http.createServer(app);
const PORT = 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cors());
const io = new Server().listen(server);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

io.on("connection", (socket) => {
    console.log("connected", socket.id)
    socket.on('message', data => {
        socket.broadcast.emit('message', data);
    })

})



server.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
