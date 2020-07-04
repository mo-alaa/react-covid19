import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({  data , country }) => {

 

    const [dailyData, setDailyData] = useState({});
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    if(!data)
        return `Sorry no data yet for ${country}`;
    
const {DailyData} = data;


   

    const lineChart = (
        DailyData ?
            <Line
                data={{
                    labels: DailyData.map(dailyData  => new Date(dailyData.Date).toLocaleDateString('en-GB')),
                    datasets: [
                        {
                            data: DailyData.map(({ Confirmed }) => Confirmed),
                            label: 'Confirmed',
                            borderColor: '#3333ff',
                            fill: true
                        },
                        {
                            data: DailyData.map(({ Deaths }) => Deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        },
                        // {
                        //     data: DailyData.map(({ Recovered }) => Recovered),
                        //     label: 'Recovered',
                        //     borderColor: 'green',
                        //     backgroundColor: 'rgba(0,255,0,0.5)',
                        //     fill: true
                        // }
                    ]
                }}
            >

            </Line>
            : null
    );

    const countryLineChart = (
        DailyData ?
            <Line
                data={{
                    labels: DailyData.map(dailyData => new Date(dailyData.Date).toLocaleDateString('en-GB')),
                    datasets: [
                        {
                            data: DailyData.map(({ Confirmed }) => Confirmed),
                            label: 'Confirmed',
                            borderColor: '#3333ff',
                            fill: true
                        },
                        {
                            data: DailyData.map(({ Deaths }) => Deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        },
                        {
                            data: DailyData.map(({ Recovered }) => Recovered),
                            label: 'Recovered',
                            borderColor: 'green',
                            backgroundColor: 'rgba(0,255,0,0.5)',
                            fill: true
                        }
                    ]
                }}
            >

            </Line>
            : null
    );

    // const barChart = (
    //     confirmed ?
    //         <Bar
    //             data={{
    //                 labels: ['Infected', 'Recovered', 'Deaths'],
    //                 datasets: [{
    //                     label: 'People',
    //                     backgroundColor: [
    //                         'rgba(0,0,255,0.5)',
    //                         'rgba(0,255,0,0.5)',
    //                         'rgba(255,0,0,0.5)'
    //                     ],
    //                     data: [confirmed.value, recovered.value, deaths.value]
    //                 }],
    //             }}
    //             options={{
    //                 legend: { display: false },
    //                 title: { display: true, text: `Current state in ${country}` },
    //             }}
    //         >

    //         </Bar>

    //         : null
    // );

    return (

        <div className={styles.container}>
            {country ? countryLineChart : lineChart}
            {/* {countryLineChart} */}
        </div>
    );
}

export default Charts;