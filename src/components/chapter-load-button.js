import React, { Component } from 'react'

class ChapterLoadButton extends Component {
    render() {
        return (
            <option
                key={this.props.index}
                className="w-full box-border mt-2 mr-2 px-4 py-2 block rounded shadow bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400"
                value={this.props.index}
            >
                {this.props.index + '. ' + this.props.title}
            </option>
        )
    }
}

export default ChapterLoadButton
