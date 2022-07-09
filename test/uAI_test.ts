import assert from "assert";
import UAiAction from "../src/uAI/UAiAction"


describe("testing UAiAction", () => {



  it("UAiAction", async () => {
    type stt = {
      a: number
    }
    
    let ac2 = new UAiAction<stt>('ac2')
    ac2.condition = (state) => {
      return true
    }
    ac2.addScore((state) => {
      return 10
    })
    ac2.addScore((state) => {
      return 20
    })
    ac2.action = 'ac2 Fim'

    let ac3 = new UAiAction<stt>('ac3')
    ac3.condition = (state) => {
      return false
    }
    ac3.addScore((state) => {
      return 10
    })
    ac3.addScore((state) => {
      return 100
    })
    ac3.action = 'ac3 Fim'


    let act = new UAiAction<stt>('act')
    act.addAction(ac2)
    act.addAction(ac3)

    console.log(act.evaluate({a:2}, true));
    
  })
 

});