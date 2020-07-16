import React, { Component } from 'react';
import "c3/c3.css";
import nusmodsAPI from '../api/nusmodsAPI';
const c3 = require("c3");

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
        this.chart=null
    }

    componentDidUpdate(prevProps) {
        if (this.props.show && !prevProps.show) {
            this.genChart(this.props.data.plotted, this.props.expected, this.props.completed, this.props.data.modules)
        }
    }

    componentDidMount() {
        this.genChart(this.props.data.plotted, this.props.expected, this.props.completed, this.props.data.modules)
    }

    genChart(plotted, expected, completed, mods) {
        expected.then(e => {
            e.unshift("Workload to meet requirement")
            this.chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        plotted,
                        e,
                        completed
                    ],
                    type: 'bar',
                    groups: [['Plotted Workload', 'Workload to meet requirement']],
                    order:null
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: mods,
                        label: 'Modules'
                    },
                    y: {
                        label: 'Workload (hrs)'
                    }
                }
            })
        })
    }

    render() {
        return(<div id={"chart"}></div>)
    }
}

export default Chart