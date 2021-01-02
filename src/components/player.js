import React, { Component } from 'react';
import ReactPlayer from 'react-player'
class Player extends Component {
	state = {
		url: null,
		pip: false,
		playing: false,
		controls: false,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false
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

	renderLoadButton = (url, label) => {
		return (
			<button onClick={() => this.load(url)}>
				{label}
			</button>
		)
	}

	ref = player => {
		this.player = player
	}

	render() {
		const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
		const SEPARATOR = ' · ';

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

		return (
			<div className="player">
				<h2 className="font-bold">Name of Book</h2>
				<h3><span>1. </span>Name of Chapter</h3>
				<p>{(this.state.loaded) ? 'Loaded' : 'Loading'}</p>
				<div className="container my-4 justify-between bg-gray-200 rounded">
					{/* <button onClick={this.setState({ url: 'https://b7s9-static.nyc3.digitaloceanspaces.com/01-The-Boy-Who-Lived.mp3' })} className="p-4 bg-pink-300 rounded font-bold text-black">Load Chapter 1</button> */}
					{this.renderLoadButton('https://b7s9-static.nyc3.digitaloceanspaces.com/01-The-Boy-Who-Lived.mp3', 'Chapter 1')}
					<button onClick={this.handlePlayPause} className="p-4 bg-green-700 rounded font-bold text-white">{(this.state.playing) ? 'Pause' : 'Play'}</button>
				</div>
				<div className="container my-4 place-content-between bg-gray-200 rounded">
					{/* <button onClick={this.handleSeekingChange(-15)} id="rew" className="p-4 bg-white rounded font-bold">Rewind -15 sec.</button> */}
					{/* <button onClick={this.handleSeekingChange(15)} id="fwd" className="p-4 bg-white rounded font-bold">Forward +15 sec.</button> */}
				</div>

				{/* <ReactPlayer
					url={'https://b7s9-static.nyc3.digitaloceanspaces.com/01-The-Boy-Who-Lived.mp3'}
					controls={true}
					playing={false}
					ref={this.ref}
				></ReactPlayer> */}

			</div>
		)
	}
}

export default Player; // Don’t forget to use export default!
// this.load('https://b7s9-static.nyc3.digitaloceanspaces.com/01-The-Boy-Who-Lived.mp3')
