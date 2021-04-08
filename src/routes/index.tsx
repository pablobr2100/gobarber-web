import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignInProvider from '../pages/SignInProvider';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import ProfileProvider from '../pages/ProfileProvider';
import Dashboard from '../pages/Dashboard';
import DashboardProvider from '../pages/DashboardProvider';
import CreateAppointment from '../pages/CreateAppointment';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signin-provider" exact component={SignInProvider} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/profile-provider" component={ProfileProvider} isPrivate />

    <Route path="/dashboard-provider" component={DashboardProvider} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/create-appointment" component={CreateAppointment} isPrivate />
  </Switch>
);

export default Routes;
