import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Poster from './Poster';
import Login from './Login';
import Contestant from './Contestant';
import Evaluation from './Evaluation';
import Results from './Results';
import styles from './Competition.module.css';
import { competitionStatuses } from './Constants';
import { fakeResults2 } from './Data';
import logoApp from './logo.svg';

const Competition = ({ id, name, date, place, status, logo, managers = [], categories = [], sponsors = [], contestants = []}) => {
    const [token, setToken] = useState();
    const [open, setOpen] = useState(false);
    const [formsData, setFormsData] = useState({});
    const [selectedContestantId, setSelectedContestantId] = useState();
    
    const [winnerId, setWinnerId] = useState();
    const [signUpId, setSignUpId] = useState();
    
    const handleOpen = (contestantId) => {
        setOpen(true);
        setSelectedContestantId(contestantId);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedContestantId();
    };

    useEffect(() => {
        const quantityEvaluations = contestants.length * categories.length;
        const quantityCompleted = Object.values(formsData).filter((f) => f.closed).length
        console.log(`Evaluations: ${quantityCompleted}/${quantityEvaluations}`);
        if (quantityCompleted === quantityEvaluations) {
            const results = [];
            for (let form in formsData) {
                const initialResult = 0;
                const finalResult = Object.values(formsData[form]).reduce(
                    (prev, current) => {
                        return Number.isInteger(prev) ? prev + current : current;
                    },
                    initialResult
                );
                results.push({formId: form, result: finalResult});
            }
            const maxResult = Math.max(...results.map((r) => r.result));
            const winnerContestant = results.find((r) => r.result === maxResult).formId.split('-')[0].split('C')[1];
            console.log("WINNER", winnerContestant);
            setWinnerId(winnerContestant);
        }
    }, [formsData]);

    const formatId = (evaluationId) => {
        return `C${selectedContestantId}-E${evaluationId}`
    };

    const handleDraft = (evaluationId, formData) => {
        setFormsData(formsData => ({
            ...formsData,
            [formatId(evaluationId)]: formData,
        }));
    };

    const handleVotation = (evaluationId) => {
        setFormsData(formsData => ({
            ...formsData,
            [formatId(evaluationId)]: {...formsData[formatId(evaluationId)], closed: true},
        }));

        const contestantClosedEvaluations = Object.keys(formsData).filter((e) => {
            return e.includes(`C${selectedContestantId}`) && formsData[e].closed;
        });

        if (contestantClosedEvaluations.length >= categories.length - 1) {
            handleClose();   
        }
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        maxHeight: '80%',
        overflowY: 'scroll',
        width: '720px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if (signUpId) status = 2;
    if (winnerId) status = 3;

    return (
        <>
            {competitionStatuses[status] === 'Validated' &&
                <Poster setSignUp={setSignUpId} logo={logo} categories={categories} sponsors={sponsors}/>
            }
            {competitionStatuses[status] === 'In progress' && !token &&
                <Login  setToken={setToken}/>
            }
            {(competitionStatuses[status] === 'In progress' || competitionStatuses[status] === 'Closed') && token &&
                <>
                    <header className="App-header">
                        <img src={logoApp} className="App-logo" alt="logo" />
                    </header>
                    <div className={styles.container}>
                        {contestants.map((c) => (
                            <Contestant
                                key={`c${c.id}`}
                                competitionStatus={status}
                                handleOpenVotation={handleOpen}
                                winner={winnerId == c.id}
                                {...c}/>
                        ))}
                    </div>
                    {competitionStatuses[status] === 'Closed' && <a style={{color: 'white'}} href='#' onClick={() => handleOpen()}>See results</a>}
                    <footer>Non aliquip commodo ea non.Est tempor fugiat deserunt laboris anim est elit anim consectetur dolor esse voluptate amet. Occaecat sit excepteur officia minim fugiat est commodo tempor exercitation veniam. Proident veniam velit enim incididunt aliquip elit. Culpa occaecat ipsum mollit quis culpa mollit cupidatat veniam. Cupidatat laboris enim est exercitation anim duis. Dolore nostrud ipsum veniam reprehenderit.</footer>
                </>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Fade
                        in={open}>
                        <Box sx={style}>
                            {competitionStatuses[status] === 'In progress' &&
                                <>
                                    {categories.map((cat) => (<>
                                        <h2 className={styles.categoryName}>{cat.name}</h2>
                                        <Evaluation
                                            key={`e${cat.evaluation.id}`}
                                            handleVotation={handleVotation}
                                            handleDraft={handleDraft}
                                            formData={formsData[formatId(cat.evaluation.id)] ?? {}}
                                            {...cat.evaluation}/>
                                    </>))}
                                </>
                            } 
                            {competitionStatuses[status] === 'Closed' && <Results winner="Test 1" items={fakeResults2}/>}
                        </Box>
                    </Fade>
            </Modal>
        </>
    );
}

export default Competition;
