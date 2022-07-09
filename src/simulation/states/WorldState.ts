import { MapSchema, Schema, type } from "@colyseus/schema"
import Entity from "./Entity";

export default class WorldState extends Schema {
    @type({ map: Entity }) entities = new MapSchema<Entity>()
}