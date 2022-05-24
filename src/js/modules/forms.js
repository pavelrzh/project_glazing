import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll("[data-modal]");

    checkNumInputs('input[name="user_phone"]');                                // проверка на НЕ цифры

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {                                   // отвечает за отправку запроса
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        return await res.text(); 
    };

    const clearInputs = () => {                                              //  очистка inputs
        inputs.forEach(item => {
            item.value ='';
        });
    };

    form.forEach(item => {                                               // перебираем все формы
                                                                         
        item.addEventListener('submit', (e) =>{                             // навешиваем обработчик событий           
            e.preventDefault();

            let statusMessage = document.createElement('div');              // создаем блок с сообщением
            statusMessage.classList.add('status');
            item.append(statusMessage);

            const formData = new FormData(item);                      // собираем все введенные данные из форм
                

            if (item.getAttribute('data-calc') === 'end'){            // для последней формы, добавляем поля из modalState (тип, ширина,высота и тд)...
                for (let key in state) {
                    formData.append(key, state[key]);                 // ... и добавляем в formData 
                }
            }

            postData('assets/server.php', formData)                     // отправляем запрос на сервер
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        for (let key in state) {                          // очищаем modalState
                            delete state[key];
                        }
                        windows.forEach(item => {
                            item.style.display = "none";                     // скрываем модалку
                            document.body.style.overflow = '';
                            document.body.style.marginRight = '0px';     // компенсируем скролл
                        });
                        console.log("Форма отправлена.");
                        console.log(state);
                    }, 4000);
                });
                
            });
        
        });
    };
    
export default forms;