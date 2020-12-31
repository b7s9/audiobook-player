import React, { Component } from 'react';
import ReactHowler from 'react-howler'
import raf from 'raf';

class Player extends Component {

	constructor(props) {
		super(props)

		this.state = {
			playing: false,
			loaded: false,
			loop: false,
			mute: false,
			volume: 1.0,
			seek: 0.0,
			isSeeking: false
		}
		this.handleToggle = this.handleToggle.bind(this)
		this.handleOnLoad = this.handleOnLoad.bind(this)
		this.handleOnEnd = this.handleOnEnd.bind(this)
		this.handleOnPlay = this.handleOnPlay.bind(this)
		this.handleStop = this.handleStop.bind(this)
		this.renderSeekPos = this.renderSeekPos.bind(this)
		this.handleLoopToggle = this.handleLoopToggle.bind(this)
		this.handleMuteToggle = this.handleMuteToggle.bind(this)
		this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this)
		this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this)
		this.handleSeekingChange = this.handleSeekingChange.bind(this)
	}

	componentDidMount() {
		ReactHowler.autoUnlock = true;
		ReactHowler.html5PoolSize = 100;
	}

	componentWillUnmount() {
		this.clearRAF()
	}

	handleToggle() {
		this.setState({
			playing: !this.state.playing
		})
	}

	handleOnLoad() {
		this.setState({
			loaded: true,
			duration: this.player.duration()
		})
	}

	handleOnPlay() {
		this.setState({
			playing: true
		})
		this.renderSeekPos()
	}

	handleOnEnd() {
		this.setState({
			playing: false
		})
		this.clearRAF()
	}

	handleStop() {
		this.player.stop()
		this.setState({
			playing: false // Need to update our local state so we don't immediately invoke autoplay
		})
		this.renderSeekPos()
	}

	handleLoopToggle() {
		this.setState({
			loop: !this.state.loop
		})
	}

	handleMuteToggle() {
		this.setState({
			mute: !this.state.mute
		})
	}

	handleMouseDownSeek() {
		this.setState({
			isSeeking: true
		})
	}

	handleMouseUpSeek(e) {
		this.setState({
			isSeeking: false
		})

		this.player.seek(e.target.value)
	}

	handleSeekingChange(e) {
		this.setState({
			seek: parseFloat(e.target.value)
		})
	}

	renderSeekPos() {
		if (!this.state.isSeeking) {
			this.setState({
				seek: this.player.seek()
			})
		}
		if (this.state.playing) {
			this._raf = raf(this.renderSeekPos)
		}
	}

	clearRAF() {
		raf.cancel(this._raf)
	}

	render() {
		return (
			<div className="player">
				<h2 className="font-bold">Name of Book</h2>
				<h3><span>1. </span>Name of Chapter</h3>
				<p>{(this.state.loaded) ? 'Loaded' : 'Loading'}</p>
				<div className="container my-4 justify-between bg-gray-200 rounded">
					<button onClick={this.handleToggle} id="play" className="p-4 bg-green-700 rounded font-bold text-white">{(this.state.playing) ? 'Pause' : 'Play'}</button>
					{/* <button onClick={this.handleStop()} id="pause" className="p-4 bg-white rounded font-bold">Stop</button> */}
				</div>
				<div className="container my-4 place-content-between bg-gray-200 rounded">
					{/* <button onClick={this.handleSeekingChange(-15)} id="rew" className="p-4 bg-white rounded font-bold">Rewind -15 sec.</button> */}
					{/* <button onClick={this.handleSeekingChange(15)} id="fwd" className="p-4 bg-white rounded font-bold">Forward +15 sec.</button> */}
				</div>

				<ReactHowler
					src={['audio/book-1/01-The-Boy-Who-Lived.mp3']}
					playing={false}
					html5={true}
					onLoad={this.handleOnLoad}
					onPlay={this.handleOnPlay}
					onEnd={this.handleOnEnd}
					loop={this.state.loop}
					mute={this.state.mute}
					volume={this.state.volume}
					ref={(ref) => (this.player = ref)}
				/>
			</div>
		)
	}
}

export default Player; // Don’t forget to use export default!
