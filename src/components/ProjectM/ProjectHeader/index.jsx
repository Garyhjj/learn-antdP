import react, {
  PureComponent
} from 'react';
import ActionTable from '@/components/ActionTable';
import Formater from '@/components/Formater';

const tableColumns = [{
  title: '编号',
  dataIndex: 'CODE',
  key: 'CODE',
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
},{
  title: '类别',
  key: 'TYPE'
},{
  title: '描述',
  key: 'DESCRIPTION'
},{
  title: '发起人',
  key: 'OWNER',
  render: (str) => (<Formater type="empno" target={str} args="CH(NO)"/>)
}];

export default class ProjectHeader extends PureComponent {
  render() {
    return (< ActionTable columns={
      tableColumns
    }
      {...this.props}
    />)
  }
}