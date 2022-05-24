const images = (calcScroll) => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img'),
          scroll = calcScroll();

    imgPopup.classList.add('popup_img');
    workSection.append(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    document.body.style.overflow = '';
    imgPopup.style.display = 'none';

    imgPopup.append(bigImage);
    
    workSection.addEventListener('click', (e) =>{
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            bigImage.style.maxWidth = '80%';
            bigImage.style.maxHeight = '70%';
            bigImage.style.borderRadius = '10px';
            document.body.style.marginRight = `${calcScroll()}px`;
            bigImage.classList.add('faded');
        }
        
        if (target && target.matches('div.popup_img')) {
            imgPopup.style.display = '';
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
            bigImage.classList.remove('faded');
        }
    });
    

};

export default images;