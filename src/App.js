import React, { Fragment } from 'react';
import { Cards, Charts, CountryPicker } from './components';
import styles from './App.module.css'
import { fetchData, fetchSummaryData } from './api';
import coronaImage from './images/image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
class App extends React.Component {
    state = {
        data: {},
        country: '',
        countryCode: ''
    }



    async componentDidMount() {
        // const data = await fetchData();
        const data = await fetchSummaryData();
        this.setState({ data });
    }
    handleCountryChange = async (countrySlug, countryCode) => {

        // const fetchedData = await fetchData(country);
        const fetchedData = await fetchSummaryData(countrySlug);

        // if(fetchedData !== null)
        this.setState({ data: fetchedData, country: countrySlug, countryCode });

        //fetch data
        //set state
    }
    // handleCountryChange = async (country) => {
    //     const fetchedData = await fetchData(country);
    //     this.setState({ data: fetchedData, country: country });
    //     //fetch data
    //     //set state
    // }



    render() {
        const { data, country } = this.state;




        return (

            // <Fragment>
            //     <div className={styles.home}></div>
            //     <Cards data={data} />
            //     <div className={styles.main}>
            //         <div className="container">
            //             <div className="row justify-content-center">
            //                 <CountryPicker handleCountryChange={this.handleCountryChange} />
            //             </div>
            //             <div className="row justify-content-center">
            //                 <Charts data={data} country={country} />
            //             </div>
            //         </div>
            //     </div>
            // </Fragment>
            // <div className={styles.container}
            // // style={{backgroundImage:  `url(require('https://www.countryflags.io/${this.state.countryCode}/flat/64.png'))`}}

            // >
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt='COVID-19' />
              
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />


            <Charts data={data} country={country} />
            </div>

        );
    }
}

export default App;