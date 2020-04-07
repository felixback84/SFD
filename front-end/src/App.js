import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';

// pages
import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import myWorldDevices from './pages/myWorldDevices';
import myWorldAdventures from './pages/myWorldAdventures';
import storeDevices from './pages/storeDevices';
import storeAdventures from './pages/storeAdventures';
import device from './pages/device';
import deviceDataSets from './pages/deviceDataSets';
import notificationsDevices from './pages/notificationsDevices';
import notificationsAdventures from './pages/notificationsAdventures';
import profile from './pages/profile';
import addCart from './pages/addCart';
import buys from './pages/buys';

// jwt 
import jwtDecode from 'jwt-decode';
// redux 
import { Provider } from 'react-redux';
import store from './redux/store';
// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://us-central1-sfdd-d8a16.cloudfunctions.net/api';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          
          <div className="container">
            <Switch>
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/" component={home} />
              {/* auth paths */}
              <Route exact path="/myworld/devices" component={myWorldDevices} />
              <Route exact path="/myworld/adventures" component={myWorldAdventures} />
              <Route exact path="/store/devices" component={storeDevices} />
              <Route exact path="/store/adventures" component={storeAdventures} />
              <Route exact path="/device" component={device} />
              <Route exact path="/device/datasets" component={deviceDataSets} />
              <Route exact path="/notifications/devices" component={notificationsDevices} />
              <Route exact path="/notifications/adventures" component={notificationsAdventures} />
              <Route exact path="/profile" component={profile} />
              <Route exact path="/addcart" component={addCart} />
              <Route exact path="/buys" component={buys} />
            </Switch>
          </div>
          <Navbar/>
        </Router>
      </div>
    )
  }
}

export default App;

