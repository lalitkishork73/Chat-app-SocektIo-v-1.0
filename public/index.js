import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const btn = document.getElementById('submit');
const input = document.getElementById('input');
const list = document.getElementById('list-chats');
let date = new Date();
date.getHours()

const socket = io('http://localhost:3001');
socket.on('connection')
socket.on('message', data => {
    list.innerHTML += ` <li class="chatsleft"><p>${data}</p> <p class='chat-time'>${date.toLocaleTimeString().slice(0,5)}</p></li>`;
})

btn.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('message', input.value)
    list.innerHTML += `<li class="chatsright"><p>${input.value}</p><p class='chat-time'>${date.toLocaleTimeString().slice(0,5)}</p></li>`;
    input.value = ''

})

