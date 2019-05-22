import React from 'react';
import './App.css';
import Person from './component/person';
import ChatBar from './component/ChatBar';

const walkInterval = 40;
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
  }

  componentDidMount() {
    document.addEventListener('keydown', this.logKey);
    document.addEventListener('keyup', this.stop);
    this.interval = setInterval(this.intervalAction, 200);

  }


  componentWillUnmount() {
    document.removeEventListener('keydown', this.logKey);
    document.removeEventListener('keyup', this.stop);
    clearInterval(this.interval);

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
        this.setState(state=>({...state, isMoving: true, directionY: this.state.directionY - walkInterval}));
        break;
      case 'ArrowDown':
        this.setState(state=>({...state, isMoving: true, directionY: this.state.directionY + walkInterval}));
        break;
      case 'ArrowLeft':
        this.setState(state=>({...state, isMoving: true, faceRight: false, directionX: this.state.directionX - walkInterval}));
        break;
      case 'ArrowRight':
        this.setState(state=>({...state, isMoving: true, faceRight: true, directionX: this.state.directionX + walkInterval}));
        break;
      default:
        break;
    }

  }

  stop = event => {
    this.setState(state=>({...state, isMoving: false, actionCode: ''}));
  }

  logKey = event => {
    const { code } = event;
    console.log("TCL: App -> key", code);
    switch(code) {

      case 'Enter':
        this.setState(state=>({...state, openChatBar: !this.state.openChatBar}));
        break;
      default:
        return this.setState(state=>({...state, actionCode: code}));
    }
    
  }

  render() {
    const { openChatBar, isMoving, directionX, directionY, isJump, faceRight } = this.state;

    return (
      <div className="play-ground">
        <Person isMoving={isMoving} faceRight={faceRight} isJump={isJump} directionX={directionX} directionY={directionY}/>
        <ChatBar open={openChatBar}/>
      </div>
    );
  }

}

export default App;
