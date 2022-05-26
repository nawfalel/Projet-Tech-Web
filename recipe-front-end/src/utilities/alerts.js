import Swal from 'sweetalert2';


const success_alert_message = (message) => {
    Swal.fire({
        icon: 'success',
        title: "Opération réussie!",
        text: message
      });
}

const failed_alert_message = (message) => {
    Swal.fire({
        icon: 'error',
        title: "Opération échouée!",
        text: message
      });
}

export const create_alert_message = (TYPE, message) => {
    switch(TYPE) {
        case "SUCCESS_ALERT":
            success_alert_message(message);
            break;
        case "WARNING_ALERT":
            failed_alert_message(message);
            break;
    }
}