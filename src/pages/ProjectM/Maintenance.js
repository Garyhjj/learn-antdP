import { Table, Divider, Tag, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import project from '../../models/project';
import React, { PureComponent } from 'react';

const columns = [{
  title: '编号',
  dataIndex: 'CODE',
  key: 'CODE',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '项目名称',
  dataIndex: 'NAME',
  key: 'NAME',
}, {
  title: '开始日期',
  dataIndex: 'START_DATE',
  key: 'START_DATE',
}, {
  title: '结束日期',
  key: 'DUE_DATE',
  dataIndex: 'DUE_DATE',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

function mapDataForTable(data) {
  return data.map((l) => {
    l.key = l.ID || ~~(Math.random() * 10000);
    return l;
  })
}

@connect(({ projectM }) => ({...projectM}))
class Hhh extends PureComponent {
  componentWillMount() {
    this.state = this.state || {};
    this.state.headers = mapDataForTable(this.props.headers);
  }
  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'projectM/fetchHeader',
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props,nextProps)
    if (this.props.headers !== nextProps.headers) {
      this.setHeaderData(nextProps.headers)
    }
  }

  setHeaderData(data) {
    this.setState({headers:mapDataForTable(data)});
  }
  render() {
    const { headers } = this.props;
    console.log(headers);
    return (<PageHeaderWrapper>
      <Card bordered={false}><Table columns={columns} dataSource={headers} /></Card>
      </PageHeaderWrapper>);
  }
}
  export default Hhh;