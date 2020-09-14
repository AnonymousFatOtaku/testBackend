// 柱形图路由
import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量
    inventorys: [15, 30, 46, 20, 20, 40] // 库存
  }

  getOption = () => {
    const {sales, inventorys} = this.state
    return {
      title: {
        text: '销量-库存柱形图'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: inventorys
      }]
    }
  }

  // 每点击一次更新销量加一库存减一
  update = () => {
    const sales = this.state.sales.map(sale => sale + 1)
    const inventorys = this.state.inventorys.map(inventory => inventory - 1)
    this.setState({
      sales,
      inventorys
    })
  }

  render() {
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>
        <Card title='ECharts柱形图'>
          <ReactEcharts option={this.getOption()} style={{height: 550}}/>
        </Card>
      </div>
    )
  }
}