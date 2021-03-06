import React, { Component } from 'react'
import ReactPlayer from 'react-player'
// import Duration from './duration'
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
            sleepTimerActive: 0,
            sleepTime: 25,
        }

        this.loadChapter = this.loadChapter.bind(this) // allows me to use this down the inheritance chain

        this.lastChapterKey = this.props.localStorageNamespace + '-lastChapter'
        this.lastBookKey = this.props.localStorageNamespace + '-lastBook'

        this.sleepTimeout = null
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
        this.setState({ playing: false })
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

    setSleepTimer = () => {
        if (this.state.sleepTimerActive) {
            this.setState({ sleepTimerActive: false })
            clearTimeout(this.sleepTimeout)
        } else {
            this.setState({ sleepTimerActive: true })
            this.sleepTimeout = setTimeout(() => {
                this.handlePause()
                this.setState({ sleepTimerActive: false })
            }, this.state.sleepTime * 1000 * 60)
        }
    }

    setSleepTime = (e) => {
        this.setState({ sleepTime: e.target.value, sleepTimerActive: false })
        clearTimeout(this.sleepTimeout)
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
            // played,
            // loaded,
            // duration,
            playbackRate,
            pip,
        } = this.state

        return (
            <div className="mx-auto md:w-full lg:max-w-prose">
                <div>
                    <select
                        className="w-full my-4 p-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                        onChange={this.handleBookSelection}
                    >
                        {data.book.map((book, index) => {
                            return this.renderBookOption(index)
                        })}
                    </select>

                    <h2 className="font-serif font-bold text-2xl md:text-4xl dark:text-gray-100">
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
                                className="px-6 py-4 font-bold text-3xl rounded text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 active:text-blue-500"
                                onClick={this.handleSkipBack}
                            >
                                <div className="block">
                                    <i className="ci-fast_rewind"></i>
                                </div>
                                <div className="block text-sm">-15 sec.</div>
                            </button>

                            <button
                                className="px-6 py-4 font-bold text-6xl rounded text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 active:text-green-500"
                                onClick={this.handlePlayPause}
                            >
                                {playing ? (
                                    <i className="ci-pause_circle_outline"></i>
                                ) : (
                                    <i className="ci-play_arrow"></i>
                                )}
                            </button>

                            <button
                                className="px-6 py-4 font-bold text-3xl rounded text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-400 active:text-blue-500"
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
                                onEnded={this.handleEnded}
                            />
                        </div>
                    </div>

                    <div className="my-4 flex justify-between md:justify-center md:space-x-4">
                        <button
                            className={
                                (this.state.sleepTimerActive
                                    ? 'bg-blue-900 hover:bg-blue-800 text-gray-100'
                                    : 'bg-blue-700 hover:bg-blue-600 text-gray-100') +
                                ' px-4 py-2 font-bold rounded shadow active:bg-blue-500'
                            }
                            onClick={this.setSleepTimer}
                        >
                            {this.state.sleepTimerActive ? 'Stop' : 'Start'} Sleep Timer{' '}
                            {this.state.sleepTimerActive ? (
                                <span className="pl-2">
                                    <i className="ci-moon"></i>
                                </span>
                            ) : (
                                ''
                            )}
                        </button>

                        <select
                            className="p-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                            onChange={this.setSleepTime}
                            value={this.state.sleepTime}
                        >
                            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((number) => {
                                return <option value={number}>{number} min.</option>
                            })}
                        </select>
                    </div>

                    <p className="my-6 text-md md:text-xl md:text-center md:mt-12 font-serif dark:text-gray-100">
                        <span className="font-bold text-gray-500">Bedtime thought: </span>
                        <span>{this.props.affirmation}</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default Player
