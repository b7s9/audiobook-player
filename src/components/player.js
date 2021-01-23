import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Duration from './duration'
import ChapterListing from './chapter-listing'
import data from '../book-data.json'

class Player extends Component {
	constructor(props) {
		super(props)

		this.state = {
			url: null,
			pip: false,
			playing: false,
			controls: false,
			light: false,
			volume: 0.6,
			muted: false,
			played: 0,
			loaded: 0,
			duration: 0,
			playbackRate: 1.0,
			loop: false,
			devControls: false,
			bookIndex: 0,
			bookTitle: '',
			chapterIndex: 0,
			chapterTitle: '',
			chapterUrl: ''
		}

		this.loadChapter = this.loadChapter.bind(this); // allows me to use this down the inheritance chain

		this.lastChapterKey = this.props.localStorageNamespace + '-lastChapter'
		this.lastBookKey = this.props.localStorageNamespace + '-lastBook'
	}



	handleToggleDevControls = () => {
		this.setState({ devControls: !this.state.devControls })
	}

	loadChapter = (index) => {
		this.setState({
			chapterIndex: index,
			url: data.baseMediaUrl + data.book[this.state.bookIndex].url + '/' + data.book[this.state.bookIndex].chapters[index].url,
			chapterTitle: data.book[this.state.bookIndex].chapters[index].title,
			played: 0,
			loaded: 0,
			pip: false
		})
		console.log('current url: ' + this.state.url)
		console.log('chapter index: ' + index)
		console.log('chapter state: ' + this.state.chapterIndex)
		// this.storeLastChapterInClient()

	}

	handlePlayPause = () => {
		this.setState({ playing: !this.state.playing })
	}

	handlePlay = () => {
		console.log('onPlay')
		this.setState({ playing: true })
	}

	handleStop = () => {
		this.setState({ url: null, playing: false })
	}

	handleToggleControls = () => {
		const url = this.state.url
		this.setState({
			controls: !this.state.controls,
			url: null
		}, () => this.load(url))
	}

	handleToggleLight = () => {
		this.setState({ light: !this.state.light })
	}

	handleToggleLoop = () => {
		this.setState({ loop: !this.state.loop })
	}

	handleVolumeChange = e => {
		this.setState({ volume: parseFloat(e.target.value) })
	}

	handleToggleMuted = () => {
		this.setState({ muted: !this.state.muted })
	}

	handleSetPlaybackRate = e => {
		this.setState({ playbackRate: parseFloat(e.target.value) })
	}

	handleTogglePIP = () => {
		this.setState({ pip: !this.state.pip })
	}

	handleEnablePIP = () => {
		console.log('onEnablePIP')
		this.setState({ pip: true })
	}

	handleDisablePIP = () => {
		console.log('onDisablePIP')
		this.setState({ pip: false })
	}

	handlePause = () => {
		console.log('onPause')
		this.setState({ playing: false })
	}

	handleSeekMouseDown = e => {
		this.setState({ seeking: true })
	}

	handleSeekChange = e => {
		this.setState({ played: parseFloat(e.target.value) })
	}

	handleSeekMouseUp = e => {
		this.setState({ seeking: false })
		this.player.seekTo(parseFloat(e.target.value))
	}

	handleProgress = state => {
		console.log('onProgress', state)
		// We only want to update time slider if we are not currently seeking
		if (!this.state.seeking) {
			this.setState(state)
		}
	}

	handleEnded = () => {
		console.log('onEnded')
		this.setState({ playing: this.state.loop })
	}

	handleDuration = (duration) => {
		console.log('onDuration', duration)
		this.setState({ duration })
	}

	// renderLoadButton = (url, chapter, label) => {
	// 	return (
	// 		<button
	// 			key={chapter}
	// 			className='mt-2 mr-2 px-4 py-2 block rounded shadow text-white bg-green-600 active:bg-green-700'
	// 			onClick={() => this.load(url)}
	// 		>
	// 			{chapter + '. ' + label}
	// 		</button>
	// 	)
	// }

	renderBookOption = (index) => {
		return (
			<option
				key={index}
				className='mt-2 mr-2 px-4 py-2 block rounded shadow text-white bg-pink-600 hover:bg-pink-700'
				value={index}
			// onClick={() => this.handleBookChange(index)}
			>
				{parseInt(index + 1) + '. ' + data.book[index].title}
			</option>
		)
	}

	handleBookSelection = (e) => {
		this.handleBookChange(e.target.value)
	}

	handleBookChange = (index) => {
		this.setState({ bookIndex: index })
		this.setState({ bookTitle: data.book[index].title })
	}

	ref = player => {
		this.player = player
	}

	// getLastChapterFromClient = () => {
	// 	let _chapterIndex = localStorage.getItem(this.lastChapterKey)
	// 	let _bookIndex = localStorage.getItem(this.lastBookKey)

	// 	if (_bookIndex) {
	// 		console.log('book: ' + _bookIndex)
	// 		this.handleBookChange(_bookIndex)
	// 	} else {
	// 		console.log('no book stored')
	// 	}

	// 	if (_chapterIndex) {
	// 		console.log('chapter: ' + _chapterIndex)
	// 		this.loadChapter(_chapterIndex)
	// 	} else {
	// 		console.log('no chapter stored')
	// 	}
	// }

	// storeLastChapterInClient = () => {
	// 	localStorage.setItem(this.lastBookKey, this.state.bookIndex)
	// 	localStorage.setItem(this.lastChapterKey, this.state.chapterIndex)
	// }

	// componentDidMount() {
	// 	this.getLastChapterFromClient()
	// }

	render() {
		const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state // used for dev controls

		return (

			<div className='mx-auto md:w-full lg:max-w-prose'>

				<div>

					<p className='mb-4 text-md font-serif dark:text-gray-100'>
						<span className='font-bold'>Bedtime thought: </span>
						<span>{this.props.affirmation}</span>
					</p>

					<select
						className='w-full my-4 p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-100'
						onChange={this.handleBookSelection}
					>
						{data.book.map((book, index) => {
							return this.renderBookOption(index)
						})}
					</select>

					<h2 className="font-serif font-bold text-4xl dark:text-gray-100">{this.state.bookTitle.length > 0 ? this.state.bookTitle : 'No Book Selected'}</h2>
					<div className='chapter-select py-4 w-full box-border' >
						<ChapterListing
							bookIndex={this.state.bookIndex}
							loadChapter={this.loadChapter}
						></ChapterListing>

					</div>
					<h3 className='text-md dark:text-white'>{this.state.chapterTitle.length > 0 ? this.state.chapterTitle : 'No Chapter Selected'}</h3>
					<div className='controls'>
						<button
							className='px-4 py-2 bg-blue-700 font-bold text-white text-lg rounded shadow hover:bg-blue-800'
							onClick={this.handlePlayPause}
						>
							{playing ? 'Pause' : 'Play'}
						</button>
					</div>

					<div className='player-wrapper'>
						<ReactPlayer
							ref={this.ref}
							className='react-player'
							width='100%'
							height='100%'
							url={url}
							pip={pip}
							playing={playing}
							controls={controls}
							light={light}
							loop={loop}
							playbackRate={playbackRate}
							volume={volume}
							muted={muted}
							onReady={() => console.log('onReady')}
							onStart={() => console.log('onStart')}
							onPlay={this.handlePlay}
							// onEnablePIP={this.handleEnablePIP}
							// onDisablePIP={this.handleDisablePIP}
							onPause={this.handlePause}
							onBuffer={() => console.log('onBuffer')}
							onSeek={e => console.log('onSeek', e)}
							onEnded={this.handleEnded}
							onError={e => console.log('onError', e)}
						// onProgress={this.handleProgress}
						// onDuration={this.handleDuration}
						/>
					</div>

					<div className="block mt-6 my-2 p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
						<label htmlFor="volume" className="mr-2">Volume</label>
						<input
							className="dark:border-gray-500"
							name="volume"
							type='range'
							min={0}
							max={1}
							step='any'
							value={volume}
							onChange={this.handleVolumeChange}
						/>
					</div>

					<div className="block p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
						<label htmlFor="seek" className="mr-2">Seek</label>
						<input
							className="dark:border-gray-500"
							name="seek"
							type='range' min={0} max={0.999999} step='any'
							value={played}
							onMouseDown={this.handleSeekMouseDown}
							onChange={this.handleSeekChange}
							onMouseUp={this.handleSeekMouseUp}
						/>
					</div>

					<button
						className="mt-8 px-4 py-2 bg-gray-100 font-bold rounded shadow dark:hover:bg-gray-200"
						onClick={this.handleToggleDevControls}
					>{this.state.devControls ? 'Hide' : 'Show'} Dev Controls</button>

				</div>
				<div className='text-left dark:text-white' style={{ display: this.state.devControls ? 'block' : 'none' }}>
					<table>
						<tbody>

							<tr>
								<th>
									<label htmlFor='controls'>HTML Controls</label>
								</th>
								<td>
									<input id='controls' type='checkbox' checked={controls} onChange={this.handleToggleControls} />
									<em>&nbsp; Requires player reload</em>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor='muted'>Muted</label>
								</th>
								<td>
									<input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor='loop'>Loop</label>
								</th>
								<td>
									<input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
								</td>
							</tr>
							<tr>
								<th>Played</th>
								<td><progress max={1} value={played} /></td>
							</tr>
							<tr>
								<th>Loaded</th>
								<td><progress max={1} value={loaded} /></td>
							</tr>
						</tbody>
					</table>
					<section className='section'>
						<h2>State</h2>

						<table>
							<tbody>
								<tr>
									<th>playing</th>
									<td>{playing ? 'true' : 'false'}</td>
								</tr>
								<tr>
									<th>volume</th>
									<td>{volume.toFixed(3)}</td>
								</tr>
								<tr>
									<th>played</th>
									<td>{played.toFixed(3)}</td>
								</tr>
								<tr>
									<th>loaded</th>
									<td>{loaded.toFixed(3)}</td>
								</tr>
								<tr>
									<th>duration</th>
									<td><Duration seconds={duration} /></td>
								</tr>
								<tr>
									<th>elapsed</th>
									<td><Duration seconds={duration * played} /></td>
								</tr>
								<tr>
									<th>remaining</th>
									<td><Duration seconds={duration * (1 - played)} /></td>
								</tr>
							</tbody>
						</table>
					</section>
				</div>
			</div>
		)
	}
}

export default Player; // Don’t forget to use export default!
