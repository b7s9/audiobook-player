import React, { Component } from 'react';
import data from '../data.json'
import ChapterLoadButton from './chapter-load-button'

class ChapterListing extends Component {

	handleBookChange = () => {
		this.props.loadBook(this.props.bookIndex)
	}

	handleChapterLoad = () => {
		// this.props.chapterUrl = e.target.index
	}

	render() {
		return (
			<div>
				{data.book[this.props.bookIndex].chapters.map((chapter) => {
					return <ChapterLoadButton
						key={chapter.number.toString()}
						index={chapter.number}
						url={chapter.url}
						title={chapter.title}
						loadChapter={this.handleChapterLoad}
					></ChapterLoadButton>
				})}
			</div>
		)
	}
}

export default ChapterListing;
