import React from 'react'

import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import EditarProducto from './components/EditarProducto';

//redux
import {Provider} from 'react-redux'
import store from './store'
import NuevoProductoV2 from './components/NuevoProductoV2';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route exact path="/productos/nuevo2" component={NuevoProductoV2} />
            <Route exact path="/productos/editar/:id" component={EditarProducto} />
          </Switch>
        </div>
      </Provider>
    </Router>
    );
}

export default App;
