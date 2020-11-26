import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header/Header";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIp";
import History from "./containers/History/History";
import AddAlbum from "./containers/AddAlbum/AddAlbum";
import AddArtist from "./containers/AddArtist/AddArtist";
import AddTrack from "./containers/AddTrack/AddTrack";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/signin" />
};

function App() {
    const user = useSelector(state => state.users.user);
  return (
    <div className="App">
            <Header/>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artist/:id" exact component={Artist}/>
                <Route path="/album/:id" component={Album}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/signin" exact component={SignIn}/>
                <ProtectedRoute
                    path="/addartist"
                    exact
                    component={AddArtist}
                    isAllowed={user && user.user.role === "user"}
                />
                <ProtectedRoute
                    path="/addalbum"
                    exact
                    component={AddAlbum}
                    isAllowed={user && user.user.role === "user"}
                />
                <ProtectedRoute
                    path="/addtrack"
                    exact
                    component={AddTrack}
                    isAllowed={user && user.user.role === "user"}
                />
                <Route path="/history" exact component={History}/>
                <Route render={() => <h1>404</h1>}/>
            </Switch>
    </div>
  );
}

export default App;
