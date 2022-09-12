// 因为每一个组件的需要的state和actio都是不一样的，
import { PureComponent } from 'react';
import store from '../store';

// 封装的时候就需要这俩参数
export function connect(mapStateToProps, mapDispatchToProps) {
  return function enhanceHOC(WrappedComponent) {
    return class extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          storeState: mapStateToProps(store.getState()),
        };
      }

      componentDidMount() {
        this.unsubcribe = store.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(store.getState()),
          });
        });
      }

      componentWillUnmount() {
        this.unsubcribe();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(store.getState())}
            {...mapDispatchToProps(store.dispatch)}
          />
        );
      }
    };
  };
}
