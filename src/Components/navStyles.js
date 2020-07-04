import {makeStyles} from "@material-ui/core/styles";


const navStyles = makeStyles(theme => ({
    link: {
        color: "rgba(0,0,0,0.65)",
        textDecoration: "none",
        marginLeft: "-100%",
        alignSelf: "flex-start",
        "&:hover": {
            color: "rgba(0,0,0,1)"
        }
    }
}));

export default navStyles;