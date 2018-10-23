import React from 'react';
import '../styles/App.scss';
import Preview from './Preview';
import ChatRoom from './ChatRoom';

class App extends React.Component {

  render() {
    return (
      <div className="app">

        <h2>Chat App</h2>

       <div className="app__rooms">
         <Preview />
       </div>

       <div className="app__room">
         <ChatRoom />
       </div>

      </div>
    );
  }
}

export default App;
