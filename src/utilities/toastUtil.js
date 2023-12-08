import {toast} from "react-toastify";


const toastSuccess = (message) => {
    toast(message, {
        type: 'success',
    });
}

const toastError = (message) => {
    toast(message, {
        type: 'error',
    });
}

export default {toastSuccess, toastError};