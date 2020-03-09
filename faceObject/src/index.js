class App {
  constructor(props) {
    this.state = props
  }
  getState() {
    console.log(this.state)
  }
}

let app = new App({el: 'app'})

app.getState()