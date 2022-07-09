import { Schema, type } from "@colyseus/schema";
import UAiAction from "../../uAI/UAiAction";
import { World } from "../World";
import WorldState from "./WorldState";

export default class Entity extends Schema {


    @type("string") id: string = '123';

    private _ai: UAiAction<WorldState>

    constructor(id: string) {
        super()
        this.id = id
    }

    set ai(ai: UAiAction<WorldState>) {
        this._ai = ai
    }

    runCommand(state: WorldState, message: string) {
        console.log(this, "running: ", message);
        
    }

    runLogic(state: WorldState, delta: number): string {
        return this._ai.evaluate(state)
    }

}