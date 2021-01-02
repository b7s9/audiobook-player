import React, { Component } from 'react';
import data from '../data.json'
import ChapterLoadButton from './chapter-load-button'

class ChapterListing extends Component {

	handleBookChange = () => {
		this.props.loadBook(this.props.bookIndex)
	}

	// handleChapterLoad = (url) => {
	// 	this.props.chapterUrl = url
	// }

	// renderChapterListing = () => {
	// 	data.book[this.props.bookIndex].chapters.map((chapter) => {
	// 		return <ChapterLoadButton
	// 			key={chapter.number.toString()}
	// 			index={chapter.number}
	// 			url={chapter.url}
	// 			title={chapter.title}
	// 			loadChapter={this.handleChapterLoad}
	// 		></ChapterLoadButton>
	// 	})
	// }

	render() {
		// const chapterUrl = this.props.chapterUrl; //inherit chapter state, so it's reflected in the player
		return (
			<div>
				{/* {this.renderChapterListing} */}
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
