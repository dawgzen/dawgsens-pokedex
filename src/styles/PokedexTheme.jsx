import {fade, makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    typography: {
        "fontFamily": "\"DawgFont\"",
        "fontSize": 20,
        "lineHeight": 1.5,
        "letterSpacing": 0.32,
    },
    pokedexContainer: {
        padding: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        margin: "0 auto",
        height: "100%",
        backgroundColor: "rgba(228,237,241,0.76)",
    },
    loadCircle: {
        width: '25%',
        height: '25%',
        marginLeft: '47%',
        marginTop: '25%',
    },
    navBar: {
        backgroundColor: "rgba(56,80,195,0.56)",
    },
    card: {
        width: "100%",
        height: 'auto',
        backgroundColor: "#e3f2fd",
        overflow: "hidden",
        paddingTop: "10px",
        color: "#2f7d88",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: 'flex',
        alignSelf: "flex-end",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        width: "35%",
        marginTop: "5px",
        marginBottom: "1%",
        color: "#f4cf50",
    },
    searchInput: {
        width: "100%",
        height: "20%",
        color: "#f4cf50",
    },
    toolbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    pokedexName: {
        color: "#6e5773",
    },
    root: {
        backgroundColor: "rgba(56,80,195,0.56)",
    },
    details: {
        display: 'flex',
    },
    pokeName: {
        color: "#f4cf50",
        fontWeight: 200,
        textAlign: 'center'
    },
    pokeHeader: {
        color: "#f4cf50",
        fontWeight: 200,
        fontSize: 32
    },
    pokeTxt: {
        color: "#ffffff",
        fontWeight: 200,
        fontSize: 25
    },
    pokeCatch: {
        color: "#f41919",
        fontWeight: 200,
        textAlign: 'center'
    },
    grid: {
        margin: '0 auto',
        marginTop: '3%',
        width: "100%",
    },
    starIcon: {
        textAlign: 'center',
        textDecoration: 'none',
        color: "#f4cf50",
        fontSize: 13,
    }
}));
