import React from 'react';
import styled from "styled-components";
import {keyframes} from 'styled-components'

const roll = keyframes`
  0% {
    border-radius: 20px 10px 10px 20px;
  }

  50% {
    border-radius: 10px 20px 20px 10px;
  }

  100% {
    border-radius: 20px 10px 10px 20px;
    background-position: 20px;
  }
`

const SausageType = styled.span`
  position: absolute;
  background-image: radial-gradient(ellipse, rgba(30, 10, 0, 0.4) 0%, transparent 100%);
  background-color: #bc0b00;
  background-position: 0px;
  background-size: 20px 10px;
  width: 20px;
  min-width: 20px;
  height: 80px;
  top: ${props=>props.positionY + 23}px;
  left: ${props=>props.positionX}px;
  border-radius: 20px 10px 10px 20px;
  cursor: pointer;
  box-shadow: inset -2px 2px 2px 1px rgba(255, 180, 90, 0.5),
    inset -5px 4px 5px 1px rgba(255, 150, 90, 0.5),
    inset 2px -4px 8px 2px rgba(60, 0, 0, 0.2);
  animation: ${roll} 1s linear infinite;
  transition: 2s linear;
  cursor: inherit;
  pointer-events: none;
  z-index: 10;

  &::before {
    position: absolute;
    content: "";
    left: 8px;
    top: 78px;
    width: 4px;
    height: 30px;
    background-color: #c0af70;
    border-radius: 2px;
  }

  &::after {
    position: absolute;
    content: "";
    width: 4px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.2);
    left: 12px;
    top: 10px;
    border-radius: 50% 80% 100% 100%;
  }
`;

const Smoke = styled.span`
  & .particleBox {
    width: 50%;
    height: 50px;
    margin-top: -40px;
    filter: blur(7px) sepia();

    & .particle {
      box-shadow: 42px 27px 0 3px rgba(255, 255, 255, 0.2);
      animation-duration: 10s;

      &:nth-child(3n + 1) {
        box-shadow: -35px 23px 0 5px rgba(255, 255, 255, 0.3);
        animation-duration: 7s;
      }

      &:nth-child(3n + 2) {
        box-shadow: 15px -18px 0 2px rgba(255, 255, 255, 0.3);
        animation-duration: 6s;
      }
    }
  }

.particle {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 100%;

  &Box {
    width: 100%;
    height: 100%;
  }

  &Fire {
    height: 140px;
    margin-top: -20px;

    & .particle {
      border-radius: 0%;
      transform: rotate(45deg) scale(0.5);
      background-color: rgba(255, 150, 30, 0.7);
      border: 2px solid rgba(255, 100, 10, 0.5);
    }
  }
}

.particle1 {
  animation: particle1 5s ease-out infinite;
}

.particle2 {
  margin-left: -50%;
  margin-top: 2%;
  animation: particle1 5s ease-out -1s infinite;
}

.particle3 {
  margin-left: -15%;
  margin-top: -3%;
  animation: particle1 5s ease-out -2s infinite;
}

.particle4 {
  margin-left: 40%;
  margin-top: 3%;
  animation: particle1 5s ease-out -3s infinite;
}

.particle5 {
  margin-left: -5%;
  animation: particle1 5s ease-out -4s infinite;
}

.particle6 {
  margin-left: 5%;
  animation: particle1 5s ease-out -1.5s infinite;
}

.particle7 {
  margin-left: 10%;
  animation: particle1 5s ease-out -3.5s infinite;
}

.particle8 {
  margin-left: -10%;
  animation: particle1 5s ease-out -8s infinite;
}

@keyframes particle1 {
  0% {
    top: 100%;
    left: 45%;
    width: 0;
    height: 0;
    opacity: 0;
  }

  25% {
    left: 55%;
    width: 10px;
    height: 10px;
    opacity: 0.7;
  }

  50% {
    left: 45%;
    width: 10px;
    height: 10px;
    opacity: 0.5;
  }

  100% {
    top: 0%;
    left: 55%;
    width: 0;
    height: 0;
    opacity: 0;
  }
}
`;

class SausageRoll extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const {positionX = 0, positionY = 0} = this.props;

    return (
      <SausageType positionX={positionX} positionY={positionY}>
         <Smoke>
          <div className="particleBox">
            <div className="particle particle1"></div>
            <div className="particle particle2"></div>
            <div className="particle particle3"></div>
            <div className="particle particle4"></div>
            <div className="particle particle5"></div>
            <div className="particle particle6"></div>
            <div className="particle particle7"></div>
          </div>
        </Smoke>
      </SausageType>
    )
  }

}

export default SausageRoll;
