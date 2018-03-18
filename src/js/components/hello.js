import { hashHistory } from 'react-router';

export default class Component extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <div className="link" onClick={()=>hashHistory.push('bar')}>跳转</div>
    		<h1>Hello</h1>
      </div>
    )
  }
}