import React, { Component } from 'react';
import * as Commons from '../../commons.js';
import { Chart } from 'chart.js';

class QuestionYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionYear: [],
            labels: [],
            data: [],
        }
    }

    fetchQuestionYear = () => {
        Commons.executeFetch('http://centauri.proximainformatica.com/cerepro.hr.backend/dev/api/v1/surveyreply/lastyear', 'GET', this.setQuestionYear);
    }

    setQuestionYear = (questionYearToSet) => {
        const labels = questionYearToSet.map(q => q.date).reverse();
        const data = questionYearToSet.map(q => q.number).reverse();
        this.setState({ questionYear: questionYearToSet, labels, data }, () => {
            const canvasRef = this.refs.canvas;

            // Crea un nuovo grafico con Chart.js
            const chart = new Chart(canvasRef, {
                type: 'line',
                data: {
                    labels: this.state.labels,
                    datasets: [
                        {
                            label: 'Questionario Compilato nell ultimo anno',
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
        this.fetchQuestionYear();
    }

    render() {
        return (
            <div style={{ width: "1000px", height: "500px" , margin:"auto" }}>
                <canvas ref="canvas"></canvas>

            </div>
        );
    }
}
export default QuestionYear;