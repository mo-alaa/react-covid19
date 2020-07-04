import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';
import styled from 'styled-components';

const Cards = ({ data }) => {

    if (!data)
        return 'Sorry no data yet'
    const { Confirmed, Recovered, Deaths, LatestUpdate } = data;

    if (!Confirmed) {
        return 'Loading...';
    }

    const DividerWrapper = styled.div`
        padding: 40px 20px 40px 20px;
        position: relative;
        bottom: 40px;
        transition: all 0.4s ease-in;
        &:hover {
            bottom: 60px;
            cursor: pointer;
            }
    `;

    return (
        <div className={styles.divider}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <DividerWrapper className={styles.dividerOne}>
                            <h2 className={styles.cardHeader}>Infected</h2>
                            <p className={styles.cardDesc}>
                                <CountUp start={0} end={Confirmed} duration={2.5} separator=',' />
                            </p>
                            <p className={styles.cardDesc}>
                                {new Date(LatestUpdate).toDateString()}
                            </p>
                        </DividerWrapper>
                    </div>
                    <div className="col-md-4">
                        <DividerWrapper className={styles.dividerTwo}>
                            <h2 className={styles.cardHeader}>Recovered</h2>
                            <p className={styles.cardDesc}>
                                <CountUp start={0} end={Recovered} duration={2.5} separator=',' />
                            </p>
                            <p className={styles.cardDesc}>
                                {new Date(LatestUpdate).toDateString()}
                            </p>
                        </DividerWrapper>
                    </div>
                    <div className="col-md-4">
                        <DividerWrapper className={styles.dividerThree}>
                            <h2 className={styles.cardHeader}>Deaths</h2>
                            <p className={styles.cardDesc}>
                                <CountUp start={0} end={Deaths} duration={2.5} separator=',' />
                            </p>
                            <p className={styles.cardDesc}>
                                {new Date(LatestUpdate).toDateString()}
                            </p>
                        </DividerWrapper>
                    </div>
                </div>
            </div>
        </div>

      
    );
}

export default Cards;