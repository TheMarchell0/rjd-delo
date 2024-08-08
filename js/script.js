const mainBlock = document.querySelector('.game'),
    nextButtons = mainBlock.querySelectorAll('.js-next-button'),
    homeButtons = mainBlock.querySelectorAll('.js-home-icon'),
    typeBlocks = mainBlock.querySelectorAll('.js-type');
let currentBlock = 'main',
    nextBlock = 'type',
    type = '';
window.addEventListener('DOMContentLoaded', function () {

    gsap.to(".main", {opacity: 1, duration: 1, zIndex: 10})

    for (let typeBlock of typeBlocks) {
        typeBlock.addEventListener('click', () => {
            if (typeBlock.value !== type) {
                type = typeBlock.value;
            }
        })
    }

    for (let nextButton of nextButtons) {
        nextButton.addEventListener('click', () => {
            gsap.to(`.${currentBlock}`, {left: '-50%', opacity: 0, duration: 1, zIndex: 0});
            gsap.fromTo(`.${nextBlock}`, {left: '150%', opacity: 0}, {
                left: '50%',
                opacity: 1,
                duration: 1,
                zIndex: 10
            });
            setTimeout(() => gsap.to(`.${currentBlock}`, {left: '50%'}), 1500)
            currentBlock = nextBlock;
            if (currentBlock === 'type') {
                nextBlock = mainBlock.querySelector(`.question[data-type="${type}"]`)
            }
            console.log(nextBlock)
            validate(currentBlock);
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
            gsap.to(".result", {opacity: 0, duration: 1, zIndex: 0})
            if (chooseNumber) {
                gsap.to(`.result-${chooseNumber}`, {opacity: 0, duration: 1, zIndex: 0})
            }
            const inputs = mainBlock.querySelectorAll('input:checked');
            for (let inputsItem of inputs) {
                inputsItem.checked = false;
            }
            gsap.to(`.${currentBlock}`, {opacity: 0, duration: 1, zIndex: 0})
            gsap.to('.game-flex__footer-button', {disabled: true})
            gsap.to('.game__section', {left: '50%'})
            gsap.to(".main", {opacity: 1, duration: 1, zIndex: 10})
            chooseNumber = 0;
        })
    }

    fourthButton.addEventListener('click', () => {
        gsap.to(".fourth", {left: '-50%', opacity: 0, duration: 1, zIndex: 0});
        gsap.fromTo(".result", {left: '150%', opacity: 0}, {left: '50%', opacity: 1, duration: 1, zIndex: 10});
        gsap.to(`.result-${chooseNumber}`, {opacity: 1, duration: 1, zIndex: 5})
        let inActionTime = setTimeout(() => {
            gsap.to(".result", {opacity: 0, duration: 1, zIndex: 0})
            gsap.to(`.result-${chooseNumber}`, {opacity: 0, duration: 1, zIndex: 0})
            chooseNumber = 0;
            const inputs = mainBlock.querySelectorAll('input:checked');
            for (let inputsItem of inputs) {
                inputsItem.checked = false;
            }
            gsap.to(".main", {opacity: 1, duration: 1, zIndex: 10})
            gsap.to('.game-flex__footer-button', {disabled: true})
            gsap.to('.game__section', {left: '50%'})
        }, 50000);
        mainBlock.addEventListener('click', function checkFinish(e) {
            if (e.target.classList.contains('js-remove-inaction')) {
                clearTimeout(inActionTime)
                this.removeEventListener('click', checkFinish)
                gsap.to('.game-flex__footer-button', {disabled: true})
                gsap.to('.game__section', {left: '50%'})
            }
            setTimeout(() => this.removeEventListener('click', checkFinish), 50000)
        })
    })
});