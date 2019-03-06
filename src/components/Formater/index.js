import React, {
  PureComponent
} from 'react';
import formater from '@/utils/format';

export default class Formater extends PureComponent {
    
constructor(props) {
    super(props);
    const {
        type,
        target,
        args
      } = this.props;
      let val = target;
      if(type && formater[type]) {
        const argus = Array.isArray(args) ? args : [args];
          const res = formater[type](target, ...argus);
          if(res && typeof res.then === 'function') {
            res.then((v) => this.setState({val:v}));
          }else {
            val = res;
          }
      }
      this.state = {
        val
    }
    
}
  render() {
    return (this.state.val)
  }
}
