import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api';
import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();

    }, [setFetchedCountries]);

    const handleCountry = (e) => {
      let country =   fetchedCountries.find(country => country.Country === e.target.value);
        handleCountryChange(country?.Slug, country?.ISO2);
    }
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e) => handleCountry(e)}>
                <option value=''>Global</option>
                {fetchedCountries.map((country, idx) => <option key={idx} value={country.Country}>{country.Country}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;