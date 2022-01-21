import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashBoard from './Components/DashBoard/DashBoard';
import LogIn from './Components/LoginComponent/LogIn';
import SignUp from './Components/LoginComponent/SignUp';
import { AuthenticationProvider } from './Contex/AuthenticationContext';
import PrivateRoute from './Components/Restrictions/PrivateRoute';

function App() {
   return (
      <Router>
         <AuthenticationProvider>
            <Switch>
               <Route exact path="/" component={SignUp} />
               <PrivateRoute  path="/Dashboard" component={DashBoard} />
               <Route path="/LogIn" component={LogIn} />
            </Switch>
         </AuthenticationProvider>
      </Router>
   );
}

export default App;
