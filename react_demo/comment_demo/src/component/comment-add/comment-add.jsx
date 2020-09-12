import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentAdd extends Component {

    static propTypes = {
        addComment: PropTypes.func.isRequired
    }

    state = {
        name: '',
        say: ''
    }

    handleSubmit = () => {
        // 收集数据
        const comment = this.state
        // 写入数据
        this.props.addComment(comment)
        // 清除输入数据
        this.setState({
            name: '',
            say: ''
        })
    }

    handleNameChange = (event) => {
        const name = event.target.value
        this.setState({ name })
    }

    handleContentChange = (event) => {
        const say = event.target.value
        this.setState({ say })
    }

    render() {

        const { name, say } = this.state
        return (
            <div>
                <div className="col-md-4">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" placeholder="用户名" value={name} onChange={this.handleNameChange} />
                        </div>
                        <div className="form-group">
                            <label>评论内容</label>
                            <textarea className="form-control" rows="6" placeholder="评论内容" value={say} onChange={this.handleContentChange}></textarea>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="button" className="btn btn-default pull-right"
                                    onClick={this.handleSubmit} >提交
                        </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CommentAdd