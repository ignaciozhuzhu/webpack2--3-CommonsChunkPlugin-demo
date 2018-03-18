import { hashHistory } from 'react-router';

export default class Component extends React.Component {
  initData() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init($('#main')[0]);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '标题'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  componentDidMount() {
    this.initData()
  }
  render() {
    return (
      <div>
        <div className="link" onClick={()=>hashHistory.push('')}>跳转</div>
    		<div id="main" className="shadow" style={{height:'520px',background:'white'}}></div>
      </div>
    )
  }
}