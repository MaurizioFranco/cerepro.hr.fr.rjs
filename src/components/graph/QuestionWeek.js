import React, { Component } from 'react';
import * as Commons from '../../commons.js';
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
        Commons.executeFetch('http://centauri.proximainformatica.com/cerepro.hr.backend/dev/api/v1/surveyreply/lastweek', 'GET', this.setQuestionWeek);
    }

    setQuestionWeek = (questionWeekToSet) => {
        Commons.debugMessage("setCandidates - START - candidatesToSet: " + questionWeekToSet);
        const labels = questionWeekToSet.map(q => q.date);
        const data = questionWeekToSet.map(q => q.number);
        this.setState({ questionWeek: questionWeekToSet, labels, data }, () => {
            const canvasRef = this.refs.canvas;

            // Crea un nuovo grafico con Chart.js
            const chart = new Chart(canvasRef, {
                type: 'line',
                data: {
                    labels: this.state.labels,
                    datasets: [
                        {
                            label: 'Questionario Compilato negli ultimi 7 giorni',
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
        console.log(this.state.questionWeek);

    }

    componentDidMount() {
        this.fetchQuestionWeek();
    }

    render() {
        return (
            <div style={{ width: "1000px", height: "500px" , margin:"auto" }}>
                <canvas ref="canvas"></canvas>

            </div>
        );
    }
}
export default QuestionWeek;