import React, {useEffect} from 'react';
import {fetchArtists} from "../../store/actions";
import SingleArtist from "../../components/SingleArtist/SingleArtist";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    artists: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: "40px"
    }
}));

const Artists = () => {
    const classes = useStyles();
    const artists = useSelector(state => state.artists);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const artistsList = artists.map(artist => {
        return (
            <SingleArtist
                key={artist._id}
                src={'http://localhost:8000/uploads/' + artist.image}
                name={artist.name}
                id={artist._id}
            />
        )
    });
    return (
        <Container maxWidth="lg">
            <div className={classes.artists}>
                {artistsList}
            </div>
        </Container>
    );
};

export default Artists;