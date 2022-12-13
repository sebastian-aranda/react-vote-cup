import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import Popover from '@mui/material/Popover';
import 'react-circular-progressbar/dist/styles.css';
import styles from './Results.module.css'

const Results = ({ winner, items = [] }) => {
    const [animatedScores, setAnimatedScores] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('');

    const savedCallback = useRef();

    const contestants = items[0].contestants.map((c) => c.contestant);
    const style = { gridTemplateColumns: 'minmax(100px, 2fr) '+'minmax(70px, 1fr) '.repeat(items[0].contestants.length) };

    function callback() {
        setAnimatedScores(scores => {
            const newScores = items.map(() => []);
            items.forEach((item, i) => {
                if (item.type !== "score") return;
                item.contestants.forEach((_, j) => {
                    if (scores[i][j] < items[i].contestants[j].mean_score) {
                        newScores[i][j] = scores[i][j] + 1;
                    } else {
                        newScores[i][j] = scores[i][j];
                    }
                });
            });
            return newScores;
        });
    };

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const scores = items.map(() => []);
        items.forEach((item, i) => {
            item.contestants.forEach(() => {
                scores[i].push(0);
            });
        });
        setAnimatedScores(scores);
    }, [items]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        let interval = setInterval(tick, 5);
        return () => clearInterval(interval);
    }, []);

    const handleTextAnswerClick = (text, currentTarget) => {
        setAnchorEl(currentTarget);
        setPopoverContent(text);
    };

    const renderScoreResult = (item, index) => {
        const style = { gridTemplateColumns: 'minmax(100px, 2fr) '+'minmax(70px, 1fr) '.repeat(item.contestants.length) };
    
        return (
            <div style={style} className={styles.questionContainer}>
                <div>{item.question}</div>
                {item.contestants.map((_, j) => {
                    const percentage = animatedScores[index]?.[j] ?? 0;
                    let color = 'green';
                    if (percentage < 70) {
                        color = 'yellow';
                    }
                    if (percentage < 40) {
                        color = 'red';
                    }
                    return (
                    <div style={{ width: 70, height: 70, justifySelf: 'center'}}>
                        <CircularProgressbar
                            styles={buildStyles({
                                // Colors
                                pathColor: `${color}`,
                            })}
                            value={percentage ?? 0}
                            text={`${percentage ?? 0}%`} />
                    </div>
                )})}
            </div>
        );
    };
    
    const renderFreeResult = (item) => {
        const style = { gridTemplateColumns: 'minmax(100px, 2fr) '+'minmax(70px, 1fr) '.repeat(item.contestants.length), };
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <div style={style} className={styles.questionContainer}>
                <div>{item.question}</div>
                {item.contestants.map((c, j) => {
                    const resultKey = `${item.question}-${c.contestant}`;
                    return (
                        <div
                            onClick={(e) => handleTextAnswerClick(c.answers, e.currentTarget)}
                            className={styles.textAnswer}>
                            {c.answers.length > 100 ? c.answers.substring(0,100)+'...' : c.answers}
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}>
                                <div className={styles.popoverContent}>
                                    {popoverContent}
                                </div>
                            </Popover>
                        </div>
                    )
                })}
            </div>
        );
    };

    return (<div style={{overflowX: 'scroll'}}>
        <div style={style} className={styles.questionContainer}>
            <div></div>
            {contestants.map((c) => <div style={{textAlign: 'center'}}><div style={{visibility: !winner || winner !== c ? 'hidden' : 'visible'}} className={styles.trophy}>🏆</div><span>{c}</span></div>)}
        </div>
        {items.map((item, i) => {
            if (item.type === "score") {
                return renderScoreResult(item, i)
            }
            return renderFreeResult(item)
        })}
    </div>);
};

export default Results;
