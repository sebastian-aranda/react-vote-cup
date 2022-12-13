import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styles from './Poster.module.css';


const Poster = ({ logo, categories = [], sponsors = [], ...props }) => {
    const [openModal, setOpenModal] = useState(false);
    const [signUpData, setSignUpData] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState('');

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleCategoryClick = (category, currentTarget) => {
        setAnchorEl(currentTarget);
        setPopoverContent(category.rules);
    };

    const handleSignUp = () => {
        props.setSignUp(1);
    };

    const changeSignUpData = (prop, value) => {
        setSignUpData(signUpData => ({
            ...signUpData,
            [prop]: value,
        }));
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={styles.posterContainer}>
            <div className={styles.poster}>
                <img className={styles.logo} src={logo} alt="" />
                <h1 className={styles.eventTitle}>Test Competition #1</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eveniet sunt autem tenetur saepe similique! Fugiat eligendi quasi totam! Earum alias quibusdam obcaecati voluptatum sunt in magnam, eos quis minus.</p>
                <h3>Categories</h3>
                <Stack direction="row" spacing={1}>
                    {categories.map((c) => (
                        <Chip
                            key={`c${c.id}`}    
                            onClick={(e) => handleCategoryClick(c, e.currentTarget)}
                            label={c.name}
                            color="primary"
                            variant="outlined"/>)
                    )}
                </Stack>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <div className={styles.popoverContent}>
                        {popoverContent}
                    </div>
                </Popover>
                <h3>Sponsors</h3>
                <div className={styles.sponsorsContainer}>
                    {sponsors.map((s) => <img key={`s${s.id}`} className={styles.sponsor} src={s.image} alt=""/>)}
                </div>
                <Button onClick={handleOpen} sx={{borderRadius: '2em'}} variant="contained">Sign Up!</Button>
            </div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    <Fade
                        in={openModal}>
                        <div className='modalStyle'>
                            <div className={styles.signUpForm}>
                                <TextField
                                    label="Name"
                                    type="text"
                                    onChange={(e) => changeSignUpData('name', e.target.value)}
                                />
                                <TextField
                                    label="City"
                                    type="text"
                                    onChange={(e) => changeSignUpData('city', e.target.value)}
                                />
                                <TextField
                                    label="Review"
                                    type="text"
                                    multiline
                                    maxRows={4}
                                    onChange={(e) => changeSignUpData('review', e.target.value)}
                                />
                                <div className={styles.signUpFooter}>
                                    {signUpData.images &&
                                        signUpData.images.map((f, i) => (
                                            <span key={`${f.name}`}>{f.name.length > 10 ? f.name.substring(0,10)+'...' : f.name}</span>
                                        ))
                                    }
                                    <IconButton color="primary" aria-label="upload picture" component="label">
                                        <input
                                            onChange={(e) => {
                                                const filesArray = [...e.target.files];
                                                changeSignUpData(
                                                    'images', 
                                                    filesArray.length > 3 ? filesArray.slice(0,3) : filesArray
                                                );
                                            }}
                                            hidden
                                            multiple
                                            accept="image/*"
                                            type="file" />
                                        <PhotoCamera />
                                    </IconButton>
                                    <Button onClick={handleSignUp} variant='contained'>Participar</Button>
                                </div>
                            </div>
                        </div>
                    </Fade>
            </Modal>
        </div>
    );
};


Poster.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    sponsors: PropTypes.arrayOf(PropTypes.object)
};


export default Poster;
