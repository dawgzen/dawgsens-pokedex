import React, {useState, useEffect} from 'react';
import {
    Typography,
    CircularProgress,
    Button,
    Toolbar,
    AppBar,
    Card,
    CardMedia,
    CardContent, Grid
} from "@material-ui/core";
import {toFirstCharUppercase} from "../utils";
import {useStyles} from "../styles/PokedexTheme" ;
import colorTypes from "../styles/ColourTypes";
import axios from "axios";

const Pokemon = (props) => {
    const {match, history} = props;
    const {params} = match;
    const {pokemonId} = params;
    const classes = useStyles();

    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const {data} = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);


    const generatePokemonJSX = (pokemon) => {
        const {name, id, species, height, weight, types, stats, abilities} = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        let actualHeight = height * 10;
        let actualWeight = weight / 10;
        return (
            <div>
                <AppBar className={classes.navBar} position="static">
                    <Toolbar className={classes.toolbarContainer}>
                        <a href="/" className={classes.starIcon}>
                            <img src={require("../assets/pika.png")} alt="icon" width={75} height={75}/>
                            <Typography>Home</Typography>
                        </a>
                        <a href="/pokecatch" className={classes.starIcon}>
                            <img src={require("../assets/poke.png")} alt="icon" width={75} height={75}/>
                            <Typography>PokéCatcher</Typography>
                        </a>
                    </Toolbar>
                </AppBar>
                <Grid className={classes.grid} item xs={11} md={10} lg={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h2" className={classes.pokeName}>
                                {`#${id}`} {toFirstCharUppercase(name)}
                            </Typography>
                            <CardMedia
                                className={classes.cardMedia}
                                image={fullImageUrl}
                                style={{width: "300px", height: "300px"}}
                            />
                            <Typography variant="h4" className={classes.pokeHeader}>Pokemon Info</Typography>
                            <div className="info">
                                <Typography className={classes.pokeTxt}>
                                    {"Species: "}
                                    {species.name}
                                </Typography>
                                <Typography className={classes.pokeTxt}>
                                    {`Height: ${actualHeight} cm`}
                                </Typography>
                                <Typography className={classes.pokeTxt}>
                                    {`Weight: ${actualWeight} kg`}
                                </Typography>
                            </div>
                            <br/>
                            <Typography variant="h4" className={classes.pokeHeader}>Type</Typography>
                            <div className="types">
                                {types.map((type, index) => (
                                    <span
                                        key={index}
                                        className={classes.pokeTxt}
                                        style={{backgroundColor: colorTypes[type.type.name]}}
                                    >
                                        {/*Capatalize first letter of strings*/}
                                        {type.type.name.split(" ").map((l) => l.charAt(0).toUpperCase() + l.substring(1)).join(" ")}
                                        <br/>
                                        </span>
                                ))}
                            </div>
                            <div className="stats">
                                <Typography variant="h2" className={classes.pokeHeader}>Stats</Typography>
                                {stats.map((s) => (
                                    <span className={classes.pokeTxt} key={s.stat.name}>
                                         {/*Capatalize first letter of strings*/}
                                        {`${s.stat.name.split(" ").map((l) => l.charAt(0).toUpperCase() + l.substring(1)).join(" ")}:  ${s.base_stat}`}
                                        <br/>
                                    </span>
                                ))}
                            </div>
                            <div className="ability">
                                <Typography variant="h2" className={classes.pokeHeader}>Abilities</Typography>
                                {abilities.map((s, index) => (
                                    <span className={classes.pokeTxt} key={index}>
                                         {/*Capatalize first letter of strings*/}
                                        {`${s.ability.name.split(" ").map((l) => l.charAt(0).toUpperCase() + l.substring(1)).join(" ")}`}
                                        <br/>
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    };
    return (
        <>
            {pokemon === undefined && <CircularProgress className={classes.loadCircle}/>}
            {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
            {pokemon === false && <Typography> Pokemon not found</Typography>}
            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    back to pokedex
                </Button>
            )}
        </>
    );
};
export default Pokemon;
