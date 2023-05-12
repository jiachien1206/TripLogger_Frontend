import Swal from 'sweetalert2';
import warn from '../images/warn.gif';
import send from '../images/send.gif';
import travel from '../images/travel.gif';

export const Alerts = {
    serverError: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">暫時無法讀取內容，請嘗試重新登入，謝謝！</div></div>`,
        });
    },
};
