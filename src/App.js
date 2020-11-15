import React from 'react';
import {Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIp";
import './App.css';


function App() {
  return (
    <div className="App">
            <Header/>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artist/:id" exact component={Artist}/>
                <Route path="/album/:id" component={Album}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route render={() => <h1>404</h1>}/>
            </Switch>
    </div>
  );
}

export default App;
