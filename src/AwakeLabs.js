import React from 'react';
import Plot from 'react-plotly.js';

class AwakeLabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: [],
            anxietyLevels: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const pointerToThis = this;
        const selectStatement = "select  \nre.\"data\"\nfrom report as re\nwhere re.\"participantId\" = '2'\nand re.\"createdAt\" between 1618912800000 and 1620878399000";
        let timesFunction = [];
        let anxietyLevelsFunction = [];

        fetch('awakelabs.json')
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    for (var i = 0; i < data[selectStatement].length; i++) {
                        console.log(data[selectStatement][i]["anxietyLevel"]);  
                        timesFunction.push(data[selectStatement][i]["time"]);
                        anxietyLevelsFunction.push(data[selectStatement][i]["anxietyLevel"]);
                    } 
                    pointerToThis.setState({
                        times: timesFunction,
                        anxietyLevels: anxietyLevelsFunction,
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <Plot
                    data={[
                        {
                            x: this.state.times,
                            y: this.state.anxietyLevels,
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: '#2f8ac4'},
                        }
                    ]}
                    layout={{width: 900, height: 550, title: "Anxiety Levels Over Time"
                }}
                />
            </div>
        )
    }
}

export default AwakeLabs;
