import { Room, Client } from "colyseus";
import { World } from "../simulation/World";
import { MapRoomState } from "../simulation/states/MapRoomState";

export class MapRoom extends Room<MapRoomState> {

  private world = new World<MapRoomState>()

  async onCreate (options: any) {
    this.setState(new MapRoomState());
    this.maxClients = 32

    this.world.useState(this.state)

    this.setSimulationInterval(async (delta) => {
      this.world.execute(delta)
    }, 1000/10)

    this.onMessage<string>('*', (client, tp, message) => {
      this.world.addClientCommand(client, message)
    })
  }

  // onAuth(client: Client, options: any, request?: IncomingMessage) {
  //   client.userData = getUserData(client.auth)
  // }

  async onJoin (client: Client, options: any) {
    this.world.addClientEntity(client)
  }

  onLeave (client: Client, consented: boolean) {
    this.world.removeClientEntity(client, consented)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
    this.world.stop()
  }   

}
