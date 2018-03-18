import { Router, Route, hashHistory } from 'react-router';

import BarDemo from './components/bar_demo';
import Hello from './components/hello';

export default class Root extends React.Component {
  render() {
    return (
      <div>
          <Router history={hashHistory}>
            <Route path="/" component={ Hello }></Route>
            <Route path="/bar" component={ BarDemo }></Route>
          </Router>
      </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));