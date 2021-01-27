import React, { Component } from 'react'
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
            chapterUrl: '',
        }

        this.loadChapter = this.loadChapter.bind(this) // allows me to use this down the inheritance chain

        this.lastChapterKey = this.props.localStorageNamespace + '-lastChapter'
        this.lastBookKey = this.props.localStorageNamespace + '-lastBook'
    }

    handleToggleDevControls = () => {
        this.setState({ devControls: !this.state.devControls })
    }

    loadChapter = (index) => {
        this.setState({
            chapterIndex: index,
            url:
                data.baseMediaUrl +
                data.book[this.state.bookIndex].url +
                '/' +
                data.book[this.state.bookIndex].chapters[index].url,
            chapterTitle: data.book[this.state.bookIndex].chapters[index].title,
            // played: 0,
            // loaded: 0,
        })
        // console.log('current url: ' + this.state.url)
        // console.log('chapter index: ' + index)
        // console.log('chapter state: ' + this.state.chapterIndex)
        // this.storeLastChapterInClient()
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handlePlay = () => {
        this.setState({ playing: true })
    }

    handleStop = () => {
        this.setState({ url: null, playing: false })
    }

    handleToggleControls = () => {
        const url = this.state.url
        this.setState(
            {
                controls: !this.state.controls,
                url: null,
            },
            () => this.load(url)
        )
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light })
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = (e) => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = (e) => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
    }

    handleEnablePIP = () => {
        this.setState({ pip: true })
    }

    handleDisablePIP = () => {
        this.setState({ pip: false })
    }

    handlePause = () => {
        this.setState({ playing: false })
    }

    handleSeekMouseDown = (e) => {
        this.setState({ seeking: true })
    }

    handleSeekChange = (e) => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = (e) => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = (state) => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        this.setState({ duration })
    }

    renderBookOption = (index) => {
        return (
            <option
                key={index}
                className="mt-2 mr-2 px-4 py-2 block rounded shadow bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400"
                value={index}
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

    handleSkipForward = () => {
        // this.setState({ played: this.state.played + 0.01 })
        const currentTime = this.player.getCurrentTime()
        this.player.seekTo(currentTime + 13)
    }

    handleSkipBack = () => {
        const currentTime = this.player.getCurrentTime()
        this.player.seekTo(currentTime - 13)
    }

    ref = (player) => {
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

    componentDidMount() {
        // this.getLastChapterFromClient()
        this.handleBookChange(this.state.bookIndex)
        this.loadChapter(this.state.chapterIndex)
    }

    render() {
        const {
            url,
            playing,
            controls,
            light,
            volume,
            muted,
            loop,
            played,
            loaded,
            duration,
            playbackRate,
            pip,
        } = this.state

        return (
            <div className="mx-auto md:w-full lg:max-w-prose">
                <div>
                    <p className="mb-4 text-md font-serif dark:text-gray-100">
                        <span className="font-bold">Bedtime thought: </span>
                        <span>{this.props.affirmation}</span>
                    </p>

                    <select
                        className="w-full my-4 p-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
                        onChange={this.handleBookSelection}
                    >
                        {data.book.map((book, index) => {
                            return this.renderBookOption(index)
                        })}
                    </select>

                    <h2 className="font-serif font-bold text-4xl dark:text-gray-100">
                        {this.state.bookTitle.length > 0 ? this.state.bookTitle : 'No Book Selected'}
                    </h2>
                    <div className="chapter-select py-4 w-full box-border">
                        <ChapterListing
                            bookIndex={this.state.bookIndex}
                            loadChapter={this.loadChapter}
                        ></ChapterListing>
                    </div>

                    <div className="md:my-4 lg:my-6 xl:my-8 2xl:my-14">
                        <h3 className="text-lg text-center dark:text-white">
                            {this.state.chapterTitle.length > 0 ? this.state.chapterTitle : 'No Chapter Selected'}
                        </h3>
                        <div className="controls flex justify-center">
                            <button
                                className="px-6 py-4 font-bold text-3xl rounded shadow text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 active:text-blue-500"
                                onClick={this.handleSkipBack}
                            >
                                <div className="block">
                                    <i className="ci-fast_rewind"></i>
                                </div>
                                <div className="block text-sm">-15 sec.</div>
                            </button>

                            <button
                                className="px-6 py-4 font-bold text-6xl rounded shadow text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 active:text-green-500"
                                onClick={this.handlePlayPause}
                            >
                                {playing ? (
                                    <i className="ci-pause_circle_outline"></i>
                                ) : (
                                    <i className="ci-play_arrow"></i>
                                )}
                            </button>

                            <button
                                className="px-6 py-4 font-bold text-3xl rounded shadow text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 active:text-blue-500"
                                onClick={this.handleSkipForward}
                            >
                                <div className="block">
                                    <i className="ci-fast_forward"></i>
                                </div>
                                <div className="block text-sm">+15 sec.</div>
                            </button>
                        </div>

                        <div className="player-wrapper">
                            <ReactPlayer
                                ref={this.ref}
                                className="react-player"
                                width="100%"
                                height="100%"
                                url={url}
                                pip={pip}
                                playing={playing}
                                controls={controls}
                                light={light}
                                loop={loop}
                                playbackRate={playbackRate}
                                volume={volume}
                                muted={muted}
                                // onReady={() => console.log('onReady')}
                                // onStart={() => console.log('onStart')}
                                // onPlay={this.handlePlay}
                                // onPause={this.handlePause}
                                // onBuffer={() => console.log('onBuffer')}
                                // onSeek={(e) => console.log('onSeek', e)}
                                // onError={(e) => console.log('onError', e)}
                                // onProgress={this.handleProgress}
                                // onDuration={this.handleDuration}
                                // onEnded={this.handleEnded}
                            />
                        </div>

                        <div className="flex justify-between w-full sm:w-1/2 mx-auto mt-6 my-2 p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
                            <label htmlFor="volume" className="mr-2">
                                Volume
                            </label>
                            <input
                                className="dark:border-gray-500"
                                name="volume"
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={volume}
                                onChange={this.handleVolumeChange}
                            />
                        </div>

                        <div className="flex justify-between w-full sm:w-1/2 mx-auto p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
                            <label htmlFor="seek" className="mr-2">
                                Seek
                            </label>
                            <input
                                className="dark:border-gray-500"
                                name="seek"
                                type="range"
                                min={0}
                                max={0.999999}
                                step="any"
                                value={played}
                                onMouseDown={this.handleSeekMouseDown}
                                onTouchStart={this.handleSeekMouseDown}
                                onChange={this.handleSeekChange}
                                onMouseUp={this.handleSeekMouseUp}
                                onTouchEnd={this.handleSeekMouseUp}
                            />
                        </div>
                    </div>

                    <button
                        className="mt-8 px-4 py-2 font-bold rounded shadow dark:bg-gray-100 dark:hover:bg-gray-200 active:bg-blue-500"
                        onClick={this.handleToggleDevControls}
                    >
                        {this.state.devControls ? 'Hide' : 'Show'} Dev Controls
                    </button>
                </div>
                <div
                    className="text-left dark:text-white"
                    style={{
                        display: this.state.devControls ? 'block' : 'none',
                    }}
                >
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <label htmlFor="controls">HTML Controls</label>
                                </th>
                                <td>
                                    <input
                                        id="controls"
                                        type="checkbox"
                                        checked={controls}
                                        onChange={this.handleToggleControls}
                                    />
                                    <em>&nbsp; Requires player reload</em>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="muted">Muted</label>
                                </th>
                                <td>
                                    <input
                                        id="muted"
                                        type="checkbox"
                                        checked={muted}
                                        onChange={this.handleToggleMuted}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor="loop">Loop</label>
                                </th>
                                <td>
                                    <input id="loop" type="checkbox" checked={loop} onChange={this.handleToggleLoop} />
                                </td>
                            </tr>
                            <tr>
                                <th>Played</th>
                                <td>
                                    <progress max={1} value={played} />
                                </td>
                            </tr>
                            <tr>
                                <th>Loaded</th>
                                <td>
                                    <progress max={1} value={loaded} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <section className="section">
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
                                    <td>
                                        <Duration seconds={duration} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>elapsed</th>
                                    <td>
                                        <Duration seconds={duration * played} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>remaining</th>
                                    <td>
                                        <Duration seconds={duration * (1 - played)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        )
    }
}

export default Player
