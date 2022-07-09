import WorldState from "../states/WorldState";
import { CommandMessage } from "../World";

export class Command {
  run(state: WorldState, delta: number, {}): void {
    throw new Error("Method not implemented.");
  }
}