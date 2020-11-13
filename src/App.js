import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";
import './App.css';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artist/:id" exact component={Artist}/>
                <Route path="/album/:id" component={Album}/>
                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
