const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {                                              // проверка на НЕ цифры
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');                         // удаляем НЕ цифры
        });
    });         
};

export default checkNumInputs;