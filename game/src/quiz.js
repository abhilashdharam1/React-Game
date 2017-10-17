import React, {Component} from 'react';
import QuizOptions from './quizOptions';
import classNames from 'classnames';

class Quiz extends Component {
	constructor(props) {
		super(props);
		let riddle = this.playGame();
		let correct = false;
		let gameOver = false;
		this.state = {riddle};
		this.renderOptions = this.renderOptions.bind(this);
		this.checkResults = this.checkResults.bind(this);
		this.play = this.play.bind(this);
	}

	randomNumber(min,max) {
		return Math.floor(Math.random() * (max-min + 1)) + min;
	}

	generateRandomOptions(sum) {
		let resultArray = [];
		let randomNumberArray = [];

		while(randomNumberArray.length <= 3) {
			let randomNumber = this.randomNumber(1,19);
			if(randomNumberArray.indexOf(randomNumber) > -1) continue;
			randomNumberArray.push(randomNumber);
		}

		for(let i = 0; i < 3; i++) {
			let addSubtract = this.randomNumber(0,1);
			let result = sum;
			if(addSubtract === 1) {
			//add number to the result
			result += randomNumberArray[i];
			resultArray.push(result);
			} else {
			//subtract number to the result
			result -= randomNumberArray[i];
			resultArray.push(result);
			}
		}
		return resultArray;
	}

	checkResults(option) {
		if(this.state.riddle.output === option) {
			this.setState({correct: true, gameOver: true})
		} else {
			this.setState({correct: false, gameOver: true})
		}
	}

	playGame() {
		let field1 = this.randomNumber(20,50);
		let field2 = this.randomNumber(20,50);
		let result = field1 + field2;
		let resultArray = this.generateRandomOptions(result);
		resultArray.push(result);
		resultArray.sort(function(a,b) {return 0.5 - Math.random()});
		let riddle = {
			resultArray: resultArray,
			field1: field1,
			field2: field2,
			output: result
		}
		if(this.state && this.state.gameOver) {
			this.setState({riddle: riddle});
		} else {
		return riddle;
		}
	}

	renderMessage() {
		if(this.state.correct) {
			return <h3>Good Job! Hit the button below to play Again.</h3>
		} else {
			return <h3>ohhh noooo! Hit the button below to play Again.</h3>
		}
	}

	play() {
		this.setState({correct: false, gameOver: false});
		this.playGame();
	}
	
	renderOptions() {
		return(
			<div className="options">
				{this.state.riddle.resultArray.map((option,i) => 
					<QuizOptions option={option} key={i} checkResults={(option) => this.checkResults(option)}/>
				)}	
			</div>
			);
		}
	
	render() {
		return(
		<div className = "quiz">
			<div className = "quiz-content">
			<p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span>?</p>
			{this.renderOptions()}
			</div>
			Correct: {this.state.correct ? "True" : "False"}<br/>
			Game Over:{this.state.gameOver ? "True" : "False"}
			<div className={classNames('after', {'hide': !this.state.gameOver}, {'wrong animated zoomIn': !this.state.correct}, {'correct animated zoomIn': this.state.correct})}>
				{this.renderMessage()}
			</div>
			<div className="play-again">
				<a className="button" onClick={this.play}>play Again</a>
			</div>
		</div>
		)
	}
}

export default Quiz;