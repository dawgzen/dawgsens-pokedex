import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "../styles/PokedexTheme";
import axios from "axios";
import PokemonCard from "./PokemonCard";

const Pokedex = ({ history }) => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState([]);
    const [filter, setFilter] = useState("");

    //Dawgsen: handler to set my filter value
    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    //Dawgsen: function to request the API, stores the results in the state specificly grabs 807 pokémon, after that results vary in quality
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(function (response) {
                const { results } = response.data;
                setPokemonData(results);
            });
    },[]);


    return (
        <>
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
                    <div className={classes.searchContainer}>
                        <TextField
                            className={classes.searchInput}
                            label="PokéSearch"
                            variant="outlined"
                            onChange={handleSearchChange} />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {
                        //TODO: filter on pokémon # aswell
                        pokemonData.map((pokemon, i) => (
                            pokemon.name.includes(filter) &&
                            <PokemonCard key={i} pokemon={pokemon} history={history} />
                        ))
                    }
                </Grid>
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
export default Pokedex;
