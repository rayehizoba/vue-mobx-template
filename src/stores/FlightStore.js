import { observable, action } from 'mobx';


export default class FlightStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @action
  searchFlights() {
    
  }
}