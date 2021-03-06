import React, { Component } from 'react'
import data from '../book-data.json'
import ChapterLoadButton from './chapter-load-button'

class ChapterListing extends Component {
    handleBookChange = () => {
        this.props.loadBook(this.props.bookIndex)
    }

    handleUrlChange = (e) => {
        this.props.loadChapter(e.target.value - 1)
    }

    render() {
        return (
            <select
                className="w-full box-border my-4 p-2 pr-0 bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                onChange={this.handleUrlChange}
            >
                {data.book[this.props.bookIndex].chapters.map((chapter) => {
                    return (
                        <ChapterLoadButton
                            key={chapter.index.toString()}
                            index={chapter.index}
                            url={chapter.url}
                            title={chapter.title}
                            loadChapter={this.props.loadChapter}
                        ></ChapterLoadButton>
                    )
                })}
            </select>
        )
    }
}

export default ChapterListing
