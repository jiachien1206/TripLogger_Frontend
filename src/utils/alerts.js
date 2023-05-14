import Swal from 'sweetalert2';
import warn from '../images/warn.gif';
import send from '../images/send.gif';
import travel from '../images/travel.gif';

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

const toastLong = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

export const Alerts = {
    serverError: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">暫時無法讀取內容，請稍後再試，謝謝！</div></div>`,
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
    unauthorized: async function () {
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
    deletePost: async function () {
        return Swal.fire({
            showCancelButton: true,
            cancelButtonText: '取消',
            cancelButtonColor: 'var(--third-font)',
            confirmButtonText: '確認',
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">確認刪除文章</div>`,
        });
    },
    signinFailed: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">帳號或密碼輸入錯誤</div></div>`,
        });
    },
    noImage: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請上傳首圖</div></div>`,
        });
    },
    invalidPostTitle: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請填寫 1 至 100 個字元的標題</div></div>`,
        });
    },
    invalidDates: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請選擇旅遊日期，且結束日期需晚於開始日期</div></div>`,
        });
    },
    invalidPostContent: function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請撰寫 10 至 20000 個字元的內文</div></div>`,
        });
    },
    submitPost: async function () {
        return Swal.fire({
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonColor: 'var(--third-font)',
            showCancelButton: true,
            confirmButtonText: '送出',
            cancelButtonText: '取消',
            html: `<div style="width: 100%; margin: 0px auto"><img src="${send}" width="140px"><div style="font-weight:500;">送出文章</div></div>`,
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
    signinSuccess: function () {
        return toast.fire({
            iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${travel}" ></div>`,
            title: '登入成功！',
        });
    },
    submittingPost: async function () {
        return toastLong.fire({
            iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${travel}" ></div>`,
            title: '發文中～',
        });
    },
    updatingPost: async function () {
        return toastLong.fire({
            iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${travel}" ></div>`,
            title: '更新中～',
        });
    },
};
