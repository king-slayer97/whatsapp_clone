import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import {useSelector} from 'react-redux';

function App() {
  // const [user, setUser] = useState();
  const store = useSelector((store)=>{return store})
  console.log(store);
  const user = useSelector((store)=>{return store.user})
  return (
    <div className="app">
      {
        !user ? (
          <Login/>
        ) :
          (
            <div className="app__body">
              <Router>
                <Sidebar />
                <Switch>

                  <Route path="/rooms/:roomId">
                    <Chat />
                  </Route>
                  <Route path="/">
                    <Chat/>
                  </Route>
                </Switch>
              </Router>
            </div>
          )
      }
    </div>
  );
}

export default App;

