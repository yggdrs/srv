import { type } from "@colyseus/schema";
import WorldState from "./WorldState";

export class MapRoomState extends WorldState {

  @type("string") mySynchronizedProperty: string = "Hello world";

}
