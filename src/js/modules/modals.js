import { setTimeout } from "core-js";


const modals = (state, calcScroll) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, clickCloseOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
               modal = document.querySelector(modalSelector),
               close = document.querySelector(closeSelector),
               windows = document.querySelectorAll('[data-modal'),                 // все модальные окна (для закрытия всех разом)
               modalCalcValid = document.querySelector('.popup_calc_content'),
               modalProfileValid = document.querySelector('.popup_calc_profile_content'),
               scroll = calcScroll();
               

            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }
                    /* Validation Form*/
                    const messageAlert = 'Необходимо заполнить все данные';  
                    
                    const messageDiv = document.createElement('div');

                    messageDiv.classList.add('status');
                    messageDiv.style.paddingTop = '30px';
      
                    if (e.target.classList.contains('popup_calc_button')) {
                        if(!state.width || !state.height) {
                            modalCalcValid.append(messageDiv);
                            messageDiv.textContent = messageAlert;
                            e.target.style.opacity = '0.7';
                            setTimeout(() => {
                                messageDiv.remove();  
                                e.target.style.opacity = '1';
                            }, 1000);
                            return;
                        }
                    }
                    if (e.target.classList.contains('popup_calc_profile_button')) {
                        if(!state.profile) {
                            modalProfileValid.append(messageDiv);
                            messageDiv.textContent = messageAlert;
                            e.target.style.opacity = '0.7';
                            setTimeout(() => {
                                messageDiv.remove();  
                                e.target.style.opacity = '1';
                            }, 1000);
                            return;
                        }
                    }
                    windows.forEach(item => {
                        item.style.display = 'none';
                        item.classList.remove('faded');
                    });

                    modal.style.display = 'block';
                    modal.classList.add('faded');           
                    // modal.classList.remove('appearance');           
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scroll}px`;


                    clearInterval(modalTimerId);
                 });
            });

         close.addEventListener('click', (e) => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            
            modal.style.display = 'none';
            modal.classList.remove('faded');
            // modal.classList.add('appearance');
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';                      
         });

         modal.addEventListener('click', (e) => {                    // клик на подложку модалки
            if (e.target === modal && clickCloseOverlay) {           // если клик на подложку  && аргумент - true,
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                
                modal.style.display = 'none';
                modal.classList.remove('faded');
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
         });

    }

    let modalTimerId;
    function showModalByTime(selector, time) {
        modalTimerId = setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${calcScroll()}px`;
        }, time);
    }


    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    
    showModalByTime('.popup', 10000);


};


export default modals;