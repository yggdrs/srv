import { Server } from "colyseus"
import { monitor } from "@colyseus/monitor"
import express from 'express'
import { MapRoom } from "./rooms/MapRoom"

const app = express()

app.use('/mon',monitor())
app.use('/', express.static('./src/client'))

app.listen(8080)
const port = 3000

const gameServer = new Server()

const size = 16

for (let a = 0; a < size; a++) {
    for (let b = 0; b < size; b++) {
        gameServer.define(`map-${a}-${b}`, MapRoom, { map: `map-${a}-${b}`})
    }
}
gameServer.listen(port)
console.log(`[GameServer] Listening on Port: ${port}`)