import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtist} from "../../store/actions";
import SingleAlbum from "../../components/SingleAlbum/SingleAlbum";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    albums: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: "40px"
    }
}));

const Artist = props => {
    const classes = useStyles();
    const albums = useSelector(state => state.albums);
    const artist = useSelector(state => state.artist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtist(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const albumList = albums.map(album => {
        return (
            <SingleAlbum
                key={album._id}
                name={album.name}
                year={album.year}
                id={album._id}
                count={album.count}
                src={'http://localhost:8000/uploads/' + album.image}
            />
        )
    });

    return (
        <div>
            <Container maxWidth="lg">
                <h2>{artist}</h2>
                <div className={classes.albums}>
                    {albumList}
                </div>
            </Container>
        </div>
    );
};

export default Artist;