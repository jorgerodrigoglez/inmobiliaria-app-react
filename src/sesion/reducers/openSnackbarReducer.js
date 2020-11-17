const initialState = {
    open : false,
    mensaje : ""
}

const openSnackbarReducer = (state = initialState, action) => {
    switch(action.type){
        case "OPEN_SNACKBAR" :
            return {
                ...state,
                open : action.openMensaje.mensaje,
                mensaje : action.openMensaje.mensaje
            };
        default:
            return state;
    }
};

export default openSnackbarReducer;