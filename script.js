class Stopwatch extends React.Component {
    render() {
      return (
      <div className="container">
        <nav className="controls">
        <a href="#" className="button" id="start" onClick={this.start}>Start</a>
      <a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
      <a href="#" className="button" id="reset" onClick={this.reset}>Reset</a>
      <a href="#" className="button" id="save" onClick={this.save}>Zapisz</a>
      <a href="#" className="button" id="clear" onClick={this.clear}>Czyść</a>
        </nav>
        <div className="stopwatch">
         {this.state.display}
        </div>
        <div className="container">
    <p className="title">Lista czasów</p>
    <div className="times">
    {this.state.results.map((result, i) => <p key={i}>{result}</p>)}
    </div>
    </div>
      </div>);
    }
    
    constructor() {
      super()
      this.running = false;
      this.state = {
        display: '',
        results: []
      }
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)
      this.reset = this.reset.bind(this)
      this.save = this.save.bind(this)
      this.clear = this.clear.bind(this)
    }
  
  
    clear(){
        this.setState({
            results: []
          })
    }
  
    save(){
        this.setState(state => ({ results: state.results.concat(state.display) }) )
    }
    
    reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
      this.stop();
    }
    
    print() {
      this.setState({
        display: this.format(this.times)
      })
    }
    
    format(times) {
      return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    
    start() {
      if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
      }
    }
  
    stop() {
      this.running = false;
      clearInterval(this.watch);
    }
    
    step() {
      this.calculate();
      this.print();
    }
    
    calculate() {
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }
  }
  
  function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }
  
  ReactDOM.render(<Stopwatch />, document.getElementById('app'));