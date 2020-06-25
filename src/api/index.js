import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';


export const fetchSummaryData = async (country) => {

    try {
        if (country) {
            const { data } = await axios.get(`https://api.covid19api.com/dayone/country/${country}`);

            if (data.length === 0) return null;

            let recentDate = data[data.length - 1].Date;
            const province = data.find(({ Province }) => Province !== "");
            const latestData = province ? data.filter(({ Date, Province }) => Date === recentDate && Province !== '') : data.filter(({ Date, Province }) => Date === recentDate);


            if (province) {
                //create hashmap to carry the chart data
                let chartHashmap = new Map();
                data.forEach(({ Date, Province }) => {
                    if (!chartHashmap.has(Date)) {
                        chartHashmap.set(Date, { Confirmed: 0, Recovered: 0, Deaths: 0, Date });
                    }
                });//now chartHashmap has unique date, we need to fill them with data

                data.forEach(({ Confirmed, Recovered, Deaths, Date }) => {
                    chartHashmap.set(Date, {
                        Confirmed: chartHashmap.get(Date).Confirmed + Confirmed,
                        Recovered: chartHashmap.get(Date).Recovered + Recovered,
                        Deaths: chartHashmap.get(Date).Deaths + Deaths,
                        Date
                    });
                });

                let previousDateKey = '';
                for (const [key, value] of chartHashmap.entries()) {
                    if (previousDateKey === '') {
                        previousDateKey = value.Date;
                    }
                    else {
                        chartHashmap.set(value.Date, {
                            Confirmed: chartHashmap.get(value.Date).Confirmed - chartHashmap.get(previousDateKey).Confirmed,
                            Recovered: chartHashmap.get(value.Date).Recovered,
                            Deaths: chartHashmap.get(value.Date).Deaths,
                            Date: chartHashmap.get(value.Date).Date,

                        })
                    }
                }
                //hashmap to array (not the best solution, but to handle the data from server)
                //data is accummulative, but we dont need this.  We need data for each day only
                // let dataList = [];
                // let keys = Array.from(chartHashmap.keys());
                // keys.forEach((key) => {
                //     let value = chartHashmap.get(key);
                //     dataList.push({ Date: key, Confirmed: value.Confirmed, Recovered: value.Recovered, Deaths: value.Deaths });
                // })

                // for (let i = 0; i < dataList.length - 1; i++) {
                //     if (dataList[i + 1].Confirmed > 0) {
                //         dataList[i + 1].Confirmed = dataList[i + 1].Confirmed - dataList[i].Confirmed;
                //     }
                //     if (dataList[i + 1].Recovered > 0) {
                //         dataList[i + 1].Recovered = dataList[i + 1].Recovered - dataList[i].Recovered;
                //     }
                //     if (dataList[i + 1].Deaths > 0) {
                //         dataList[i + 1].Deaths = dataList[i + 1].Deaths - dataList[i].Deaths;
                //     }
                // }
                // for (let i = 0; i < chartHashmap.size; i++) {
                //     console.log(chartHashmap[i]);
                //     // if(i!==chartHashmap.size -1 && chartHashmap[i+1].value.Confirmed !== 0 ){
                //     //     chartHashmap[i+1].value.Confirmed = chartHashmap[i+1].value.Confirmed - chartHashmap[i].value.Confirmed
                //     // }
                // }

                return {
                    Confirmed: sumCases(latestData, 'Confirmed'),
                    Recovered: sumCases(latestData, 'Recovered'),
                    Deaths: sumCases(latestData, 'Deaths'),
                    LatestUpdate: recentDate,
                    DailyData: [...chartHashmap.values()]
                };
            }
            else {
                return {
                    Confirmed: latestData[0].Confirmed,
                    Recovered: latestData[0].Recovered,
                    Deaths: latestData[0].Deaths,
                    LatestUpdate: latestData[0].Date,
                    DailyData: data
                };
            }

        }

        const summaryData = await axios.get(`https://covid19.mathdro.id/api`);
        const { confirmed, recovered, deaths, lastUpdate } = summaryData.data;
        // console.log(data);
        // return {
        //     Confirmed: TotalConfirmed, Recovered: TotalRecovered, Deaths: TotalDeaths, LatestUpdate: new Date()
        // };

        const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);
        const DailyData = data.map((dailyData) => ({
            Confirmed: dailyData.confirmed.total,
            Deaths: dailyData.deaths.total,
            Date: dailyData.reportDate
        }));

        return {
            Confirmed: confirmed.value,
            Recovered: recovered.value,
            Deaths: deaths.value,
            DailyData,
            LatestUpdate: lastUpdate
        };


    } catch (error) {
        console.log(error);
    }
}

let sumCases = (arr, key) => {
    return arr.reduce((a, b) => a + b[key], 0)
}

export const fetchData = async (country) => {
    // let changeableUrl = url;
    // if (country) {
    //     try {
    //         changeableUrl = `https://api.covid19api.com/dayone/country/${country}`;
    //         const { data } = await axios.get(changeableUrl);
    //         return data;
    //     }
    //     catch (error) {

    //     }
    // }
    // else {
    //     try {
    //         const { data: { Global: { TotalConfirmed, TotalRecovered, TotalDeaths } } } = await axios.get(`https://api.covid19api.com/summary`);
    //         return { TotalConfirmed, TotalRecovered, TotalDeaths };
    //     } catch (error) {

    //     }
    // }

}
// export const fetchData = async (country) => {
//     let changeableUrl = url;
//     if (country) {
//         changeableUrl = `${url}/countries/${country}`;
//     }
//     try {
//         const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
//         return { confirmed, recovered, deaths, lastUpdate };
//     } catch (error) {

//     }
// }

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
        console.log(modifiedData);
        return modifiedData;
    } catch (error) {

    }
}

export const fetchCountries = async () => {
    try {

        const { data } = await axios.get(`https://api.covid19api.com/countries`);
        data.sort((a, b) => (a.Country > b.Country) ? 1 : -1)
        return data;
    } catch (err) {

    }
}
// export const fetchCountries = async () => {
//     try {

//         const { data: { countries } } = await axios.get(`${url}/countries`);
//         return countries.map((country) => country.name);
//     } catch (err) {

//     }
// }