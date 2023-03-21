import React from 'react';
import * as Commons from '../../commons.js';
import * as Constants from '../../constants';
import { Chart } from 'chart.js';

class QuestionWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionWeek: [],
            labels: [],
            data: [],
        }
    }

    fetchQuestionWeek = () => {
        Commons.executeFetch(Constants.FULL_SURVEYREPLIES_WEEK_API_URI, 'GET', this.setQuestionWeek);
    }

    setQuestionWeek = (questionWeekToSet) => {
        const labels = questionWeekToSet.map(q => q.date).reverse();
        const data = questionWeekToSet.map(q => q.number).reverse();
        this.setState({ questionWeek: questionWeekToSet, labels, data }, () => {
            const canvasRef = this.refs.canvas;

            // Crea un nuovo grafico con Chart.js
            const chart = new Chart(canvasRef, {
                type: 'line',
                data: {
                    labels: this.state.labels,
                    datasets: [
                        {
                            label: 'Questionari Compilati negli ultimi 7 giorni',
                            data: this.state.data,
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2
                        }
                    ]
                },
                // options: {
                //     scales: {
                //         yAxes: [{
                //             ticks: {
                //                 beginAtZero: true,
                //                 fontFamily: "'Arial', sans-serif",
                //                 fontSize: 40,
                //                 min:0,
                //                 max:100,
                //                 stepSize:1
                //             }
                //         }]
                //     }
                // }
            });
        });
    }

    componentDidMount() {
        this.fetchQuestionWeek();
    }

    render() {
        return (
            <div style={{ width: "500px", height: "300px", margin: "20px" }}>
                <canvas ref="canvas"></canvas>

            </div>
        );
    }
}
export default QuestionWeek;