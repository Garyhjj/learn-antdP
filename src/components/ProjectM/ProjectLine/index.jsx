import react, {
    PureComponent
  } from 'react';
  import ActionTable from '@/components/ActionTable';
  import Formater from '@/components/Formater';
  function getName(raw) {
    const rawName = raw.split('/').pop();
    if (rawName) {
      const year = new Date().getFullYear();
      const parts = rawName.split('.');
      const lgParts = parts.length;
      if (lgParts === 1) {
        const str = parts[0];
        const lg = str.length;
        return str.slice(0, lg - 17);
      } else {
        const lastTwo = parts[lgParts - 2];
        const lg = lastTwo.length;
        parts[lgParts - 2] = lastTwo.slice(0, lg - 17);
        return parts.join('.');
      }
    }
    return '';
  }
  const tableColumns = [{
    title: '编号',
    dataIndex: 'CODE',
    key: 'CODE',
  },{
    title: '描述',
    key: 'DESCRIPTION'
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
    title: '附件',
    key: 'ATTACHMENT',
    render: (lists) => lists?lists.map(l => (<div key={l}><a href={l}  target="_blank">{getName(l)}</a></div>)):''
  },{
    title: '负责人',
    key: 'ASSIGNEE_LIST',
    render: (lists) => lists?lists.map(l => (<div key={l}><Formater type="empno" target={l} args="CH(NO)"/></div>)):''
  }];
  
  export default class ProjectLine extends PureComponent {
    render() {
      return (< ActionTable columns={
        tableColumns
      }
        {...this.props}
      />)
    }
  }