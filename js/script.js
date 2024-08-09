const mainBlock = document.querySelector('.game'),
    typeButton = mainBlock.querySelector('.js-type-button'),
    nextButtons = mainBlock.querySelectorAll('.js-next-button'),
    homeButtons = mainBlock.querySelectorAll('.js-home-icon'),
    typeBlocks = mainBlock.querySelectorAll('.js-type');

let currentBlock = 'main',
    nextBlock = '';

window.addEventListener('DOMContentLoaded', function () {

    gsap.to(".main", {opacity: 1, duration: 1, zIndex: 10})

    for (let typeBlock of typeBlocks) {
        typeBlock.addEventListener('click', () => {
            typeButton.setAttribute('data-go-to', typeBlock.value);
        })
    }

    for (let nextButton of nextButtons) {
        nextButton.addEventListener('click', () => {
            nextBlock = nextButton.getAttribute('data-go-to');
            gsap.to(`.${currentBlock}`, {left: '-50%', opacity: 0, duration: 1, zIndex: 0});
            gsap.fromTo(`.${nextBlock}`, {left: '150%', opacity: 0}, {
                left: '50%',
                opacity: 1,
                duration: 1,
                zIndex: 10
            });
            const hiddenBlock = currentBlock
            setTimeout(() => gsap.to(`.${hiddenBlock}`, {left: '50%'}), 1500)
            currentBlock = nextBlock;
            validate(nextBlock);
        })
    }

    function validate(currentBlock) {
        const mainBlock = document.querySelector(`.${currentBlock}`)
        const inputs = mainBlock.querySelectorAll('input');
        let error = 1;
        for (let inputsItem of inputs) {
            inputsItem.addEventListener('input', () => {
                inputsItem.checked ? --error : ++error;
                if (error > 0) {
                    gsap.to(`.${currentBlock} .game-flex__footer-button`, {disabled: true})
                } else gsap.to(`.${currentBlock} .game-flex__footer-button`, {disabled: false})
            })
        }
    }

    for (let homeButton of homeButtons) {
        homeButton.addEventListener('click', () => {
            gsap.to(`.${currentBlock}`, {opacity: 0, duration: 1, zIndex: 0})
            gsap.to(".main", {left: '50%', opacity: 1, duration: 1, zIndex: 10})
            const inputs = mainBlock.querySelectorAll('input:checked');
            for (let inputsItem of inputs) {
                inputsItem.checked = false;
            }
            currentBlock = 'main',
                nextBlock = '';
            gsap.to('.game-flex__footer-button', {disabled: true})
        })
    }
});