import { Divider, Tag, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import project from '../../models/project';
import React, { PureComponent } from 'react';
import Formater from '@/components/Formater';
import SimpleTable from '@/components/SimpleTable';

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
  render: (str) => (<Formater type="dateFormat" target={str} args="YYYY-MM-DD"/>)
}, {
  title: '结束日期',
  key: 'DUE_DATE',
  dataIndex: 'DUE_DATE',
  formater: ['dateFormat','YYYY-MM-DD']
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


@connect(({ projectM }) => ({...projectM}))
class Hhh extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'projectM/fetchHeader',
    })
  }

  render() {
    const { headers } = this.props;
    return (<PageHeaderWrapper>
      <Card bordered={false}><SimpleTable columns={columns} dataSource={headers} /></Card>
      </PageHeaderWrapper>);
  }
}
  export default Hhh;