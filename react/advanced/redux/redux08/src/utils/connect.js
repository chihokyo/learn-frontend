// 因为每一个组件的需要的state和actio都是不一样的，
import { PureComponent } from 'react';
// import store from '../store'; 隔离出来 就不需要再connect里面在引入store了
import { StoreContext } from './context';

// 封装的时候就需要这俩参数
export function connect(mapStateToProps, mapDispatchToProps) {
  return function enhanceHOC(WrappedComponent) {
    class EnhanceComponent extends PureComponent {
      constructor(props, context) {
        super(props, context);
        this.state = {
          // 这里要注意，初始化的时候是没有值的,必须要在 context 这里写
          storeState: mapStateToProps(context.getState()),
        };
      }

      componentDidMount() {
        this.unsubcribe = this.context.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(this.context.getState()),
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
            {...mapStateToProps(this.context.getState())}
            {...mapDispatchToProps(this.context.dispatch)}
          />
        );
      }
    }

    EnhanceComponent.contextType = StoreContext;
    return EnhanceComponent;
  };
}
