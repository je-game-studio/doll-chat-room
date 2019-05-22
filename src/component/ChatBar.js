import React from 'react'
import classNames from 'classnames';

class ChatBar extends React.PureComponent {
  
  render() {
    const { open } = this.props;

    return(
      <div className={classNames("chat_bar",{"chat_bar_open": open})}>
        <textarea className="chat_area"/>
      </div>
    )
  }
}

export default ChatBar;