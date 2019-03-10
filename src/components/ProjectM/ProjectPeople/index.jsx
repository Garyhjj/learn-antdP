import react, {
    PureComponent
  } from 'react';
  import ActionTable from '@/components/ActionTable';
  import Formater from '@/components/Formater';
  
  const tableColumns = [{
    title: '组员',
    key: 'USER_NAME',
    render: (str) => (<Formater type="empno" target={str} args="CH(NO)"/>)
  }];
  
  export default class ProjectPeople extends PureComponent {
    render() {
      return (< ActionTable columns={
        tableColumns
      }
        {...this.props}
      />)
    }
  }