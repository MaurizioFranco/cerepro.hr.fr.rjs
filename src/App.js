import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';



import { HashRouter, Route, Switch } from "react-router-dom";

import MainView from "./components/MainView.js";
import LoginView from "./components/LoginView.js";
import SurveyView from './components/SurveyView';
import { setupIonicReact } from '@ionic/react';
import '@ionic/react/css/core.css';

setupIonicReact();


function App() {
  
  return (
        <HashRouter>
		    <Switch>
		       <Route path='/login' component={LoginView} />
			   <Route path="/survey" component={SurveyView}/>
		       <Route path="/" component={MainView}/>
		    </Switch>
            
		</HashRouter>
  );
}

export default App;
