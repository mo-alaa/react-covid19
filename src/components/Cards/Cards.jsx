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
        // <div className={styles.divider}>
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-md-4">
        //                 <DividerWrapper className={styles.dividerOne}>
        //                     <h2 className={styles.cardHeader}>Infected</h2>
        //                     <p className={styles.cardDesc}>
        //                         <CountUp start={0} end={Confirmed} duration={2.5} separator=',' />
        //                     </p>
        //                     <p className={styles.cardDesc}>
        //                         {new Date(LatestUpdate).toDateString()}
        //                     </p>
        //                 </DividerWrapper>
        //             </div>
        //             <div className="col-md-4">
        //                 <DividerWrapper className={styles.dividerTwo}>
        //                     <h2 className={styles.cardHeader}>Recovered</h2>
        //                     <p className={styles.cardDesc}>
        //                         <CountUp start={0} end={Recovered} duration={2.5} separator=',' />
        //                     </p>
        //                     <p className={styles.cardDesc}>
        //                         {new Date(LatestUpdate).toDateString()}
        //                     </p>
        //                 </DividerWrapper>
        //             </div>
        //             <div className="col-md-4">
        //                 <DividerWrapper className={styles.dividerThree}>
        //                     <h2 className={styles.cardHeader}>Deaths</h2>
        //                     <p className={styles.cardDesc}>
        //                         <CountUp start={0} end={Deaths} duration={2.5} separator=',' />
        //                     </p>
        //                     <p className={styles.cardDesc}>
        //                         {new Date(LatestUpdate).toDateString()}
        //                     </p>
        //                 </DividerWrapper>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Infected</Typography>
                        <Typography variant='h5'>
                            <CountUp start={0} end={Confirmed} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color='textSecondary'>{new Date(LatestUpdate).toDateString()}</Typography>
                        {/* <Typography variant='body2'>Number of active cases of Covid-19</Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>Recovered</Typography>
                        <Typography variant='h5'> <CountUp start={0} end={Recovered} duration={2.5} separator=',' /></Typography>
                        <Typography color='textSecondary'>{new Date(LatestUpdate).toDateString()}</Typography>
                        {/* <Typography variant='body2'>Number of recoveries from Covid-19</Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent >
                        <Typography color='textSecondary' gutterBottom>Deaths</Typography>
                        <Typography variant='h5'> <CountUp start={0} end={Deaths} duration={2.5} separator=',' /></Typography>
                        <Typography color='textSecondary'>{new Date(LatestUpdate).toDateString()}</Typography>
                        {/* <Typography variant='body2'>Number of deaths caused by Covid-19</Typography> */}
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;