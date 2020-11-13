import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import YouTube from "react-youtube";
import IconButton from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        width: "auto",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
}));

const SimpleModal = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div  className={classes.paper}>
            <YouTube videoId={props.video}/>
        </div>
    );

    return (
        <div>
            <IconButton color="primary" component="span" disabled={props.on}>
                <YouTubeIcon onClick={handleOpen}/>
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
            >
                {body}
            </Modal>
        </div>
    );
}

export default SimpleModal;