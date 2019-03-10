import react, {
    PureComponent
} from 'react';
import SimpleTable from '@/components/SimpleTable';
import Formater from '@/components/Formater';


export default class ActionTable extends PureComponent {
    action = {
        title: 'Action',
        key: 'action',
        render: (text, record) => '',
    };
    constructor(props) {
        super(props);
        const {
            action,
        } = this.props;
        this.state = {
            columns: this.getColumns(action),
        }
    }

    getColumns(act) {
        const {
            columns: tableColumns,
        } = this.props;
        const action = this.getAction(act);
        if (action) {
            const nC = tableColumns.slice(0);
            nC.push(action);
            return nC;
        } else {
            return tableColumns;
        }
    }
    getAction(act) {
        if (act) {
            if (typeof act === 'function') {
                return {
                    ...this.action,
                    render: (text, record) => act(record)
                }
            } else {
                return { ...this.action, render: () => act }
            }
        } else {
            return null
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.action !== nextProps.action) {
            this.setState({
                columns: this.getColumns(nextProps.action)
            })
        }
    }
    render() {
        const {
            columns,
        } = this.state;
        const { dataSource } = this.props;
        return (< SimpleTable columns={
            columns
        }
            dataSource={
                dataSource
            }
        />)
    }
}