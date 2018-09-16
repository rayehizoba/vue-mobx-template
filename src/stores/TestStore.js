import {observable, action} from 'mobx'

class Test {
  @observable
  count = 0

  @action.bound
  changeCount(){
    ++this.count
  }
}

const test = new Test()
export default test