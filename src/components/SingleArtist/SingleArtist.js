import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from "react-router-dom";
import Link from '@material-ui/core/Link';



const useStyles = makeStyles({
    root: {
        width: 345,
        marginBottom: "20px"
    },
    name: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});

const SingleArtist = props => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="240"
                        image={props.src}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3" className={classes.name}>
                            {props.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={props.click}>
                        <Link component={RouterLink}  to={'/artist/' + props.id}>Discography</Link>
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default SingleArtist;