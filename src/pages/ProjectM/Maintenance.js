import { Divider, Tag, Card, Badge, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import project from '../../models/project';
import React, { PureComponent } from 'react';
import Formater from '@/components/Formater';
import SimpleTable from '@/components/SimpleTable';
import ProjectHeader from '@/components/ProjectM/ProjectHeader';
import ProjectPeople from '@/components/ProjectM/ProjectPeople';
import ProjectLine from '@/components/ProjectM/ProjectLine';
import * as moment from 'moment';

const TabPane = Tabs.TabPane;

const tabList = [{
  key: 'people',
  tab: '项目人员',
}, {
  key: 'lines',
  tab: '任务维护',
}];


@connect(({ projectM }) => ({ ...projectM }))
class Hhh extends PureComponent {
  state = {
    tabKey: 'people',
    noTitleKey: 'app',
    selectID: 0
  }
  onTabChange = (tabKey) => {
    this.setState({ tabKey });
  }
  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'projectM/fetchHeader',
    })
  }

  alterHeader = (data) => {
    // console.log(data)
  }

  fetchDetail = async (header_id) => {
    const {
      dispatch,
    } = this.props
    await Promise.all([dispatch({ type: 'projectM/fetchPeople', payload: header_id }),
    dispatch({ type: 'projectM/fetchLines', payload: { header_id } })]);
    this.setState({ selectID: header_id })
  }

  headerAction = (record) => {
    return (<span>
      <a href="javascript:;" onClick={this.alterHeader.bind(null, record)}>修改</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={this.fetchDetail.bind(null, record.ID)}>明细</a>
    </span>)
  }
  render() {
    const { headers, people, lines } = this.props,
      { selectID,tabKey } = this.state,
      normal = [],
      outTime = [];
    headers.forEach((h) => {
      if (moment().isBefore(h.DUE_DATE)) {
        normal.push(h)
      } else {
        outTime.push(h);
      }
    })
    return (<PageHeaderWrapper>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<Badge count={normal.length}>
            进行中&nbsp;&nbsp;
    </Badge>} key="1"><ProjectHeader dataSource={normal} action={this.headerAction} /></TabPane>
          <TabPane tab={<Badge count={outTime.length}>
            超期未完成&nbsp;&nbsp;
    </Badge>} key="2"><ProjectHeader dataSource={outTime} action={this.headerAction} /></TabPane>
          <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>

      </Card>
      {selectID > 0 ? (<Card
        style={{ width: '100%' }}
        title="明细"
        tabList={tabList}
        activeTabKey={tabKey}
        onTabChange={(key) => { this.onTabChange(key); }}
      >
        {tabKey === 'people' ? (<ProjectPeople dataSource={people} />) : (<ProjectLine dataSource={lines}/>)}
      </Card>) : ''}

    </PageHeaderWrapper>);
  }
}
export default Hhh;