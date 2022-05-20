import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');                                  // валидация
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) {

        elem.forEach((item, i) => {                         // индекс элемента по которому кликнули
            
            item.addEventListener(event, (e) => {                    

                switch(item.nodeName) {
                    case 'SPAN' :
                        state[prop] = i;                   // в объекте state создается поле, в которое передается индек объекта, по которому кликнули
                        break;
                    case 'INPUT' :
                        /*Checkbox*/
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                            elem.forEach((item, j) => {
                                item.checked = false;
                                if (i ===j) {
                                    item.checked = true;           //отметка check на checkbox который кликнул пользователь
                                }
                            });

                         } else {
                             /*INPUTS*/
                                state[prop] = item.value;          // в объекте state создается поле, в которое передается value inputa
                            }
                        
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;   
                        break;
                
            }
            
                console.log(state);
            }); 
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;