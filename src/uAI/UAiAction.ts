export default class UAiAction<state> {

    private _action: string
    private _actions: UAiAction<state>[] = []
    private _scores: ((state:state) => number)[] = []
    private _condition: (state:state) => boolean = (s:state) => true
    private _description: string
  
    constructor(description: string) {
      this._description = description
    }
  
    set condition(condition: (state:state) => boolean) {
      this._condition = condition
    }
  
    set action(action: string) {
      this._action = action
    }
  
    addAction(action: UAiAction<state>) {
      this._actions.push(action)
    }
  
    addScore(score: (state:state) => number) {
      this._scores.push(score)
    }
  
    score(state: state, debug: boolean = false): number {
      let scr: number = -Infinity
      if(this._condition(state)) scr = this._scores.map(s => s(state)).reduce((a,b) => a+b)
      if(debug) console.log(`score of ${this._description} = ${scr}`);
      return scr
    }
    
    evaluate(state:state, debug: boolean = false): string {
      if(debug) console.log(`eval of ${this._description}`);
      let str = this._action ? this._action : this._actions.reduce((a, b) => {      
        if(a.score(state, debug) > b.score(state, debug)) return a
        return b
      }).evaluate(state, debug)
      if(debug) console.log(`eval result of ${this._description} is ${str}`);
      return str
    }
  }