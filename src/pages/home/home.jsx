// 首页路由
import React, {Component} from "react";
import {Statistic, Card, DatePicker, Space} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import {Chart, Line, Point, Interval} from 'bizcharts';

const {RangePicker} = DatePicker;

export default class Home extends Component {
  render() {

    // 数据源
    const data = [
      {
        month: "Jan",
        city: "Tokyo",
        temperature: 7
      },
      {
        month: "Jan",
        city: "London",
        temperature: 3.9
      },
      {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9
      },
      {
        month: "Feb",
        city: "London",
        temperature: 4.2
      },
      {
        month: "Mar",
        city: "Tokyo",
        temperature: 9.5
      },
      {
        month: "Mar",
        city: "London",
        temperature: 5.7
      },
      {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5
      },
      {
        month: "Apr",
        city: "London",
        temperature: 8.5
      },
      {
        month: "May",
        city: "Tokyo",
        temperature: 18.4
      },
      {
        month: "May",
        city: "London",
        temperature: 11.9
      },
      {
        month: "Jun",
        city: "Tokyo",
        temperature: 21.5
      },
      {
        month: "Jun",
        city: "London",
        temperature: 15.2
      },
      {
        month: "Jul",
        city: "Tokyo",
        temperature: 25.2
      },
      {
        month: "Jul",
        city: "London",
        temperature: 17
      },
      {
        month: "Aug",
        city: "Tokyo",
        temperature: 26.5
      },
      {
        month: "Aug",
        city: "London",
        temperature: 16.6
      },
      {
        month: "Sep",
        city: "Tokyo",
        temperature: 23.3
      },
      {
        month: "Sep",
        city: "London",
        temperature: 14.2
      },
      {
        month: "Oct",
        city: "Tokyo",
        temperature: 18.3
      },
      {
        month: "Oct",
        city: "London",
        temperature: 10.3
      },
      {
        month: "Nov",
        city: "Tokyo",
        temperature: 13.9
      },
      {
        month: "Nov",
        city: "London",
        temperature: 6.6
      },
      {
        month: "Dec",
        city: "Tokyo",
        temperature: 9.6
      },
      {
        month: "Dec",
        city: "London",
        temperature: 4.8
      }
    ];

    const data2 = [
      {year: '1951 年', sales: 38},
      {year: '1952 年', sales: 52},
      {year: '1956 年', sales: 61},
      {year: '1957 年', sales: 45},
      {year: '1958 年', sales: 48},
      {year: '1959 年', sales: 38},
      {year: '1960 年', sales: 38},
      {year: '1962 年', sales: 38},
    ];

    return (
      <div>
        <Card title="商品总量" extra={<QuestionCircleOutlined/>} style={{width: 250}}>
          <Statistic value={1128163} suffix="个" style={{fontWeight: 'bolder'}}/>
          <Statistic value={15} valueStyle={{fontSize: 16}} prefix={'周同比'}
                     suffix={<div>%<ArrowDownOutlined style={{color: "red"}}/></div>}/>
          <Statistic value={10} valueStyle={{fontSize: 16}} prefix={'日同比'}
                     suffix={<div>%<ArrowUpOutlined style={{color: "green"}}/></div>}/>
        </Card>
        <Chart scale={{temperature: {min: 0}}} padding={[30, 20, 50, 40]} autoFit width={1250} height={320} data={data}>
          <Line shape="smooth" position="month*temperature" color="city" label="temperature"/>
          <Point position="month*temperature" color="city"/>
        </Chart>
        <Card title="访问量 销售量" extra={<Space direction="vertical" size={12}>
          <RangePicker/>
        </Space>}>
          <Card title="访问趋势" style={{width: 600}}>
            <Chart height={300} autoFit data={data2}>
              <Interval position="year*sales"/>
            </Chart>
          </Card>
        </Card>
      </div>
    )
  }
}