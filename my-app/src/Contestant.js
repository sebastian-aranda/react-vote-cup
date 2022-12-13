import React, { useState, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './Contestant.module.css';
import { competitionStatuses } from './Constants';

const SECONDS_FOR_CONFIRMATION = 3;

const Contestant = ({ id, name, description, status, image, winner = false, competitionStatus, handleOpenVotation, currentVotes = 0 }) => {
    const [votes, setVotes] = useState(currentVotes);
    const [msCounter, setMsCounter] = useState(0);

    let counter = 0;
    let timerInterval = useRef();
    let confetti = null;
    let contestantRef = null;

    const timer = (start) => {
        //console.log("tick tack");
        if (start === true && counter >= 1) {
            timerInterval.current = setInterval(() => {
                //console.log(counter);
                counter += 1;
                setMsCounter(counter => counter + 1);
                if (counter >= SECONDS_FOR_CONFIRMATION) {
                    //console.log("VOTO RECIBIDO");
                    setVotes(votes => votes + 1);
                }
            }, 1000);
        } else {
            counter = 0;
            setMsCounter(0);
        }
    };

    useEffect(() => {
        console.log(`New vote on ${name}: ${votes}!`);
    }, [votes]);

    useEffect(() => {
        if (confetti && winner) {
            contestantRef.scrollIntoView({block: "end"});
            setTimeout(() => {
                confetti({particleCount: Math.ceil(Math.random() * 1000), spread: 180});
            }, 400);
        }
    }, [winner]);

    const mouseUp = () => {
        timer(false);
        clearInterval(timerInterval.current);
    };

    const mouseDown = () => {
        counter = 1;
        timer(true);
    };

    const validateVote = () => {
        return true;
    };

    const getInstance = (instance) => {
        confetti = instance;
    };

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    };

    return (
        <Card ref={(ref) => { contestantRef = ref; }} className={styles.container} sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {winner && <>
                <ReactCanvasConfetti
                    style={style}
                    refConfetti={getInstance}/>
                <p className={styles.trophySection}>🏆</p>
            </>}
            <CardActions>
                { competitionStatuses[competitionStatus] === 'In progress' && <Button variant="contained" onClick={() => validateVote() && handleOpenVotation(id)}>Vote 🏆</Button> }
            </CardActions>
        </Card>
    );
}

export default Contestant;
