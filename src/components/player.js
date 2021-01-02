import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Duration from './duration'

class Player extends Component {
	state = {
		url: null,
		pip: false,
		playing: true,
		controls: false,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
		devControls: false,
		chapter: 0
	}

	handleToggleDevControls = () => {
		this.setState({ devControls: !this.state.devControls })
	}

	load = url => {
		this.setState({
			url,
			played: 0,
			loaded: 0,
			pip: false
		})
	}

	handlePlayPause = () => {
		this.setState({ playing: !this.state.playing })
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

	handlePlay = () => {
		console.log('onPlay')
		this.setState({ playing: true })
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

	renderLoadButton = (url, chapter, label) => {
		return (
			<button
				className='mt-2 mr-2 px-4 py-2 block rounded shadow text-white bg-green-600 active:bg-green-700'
				onClick={() => this.load(url)}>
				{chapter + '. ' + label}
			</button>
		)
	}

	ref = player => {
		this.player = player
	}

	render() {
		const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state // used for dev controls

		return (

			<div className='app'>

				<section className='section'>
					<h2 className="font-serif font-bold text-4xl">Harry Potter &amp; the Philosopher's Stone</h2>
					<div className='chapter-select py-4' >
						{this.renderLoadButton('audio/book-1/01-The-Boy-Who-Lived.mp3', 1, 'The Boy Who Lived')}
						{this.renderLoadButton('https://b7s9-static.nyc3.digitaloceanspaces.com/audio-book/02-The-Vanishing-Glass.mp3', 2, 'The Vanishing Glass')}
						{this.renderLoadButton('https://b7s9-static.nyc3.digitaloceanspaces.com/audio-book/03-The-Letters-From-No-One.mp3', 3, 'The Letters From No One')}
						{this.renderLoadButton('https://b7s9-static.nyc3.digitaloceanspaces.com/audio-book/04-The-Keeper-Of-The-Keys.mp3', 4, 'The Keeper of the Keys')}
					</div>
					<h3 className='text-md'>No chapter selected</h3>
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
							onEnablePIP={this.handleEnablePIP}
							onDisablePIP={this.handleDisablePIP}
							onPause={this.handlePause}
							onBuffer={() => console.log('onBuffer')}
							onSeek={e => console.log('onSeek', e)}
							onEnded={this.handleEnded}
							onError={e => console.log('onError', e)}
							onProgress={this.handleProgress}
							onDuration={this.handleDuration}
						/>
					</div>

					<button
						className="mt-8 px-4 py-2 bg-gray-100 font-bold rounded shadow"
						onClick={this.handleToggleDevControls}
					>{this.state.devControls ? 'Hide' : 'Show'} Dev Controls</button>

				</section>
				<div style={{ display: this.state.devControls ? 'block' : 'none' }}>
					<table>
						<tbody>
							<tr>
								<th>Controls</th>
								<td>
									<button onClick={this.handleStop}>Stop</button>
									<button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
									{light &&
										<button onClick={() => this.player.showPreview()}>Show preview</button>}
									{ReactPlayer.canEnablePIP(url) &&
										<button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
								</td>
							</tr>
							<tr>
								<th>Speed</th>
								<td>
									<button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
									<button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
									<button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
								</td>
							</tr>
							<tr>
								<th>Seek</th>
								<td>
									<input
										type='range' min={0} max={0.999999} step='any'
										value={played}
										onMouseDown={this.handleSeekMouseDown}
										onChange={this.handleSeekChange}
										onMouseUp={this.handleSeekMouseUp}
									/>
								</td>
							</tr>
							<tr>
								<th>Volume</th>
								<td>
									<input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor='controls'>Controls</label>
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
								<th>
									<label htmlFor='light'>Light mode</label>
								</th>
								<td>
									<input id='light' type='checkbox' checked={light} onChange={this.handleToggleLight} />
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
						<table>
							<tbody>
								<tr>
									<th>Files</th>
									<td>

									</td>
								</tr>
								<tr>
									<th>Custom URL</th>
									<td>
										<input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
										<button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
									</td>
								</tr>
							</tbody>
						</table>

						<h2>State</h2>

						<table>
							<tbody>
								<tr>
									<th>url</th>
									<td className={!url ? 'faded' : ''}>
										{(url instanceof Array ? 'Multiple' : url) || 'null'}
									</td>
								</tr>
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
// this.load('https://b7s9-static.nyc3.digitaloceanspaces.com/01-The-Boy-Who-Lived.mp3')
