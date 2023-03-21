import React from 'react';
import * as Commons from '../../commons.js';
import * as Constants from '../../constants';
import { Chart } from 'chart.js';

class QuestionMonth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionMonth: [],
            labels: [],
            data: [],
        }
    }

    fetchQuestionMonth = () => {
        Commons.executeFetch(Constants.FULL_SURVEYREPLIES_MONTH_API_URI, 'GET', this.setQuestionMonth);
    }

    setQuestionMonth = (questionMonthToSet) => {
        const labels = questionMonthToSet.map(q => q.date).reverse();
        const data = questionMonthToSet.map(q => q.number).reverse();
        this.setState({ questionMonth: questionMonthToSet, labels, data }, () => {
            const canvasRef = this.refs.canvas;

            // Crea un nuovo grafico con Chart.js
            const chart = new Chart(canvasRef, {
                type: 'line',
                data: {
                    labels: this.state.labels,
                    datasets: [
                        {
                            label: 'Questionari Compilati negli ultimi 30 giorni',
                            data: this.state.data,
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2
                        }
                    ]
                },
            });
        });
    }

    componentDidMount() {
        this.fetchQuestionMonth();
    }

    render() {
        return (
            <div style={{ width: "500px", height: "300px" , margin:"20px" }}>
                <canvas ref="canvas"></canvas>
            </div>
        );
    }
}
export default QuestionMonth;