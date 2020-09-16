import React from 'react'
import { Input, Button, List } from 'antd';

/**
 * 
 * @param {表示从父组件传过来状态} props 
 */
const TodoListUI = (props) => {
  return (
    <div>
      <h1>我是新的 New List</h1>
      <div>
        <Input
          value={props.inputValue}
          placeholder='input something'
          style={{ width: '300px', marginRight: '10px' }}
          onChange={props.handleInputChange}
        />
        <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
        <List
          style={{ width: '300px', marginTop: '10px' }}
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (<List.Item onClick={(index) => {props.handleDeleteItem(index)}}>{item}</List.Item>)}
        />
      </div>
    </div>
  )
}
// class TodoListUI extends Component {
//   render() {
    
//   }
// }

export default TodoListUI