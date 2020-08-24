import React from "react";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import PokeCatch from "./components/PokeCatch"
import { Route, Switch } from "react-router-dom";

const App = () => (
    <Switch>
        <Route exact path="/" render={(props) => <Pokedex {...props} />} />
        <Route exact
               path="/pokecatch"
               render={(props) => <PokeCatch {...props} />}
        />
        <Route
            exact
            path="/:pokemonId"
            render={(props) => <Pokemon {...props} />}
        />
    </Switch>
);

export default App;
