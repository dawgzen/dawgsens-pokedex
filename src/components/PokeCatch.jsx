import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../index.css'
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {useStyles} from "../styles/PokedexTheme";
import {toFirstCharUppercase} from "../utils";

function PokeCatch({history}) {
    const [pokedex, setPokedex] = useState([]);
    const [wildPokemon, setWildPokemon] = useState({});
    const classes = useStyles();

    useEffect(() => {
        encounterWildPokemon()
    }, []);

    //Dawgsen:  Grabs random pokemon ID from 1 till 807, again after 807 results vary for pictures.
    const pokeId = () => {
        const min = Math.ceil(1);
        const max = Math.floor(807);
        return Math.floor(Math.random() * (max - min + 1)) + min
    };

    //Dawgsen: Grabs the pokemon data from the api
    const encounterWildPokemon = () => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
            .then(response => {
                setWildPokemon(response.data);
            })
    };
    //Dawgsen: "Catches" the wild pokemon, can only catch one of each species.
    const catchPokemon = (pokemon) => {
        setPokedex(state => {
            const monExists = (state.filter(p => pokemon.id == p.id).length > 0);

            if (!monExists) {
                state = [...state, pokemon];
                state.sort(function (a, b) {
                    return a.id - b.id
                })
            }
            return state
        });
        encounterWildPokemon()
    };
    //Dawgsen: Releases pokemon on click
    const releasePokemon = id => {
        setPokedex(state => state.filter(p => p.id != id))
    };

    return (
        <div className="app-wrapper">
            <AppBar className={classes.navBar} position="static">
                <Toolbar className={classes.toolbarContainer}>
                    <a href="/" className={classes.starIcon}>
                        <img src={require("../assets/pika.png")} alt="icon" width={75} height={75}/>
                        <Typography>Home</Typography>
                    </a>
                </Toolbar>
            </AppBar>
            <section className="wild-pokemon">
                <h2 className={classes.pokeHeader}>A wild {wildPokemon.name} appeared!</h2>
                <img
                    src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"}
                    className="sprite"/>
                <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}><img src={require("../assets/poke.png")} alt="icon" width={75} height={75}/></button>
            </section>
            <section className="pokedex">
                <Typography className={classes.pokeCatch}>Click on a sprite to look up the caught pokémon in the pokédex</Typography>
                <div className="pokedex-list">
                    {pokedex.map(pokemon => (
                        <div className="pokemon" key={pokemon.id}>
                            <img onClick={() => history.push(`/${pokemon.id}`)}
                                 src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
                                 className="sprite"/>
                            <h3 className={classes.pokeName}>{toFirstCharUppercase(pokemon.name)}</h3>
                            <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
export default PokeCatch;

