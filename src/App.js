import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainView from "./components/MainView.js";
import LoginView from "./components/LoginView.js";


function App() {
  
  return (
    <div className="container-fluid">
        <BrowserRouter>
		    <Switch>
		       <Route path='/login' component={LoginView} />
		       <Route path="/" component={MainView}/>
		    </Switch>
            
		</BrowserRouter>
    </div>
  );
}

export default App;
