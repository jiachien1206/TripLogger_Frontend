import Swal from 'sweetalert2';
import warn from '../images/warn.gif';
import send from '../images/send.gif';
import travel from '../images/travel.gif';

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

export const Alerts = {
    serverError: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">暫時無法讀取內容，請嘗試重新登入，謝謝！</div></div>`,
        });
    },
    signupServerError: function () {
        return Swal.fire({
            type: 'warning',
            confirmButtonColor: 'var(--primary-color)',
            text: 'This action cannot be undone.',
            html: `<div style="width: 100%; margin: 0px auto;"><img src="${warn}" width="140px"><div style="font-weight:500;">註冊失敗，請稍後再試</div></div>`,
        });
    },
    unauthorized: function () {
        return Swal.fire({
            confirmButtonColor: '#459a82',
            html: `<div style="width: 100%; margin: 0px auto;"><img src="${warn}" width="140px"><div style="font-weight:500;">請重新登入</div></div>`,
        });
    },
    nameLengthTooShort: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">使用者名稱至少需 1 個字元</div></div>`,
        });
    },
    imageTooBig: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">檔案須小於2MB</div></div>`,
        });
    },
    deletePost: function () {
        return Swal.fire({
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">確認刪除文章</div>`,
        });
    },
};

export const Toast = {
    signupSuccess: function () {
        return toast.fire({
            iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${travel}" ></div>`,
            title: '註冊成功！',
        });
    },
};
