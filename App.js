import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';

import Login from './components/Login/login';
import ForgotPassword from './components/PasswordManagement/forgotPassword';
import OwnerProfile from './components/Registration/OwnerProfile';
import { HomePage } from './components/HomePage/homePage';

import FormSubmissionSuccessful from './components/PasswordManagement/FormSubmissionSuccessful/formSubmissionSuccessful';
import SetNewPassword from './components/PasswordManagement/SetNewPassword/setNewPassword';
import ResetPassword from './components/PasswordManagement/ResetPassword/resetPassword';

function App() {
  const [checkToken] = useState(localStorage.getItem('Token'));
  const [validToken, setToken] = useState(false);
  if(checkToken) {
    var token = checkToken;
    fetch('https://integration2-hohc4oi-hq24q7rygokma.eu-5.magentosite.cloud/rest/V1/customers/me', { 
      method: 'get', 
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function(res) {
      return res.json();
     })
    .then(function(resJson) {
      if(resJson.id != null){
        setToken(true)
      }
     })

  }
  
  return (
    <div>
      <Router>
        <Switch>
          <Route path={'/'} exact component={validToken ? HomePage : Login} />
          <Route path={'/register'} exact component={OwnerProfile} />
          <Route path={'/showforgotPassword'} exact component={ForgotPassword} />
          <Route path={'/forgotPasswordSuccessful'} exact component={FormSubmissionSuccessful} />
          <Route path={'/forgotPassword'} exact component={SetNewPassword} />
          <Route path={'/homePage'} exact component={HomePage} />
          <Route path={'/resetPassword'} exact component={ResetPassword} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
