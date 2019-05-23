import React from 'react';
import './App.css';
import Person from './component/person';
import ChatBar from './component/ChatBar';
import SausageRoll from './component/sausage';

const walkInterval = 30;

let SAUSAGE_SEA = [];

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openChatBar: false,
      directionX: 0,
      directionY: 0,
      isJump: false,
      faceRight: true
    }
    this.interval = null;
    this.generateSausages();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.logKey);
    document.addEventListener('keyup', this.stop);
    this.interval = setInterval(this.intervalAction, 150);
  }


  componentWillUnmount() {
    document.removeEventListener('keydown', this.logKey);
    document.removeEventListener('keyup', this.stop);
    clearInterval(this.interval);

  }
  
  checkLocation(X,Y){
    return (
      (Y > window.innerHeight) ||
      (Y < 0) ||
      (X > window.innerWidth) ||
      (X < 0)
    )
  }

  intervalAction = () => {
    const {actionCode, isJump} = this.state;

    

    switch (actionCode) {
      case 'Space':
        if(!isJump) {
          this.setState(state=>({...state, isJump: true}));
          setTimeout(() => {
        
          this.setState(state=>({...state, isJump: false}));
          }, 1000);
        }
        break;
      case 'ArrowUp':
        if(this.checkLocation(this.state.directionX, this.state.directionY - walkInterval)) return;
        this.setState(state=>({...state, isMoving: true, directionY: this.state.directionY - walkInterval}));
        break;
      case 'ArrowDown':
          if(this.checkLocation(this.state.directionX, this.state.directionY + walkInterval)) return;
        this.setState(state=>({...state, isMoving: true, directionY: this.state.directionY + walkInterval}));
        break;
      case 'ArrowLeft':
          if(this.checkLocation(this.state.directionX - walkInterval , this.state.directionY )) return;
        this.setState(state=>({...state, isMoving: true, faceRight: false, directionX: this.state.directionX - walkInterval}));
        break;
      case 'ArrowRight':
        if(this.checkLocation(this.state.directionX + walkInterval , this.state.directionY)) return;
        this.setState(state=>({...state, isMoving: true, faceRight: true, directionX: this.state.directionX + walkInterval}));
        break;
      default:
        break;
    }

    const getIndex = SAUSAGE_SEA.findIndex(sausage => {

      return (
      (this.state.directionX >= (sausage.X)) &&
      (this.state.directionX <= (sausage.X + 50)) &&
      (this.state.directionY >= (sausage.Y)) &&
      (this.state.directionY <= (sausage.Y + 150)))
    });

    console.log("TCL: App -> intervalAction -> getIndex", getIndex)
    if(getIndex >= 0) {
      SAUSAGE_SEA.splice(getIndex, 1)
    }
  }

  stop = event => {
    this.setState(state=>({...state, isMoving: false, actionCode: ''}));
  }

  logKey = event => {
    const { code } = event;
    switch(code) {

      case 'Enter':
        this.setState(state=>({...state, openChatBar: !this.state.openChatBar}));
        break;
      default:
        return this.setState(state=>({...state, actionCode: code}));
    }
  }

  generateSausages = () => {

    for(let i = 0; i< 10; i++){
      const X = (Math.random() * window.innerWidth).toFixed(0);
      const Y = (Math.random() * window.innerHeight).toFixed(0);
      SAUSAGE_SEA.push(
        {
          id: i,
          X: parseInt(X),Y : parseInt(Y)
        }
      )
    }
  }

  renderSausages = () => {
    let items = [];

    SAUSAGE_SEA.forEach(item => (
      items.push(<SausageRoll key={`sausage_${item.id}`} positionX={item.X} positionY={item.Y}/>)
    ));
    return items;
  }

  render() {
    const { openChatBar, isMoving, directionX, directionY, isJump, faceRight } = this.state;

    return (
      <div className="play-ground">
        {this.renderSausages()}
        <Person isMoving={isMoving} faceRight={faceRight} isJump={isJump} directionX={directionX} directionY={directionY}/>
        <ChatBar open={openChatBar}/>
      </div>
    );
  }

}

export default App;
