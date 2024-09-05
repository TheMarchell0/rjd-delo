const mainBlock = document.querySelector('.game'),
    typeButtons = mainBlock.querySelectorAll('.js-type-button'),
    nextButtons = mainBlock.querySelectorAll('.js-next-button'),
    homeButtons = mainBlock.querySelectorAll('.js-home-icon'),
    copyButtons = mainBlock.querySelectorAll('.js-copy-icon'),
    typeBlocks = mainBlock.querySelectorAll('.js-type'),
    chooseLists = mainBlock.querySelectorAll('.js-choose-list'),
    needScroll = window.innerWidth < 1420;

let currentBlock = 'main',
    nextBlock = '';

window.addEventListener('DOMContentLoaded', function () {
    if (needScroll) {
        scrollToTop();
    }

    openSlide();

    function openSlide() {
        const result = window.location.href.split('?=type:')[1];

        if (result) {
            const resultBlock = document.querySelector(`#${result}`)
            const shareResult = resultBlock.querySelector('.js-copy-icon');
            shareResult.classList.add('disable');
            gsap.to(resultBlock, {display: 'block'})
            gsap.to(resultBlock, {opacity: 1, duration: 1, zIndex: 10, delay: 0.5})
            const newUrl = window.location.href.split('?=type:')[0];

            window.history.replaceState(null, '', newUrl);
        } else {
            gsap.to(".main", {display: 'block'})
            gsap.to(".main", {opacity: 1, duration: 1, zIndex: 10, delay: 0.5})
        }
    }

    for (let chooseList of chooseLists) {
        const chooseItems = chooseList.querySelectorAll('.js-choose-item');
        for (let chooseItem of chooseItems) {
            chooseItem.addEventListener('click', () => {
                const radioInput = chooseItem.querySelector('input[type="radio"]');
                if (radioInput) {
                    const activeItem = chooseList.querySelector('.js-choose-item.active');
                    if (activeItem && activeItem !== chooseItem) {
                        activeItem.classList.remove('active');
                    }

                    if (!chooseItem.classList.contains('active')) {
                        chooseItem.classList.add('active');
                    }
                } else {
                    chooseItem.classList.toggle('active');
                }
            })
        }
    }

    for (let typeBlock of typeBlocks) {
        typeBlock.addEventListener('click', () => {
            for (let typeButton of typeButtons) {
                typeButton.setAttribute('data-go-to', typeBlock.value);
            }
        })
    }

    for (let nextButton of nextButtons) {
        nextButton.addEventListener('click', () => {
            if (needScroll) {
                scrollToTop();
            }
            nextBlock = nextButton.getAttribute('data-go-to');
            if (nextBlock.includes('result')) {
                const element = document.querySelector(`.${nextBlock}`);
                if (element) {
                    const id = element.id;
                    const currentUrl = window.location.href;
                    const newUrl = `${currentUrl}?=type:${id}`;
                    window.history.pushState({}, '', newUrl);
                    const myShare = element.querySelector('.js-copy-icon');

                    const share = Ya.share2(myShare, {
                        content: {
                            url: newUrl,
                        },
                        theme: {
                            colorScheme: 'whiteblack',
                            shape: 'round',
                            limit: 0,
                            moreButtonType: "short",
                            services: "vkontakte,telegram,whatsapp"
                        }
                    });
                }
            }
            changeSlide(currentBlock, nextBlock);
            const hiddenBlock = currentBlock
            setTimeout(() => {
                gsap.to(`.${hiddenBlock}`, {left: '50%'})
            }, 1500)
            currentBlock = nextBlock;
            validate(nextBlock);
        })
    }

    function changeSlide(currentBlock, nextBlock) {
        if (needScroll) {
            gsap.to(`.${currentBlock}`, {opacity: 0, duration: 0.3, zIndex: 0, y: 20});
            gsap.to(`.${currentBlock}`, {display: 'none', delay: 0.5});
            gsap.fromTo(`.${nextBlock}`, {display: 'none'}, {
                display: 'block',
            });
            gsap.fromTo(`.${nextBlock}`, {opacity: 0, y: -20}, {
                opacity: 1,
                duration: 0.3,
                zIndex: 10,
                delay: 0.5,
                y: 0,
            });
        } else {
            gsap.to(`.${currentBlock}`, {left: '-50%', opacity: 0, duration: 1, zIndex: 0});
            gsap.to(`.${currentBlock}`, {display: 'none', delay: 0.5});
            gsap.fromTo(`.${nextBlock}`, {display: 'none'}, {
                display: 'block',
            });
            gsap.fromTo(`.${nextBlock}`, {left: '150%', opacity: 0}, {
                left: '50%',
                opacity: 1,
                duration: 1,
                zIndex: 10,
                delay: 0.5,
            });
        }
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
            if (needScroll) {
                scrollToTop()
                gsap.to(`.${currentBlock}`, {opacity: 0, duration: 0.3, zIndex: 0, y: 20})
                gsap.to(`.${currentBlock}`, {display: 'none', delay: 0.5});
                gsap.to(".main", {display: 'block'});
                gsap.to(".main", {left: '50%', opacity: 1, duration: 0.3, zIndex: 10, delay: 0.5, y: -20});
            } else {
                gsap.to(`.${currentBlock}`, {opacity: 0, duration: 1, zIndex: 0})
                gsap.to(`.${currentBlock}`, {display: 'none', delay: 0.5});
                gsap.to(".main", {display: 'block'});
                gsap.to(".main", {left: '50%', opacity: 1, duration: 1, zIndex: 10})
            }
            const inputs = mainBlock.querySelectorAll('input:checked');
            for (let inputsItem of inputs) {
                inputsItem.checked = false;
            }
            currentBlock = 'main',
                nextBlock = '';
            gsap.to('.game-flex__footer-button', {disabled: true})
            const activeItems = mainBlock.querySelectorAll('.js-choose-item.active')
            if (activeItems) {
                for (let activeItem of activeItems) {
                    activeItem.classList.remove('active')
                }
            }
        })
    }

    for (let copyButton of copyButtons) {
        copyButton.addEventListener('click', (e) => {
                e.preventDefault()
                if (!copyButton.classList.contains('active')) {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url)
                        .then(() => {
                            copyButton.classList.add('active');
                            setTimeout(() => copyButton.classList.remove('active'), 2000)
                        })
                        .catch(err => {
                            console.error('Ошибка при копировании: ', err);
                        });
                }
            }
        )
        ;
    }
})
;

function scrollToTop() {
    const duration = 500;
    const start = window.scrollY;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, start * (1 - easeInOutQuad));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
