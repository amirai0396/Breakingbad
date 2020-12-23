import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homescreen from './screens/homescreen/homescreen';
import Profile from './screens/profile/profile';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <Router>
      <Route path='/:id' component={Profile} />

      <Route path='/' component={Homescreen} exact />
    </Router>
  );
}

export default App;
