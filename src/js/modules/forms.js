const forms = () => {
    const form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input'),
            phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {                                              // проверка на НЕ цифры
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');                         // удаляем НЕ цифры
        });
    });       

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


    form.forEach(item => {                                                  // перебираем все формы
        item.addEventListener('submit', (e) =>{                             // навешиваем обработчик событий           
            e.preventDefault();

            let statusMessage = document.createElement('div');              // создаем блок с сообщением
            statusMessage.classList.add('status');
            item.append(statusMessage);

            const formData = new FormData(item);                        // собираем все введенные данные из форм

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
                    }, 5000);
                });

        });
    });
};

export default forms;