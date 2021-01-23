import React, { Component } from 'react';
import data from '../book-data.json'
import ChapterLoadButton from './chapter-load-button'

class ChapterListing extends Component {

	handleBookChange = () => {
		this.props.loadBook(this.props.bookIndex)
	}

	render() {
		return (
			<div>
				{data.book[this.props.bookIndex].chapters.map((chapter) => {
					return <ChapterLoadButton
						key={(chapter.index).toString()}
						index={chapter.index}
						url={chapter.url}
						title={chapter.title}
						loadChapter={this.props.loadChapter}
					></ChapterLoadButton>
				})}
			</div>
		)
	}
}

export default ChapterListing;
