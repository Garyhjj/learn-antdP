import React, {
  PureComponent
} from 'react';
import {
  Table
} from 'antd';
import Formater from '@/components/Formater';

function mapDataForTable(data) {
  return data.map((l) => {
    l.key = l.ID || ~~(Math.random() * 10000);
    return l;
  })
}

function mapColumnsForTable(columns) {
  return columns.map(c => {
        c.dataIndex = c.dataIndex || c.key;
        const formater = c.formater;
        c.render = c.render || ((str) => (
          Array.isArray(formater) ? < Formater type = {
            formater[0]
          }
          target = {
            str
          }
          args = {
            formater[1]
          }
          />: str));
          return c;
        })
      }

      export default class SimpleTable extends PureComponent {
          constructor(props) {
              super(props);
              const {
                columns = [],
                  dataSource = [],
              } = this.props;
              this.state = {
                data: mapDataForTable(dataSource),
                columns: mapColumnsForTable(columns)
              }
          }
        componentWillReceiveProps(nextProps) {
          if (this.props.columns !== nextProps.columns) {
            this.setState({
              columns: mapColumnsForTable(nextProps.columns)
            })
          } else if (this.props.dataSource !== nextProps.dataSource) {
            this.setState({
              data: mapDataForTable(nextProps.dataSource)
            })
          }
        }
        render() {
          const {
            data,
            columns
          } = this.state;
          return ( < Table columns = {
              columns
            }
            dataSource = {
              data
            }
            />)
          }
        }
