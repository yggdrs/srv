import WorldState from "./states/WorldState";
import Entity from "./states/Entity";
import { Client } from "colyseus";
import { Command } from "./commands/Command";
import { ClientEntity } from "./states/ClientEntity";

export class World<T extends WorldState> {

  private state: T
  private commandQueue: { id: string, message: string }[] = []

  execute(delta: number) {

    // this.commandQueue.forEach(c => this.getCommand(c.tp).run(this.state, delta, c))
    this.state.entities.forEach(e => {
      if ((e instanceof ClientEntity) === false) {
        const command = e.runLogic(this.state, delta)
        this.addEntityCommand(e, command)
      }
    })

    this.commandQueue.forEach(({ id, message }) => {
      this.state.entities.get(id).runCommand(this.state, message)
    })

    this.commandQueue = []

  }

  getCommand(tp: string | number): Command {
    throw new Error("Method not implemented.");
  }

  addClientCommand(client: Client, message: string) {
    const e = this.state.entities.get(client.sessionId)
    this.addEntityCommand(e, message)
  }

  addEntityCommand({ id }: Entity, message: string) {
    console.log("command:", {id, message} );
    
    this.commandQueue.push({ id, message })
  }

  removeClientEntity(client: Client, consented: boolean) {
    throw new Error("Method not implemented.");
  }

  useState(state: T) {
    this.state = state
  }

  addClientEntity(client: Client) {
    const entity = new ClientEntity(client.sessionId)
    this.addEntity(entity)
  }

  addEntity(entity: Entity) {
    this.state.entities.set(entity.id, entity)
  }

  stop() {
    throw new Error("Method not implemented.");
  }

}