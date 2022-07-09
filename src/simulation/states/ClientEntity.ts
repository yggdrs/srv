import Entity from "./Entity";
import WorldState from "./WorldState";

export class ClientEntity extends Entity{
    constructor(id: string) {
        super(id)
        console.log("Client Entity", id, "created");
    }
}