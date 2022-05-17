import { setTimeout } from "core-js";

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector);

            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
                    modal.style.display = 'block';
                    document.body.classList.add('modal-open');

                    clearInterval(modalTimerId);
                   
                 });
            });

         close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
         });

         modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                
            }
         });
         
        }
            let modalTimerId;
            function showModalByTime(selector, time) {
               modalTimerId = setTimeout(function () {
                    document.querySelector(selector).style.display = 'block';
                    document.body.classList.add('modal-open');
                }, time);

           }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 60000);
};

export default modals;