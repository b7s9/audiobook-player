import React, { Component } from 'react'
import Prompts from '../affirmation-prompts.json'

class AffirmationComposer extends Component {
    constructor(props) {
        super(props)
        this.prompts = Prompts.prompts
        this.state = {
            selectedPrompt: this.getRandomItemInArray(this.prompts),
            affirmation: '',
        }
    }

    saveAffirmationToLocalStorage = () => {
        localStorage.setItem(this.props.storageKey, this.state.affirmation)
        this.props.hideMe()
    }

    handleAffirmationChange = (e) => {
        this.setState({ affirmation: e.target.value })
    }

    handlePromptSelection = (e) => {
        this.setState({
            selectedPrompt: {
                index: e.target.value,
                value: this.prompts[e.target.value],
            },
        })
    }

    getRandomPrompt = () => {
        const randomPrompt = this.getRandomItemInArray(this.prompts)
        this.setState({
            selectedPrompt: randomPrompt,
        })
    }

    getRandomItemInArray = (arr) => {
        const i = Math.floor(Math.random() * arr.length)
        return {
            value: arr[i],
            index: i,
        }
    }

    render() {
        return (
            <div className="affirmation mx-auto max-w-prose">
                <h2 className="font-serif my-6 text-right font-bold text-xl text-gray-800 dark:text-gray-100">
                    Before you drift off...
                </h2>

                <button
                    className="bg-gray-800 text-gray-200 capitalize px-4 py-1 text-sm rounded shadow hover:bg-black"
                    onClick={this.getRandomPrompt}
                >
                    Random prompt
                </button>

                <select
                    className="block w-full my-4 py-1 text-md bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-400"
                    value={this.state.selectedPrompt.index}
                    onChange={this.handlePromptSelection}
                >
                    {this.prompts.map((prompt, index) => {
                        return (
                            <option key={index} value={index}>
                                {prompt}
                            </option>
                        )
                    })}
                </select>

                <p className="text-xl dark:text-gray-300">{this.state.selectedPrompt.value}</p>

                <textarea
                    rows={4}
                    className="block my-4 p-4 w-full bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded
					focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="You did a great job today!"
                    onChange={this.handleAffirmationChange}
                ></textarea>
                <button
                    className="px-4 py-2 bg-blue-700 font-bold text-white text-lg rounded shadow hover:bg-blue-800 active:bg-blue-500"
                    onClick={this.saveAffirmationToLocalStorage}
                >
                    Save
                </button>

                <picture className="w-1/2 mx-auto block mt-6 lg:mt-12">
                    <source media="(prefers-color-scheme:dark)" srcSet="logo-light.png" />
                    <source media="(prefers-color-scheme:light)" srcSet="logo-dark.png" />
                    <img src="logo-light.png" alt="Logo" />
                </picture>
            </div>
        )
    }
}

export default AffirmationComposer // Don’t forget to use export default!
