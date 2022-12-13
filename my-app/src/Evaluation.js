import React  from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Stepper from './Stepper';
import styles from './Evaluation.module.css';

const Evaluation = ({ id, questions, formData, handleVotation, handleDraft }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleVotation(id);
    };

    const handleInputChange = (item, value) => {
        handleDraft(id, {...formData, [item]: value});
    };

    const handleFilesChange = (files) => {
        handleDraft(id, {...formData, images: files});
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            {/* <Stepper></Stepper> */}
            {questions.map((item) => (
                <div className={styles.item} key={item.label}>
                    <div>{item.question}</div>
                    <div className={styles.alternatives}>
                        {item.type === 'score' &&
                            <FormControl
                                sx={{width: '100%'}}>
                                <RadioGroup
                                    row
                                    aria-labelledby="radio-alternatives"
                                    name="radio-alternatives"
                                    sx={{justifyContent: 'space-around'}}
                                    value={formData[item.question] ?? item.options[0].label}
                                    onChange={(e) => handleInputChange(
                                        item.question, 
                                        e.target.value
                                    )}>
                                
                                    {item.options.map(({label, value}) => (
                                        <FormControlLabel
                                            key={item.question + label}
                                            value={label}
                                            control={<Radio />}
                                            label={label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        }
                        {item.type === 'free' &&
                            <TextField
                                label="Answer"
                                type="text"
                                fullWidth
                                multiline
                                maxRows={4}
                                onChange={(e) => handleInputChange(
                                    item.question, 
                                    e.target.value
                                )}/>
                        }
                    </div>
                </div>
            ))}
            {!formData.closed &&
                <div className='clearfix'>
                    <div className={styles.submit}>
                        {formData.images &&
                            formData.images.map((f) => (
                                <span key={`${f.name}`}>{f.name.length > 10 ? f.name.substring(0,10)+'...' : f.name}</span>
                            ))
                        }
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input
                                onChange={(e) => {
                                    const filesArray = [...e.target.files];
                                    handleFilesChange(
                                        filesArray.length > 3 ? filesArray.slice(0,3) : filesArray
                                    );
                                }}
                                hidden
                                multiple
                                accept="image/*"
                                type="file" />
                            <PhotoCamera />
                        </IconButton>
                        <Button type="submit" variant="contained">Vote</Button>
                    </div>
                </div>
            }
        </form>
    );
}

export default Evaluation;
