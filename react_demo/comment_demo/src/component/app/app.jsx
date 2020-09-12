import React, { Component } from 'react'

import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'


class App extends Component {

    // // 【写法1】这里是最基础的写法。
    // constructor (props) {
    //     super(props)
    //     this.state = {
    //         comments:[
    //             {name:'yes1', content:'我很好，你呢'},
    //             {name:'no', content:'我不好呢'}
    //         ]
    //     }
    // }

    // 给组件对象指定state属性
    state = {
        comments: [
            { name: 'yes1', say: '我很好，你呢' },
            { name: 'no', say: '我不好呢' }
        ]
    }


    addComment = (comment) => {
        const { comments } = this.state
        comments.unshift(comment)
        this.setState({ comments })
    }

    deleteComment = (index) => {
        const { comments } = this.state
        comments.splice(index, 1)
        this.setState({ comments })
    }

    render() {
        //【写法2】 在下面
        // <CommentList comments={this.state.comments}/>
        const { comments } = this.state
        return (
            <div>
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <CommentAdd addComment={this.addComment} />
                    <CommentList comments={comments} deleteComment={this.deleteComment} />
                </div>
            </div>
        )
    }
}

export default App