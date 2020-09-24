import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './commentItem.css'

class CommentItem extends Component {

    static propTypes = {
        comment: PropTypes.object.isRequired,
        deleteComment: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired
    }

    handleDelete = (index) => {
        const { comment, deleteComment } = this.props
        if (window.confirm(`确定删除${comment.name}的评论吗`)) {
            deleteComment(index)
        }
    }
    render() {
        const { comment } = this.props
        return (
            <div>
                <li className="list-group-item">
                    <div className="handle">
                        <a href="#!" onClick={this.handleDelete}>删除</a>
                    </div>
                    <p className="user"><span >{comment.name}</span><span>说:</span></p>
                    <p className="centence">{comment.say}</p>
                </li>
            </div>
        )
    }
}

export default CommentItem