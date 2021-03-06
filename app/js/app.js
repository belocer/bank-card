class Box3D {
    constructor(obj) {
        this.varDebounce = 0; // ТаймАут срабатывания всей анимации
        this.сountdownAnim = 0; // ТаймАут срабатывания всей анимации
        this.countCoins = 0; // ТаймАут срабатывания всей анимации
        this.card = document.querySelector(obj.card); // Анимируемый блок
        this.card__container = document.querySelector(obj.card__container); // Блок контейнер
        this.coins = document.querySelectorAll(obj.coins); // Монеты
        this.tiltAngle = obj.tiltAngle || 10; // угол отклонения в градусах
        this.card__container.addEventListener('mousemove', this.mainAnimate.bind(this));
    }

    clearTagStyle(el) {
        el.forEach(item => item.removeAttribute('style'));
    }

    mainAnimate(e) {
        clearTimeout(this.varDebounce);
        clearTimeout(this.сountdownAnim);
        this.varDebounce = setTimeout(() => {
            let rect = e.target.getBoundingClientRect();
            let offset_x = e.offsetX || e.layerX
            let offset_y = e.offsetY || e.layerY
            let x = 100 * offset_x / rect.width;
            let y = 100 * offset_y / rect.height;

            if (x < 50 && y < 50) { // Левый верхний угол
                this.elementDirectionalShift(this.tiltAngle, -this.tiltAngle, -8, 10)
            } else if (x > 50 && y < 50) { // Правый верхний угол
                this.elementDirectionalShift(this.tiltAngle, this.tiltAngle, -8, -10)
            } else if (x < 50 && y > 50) { // Левый нижний угол
                this.elementDirectionalShift(-this.tiltAngle, -this.tiltAngle, 8, -10)
            } else if (x > 50 && y > 50) { // Правый нижний угол
                this.elementDirectionalShift(-this.tiltAngle, this.tiltAngle, 8, 10)
            }

        }, 1);

        this.сountdownAnim = setTimeout(() => {
            this.clearTagStyle([this.card])
            this.clearTagStyle(this.coins)
        }, 2000)
    }

    elementDirectionalShift(x, y) {
        this.card.style.transform = `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) translateZ(0)`;
        let i = 1
        clearTimeout(this.countCoins);
        this.coins.forEach((item, index, arr) => {
            this.countCoins = setTimeout(() => {
                let r = Math.floor(Math.random() * 30)
                i += 15;
                item.style.transform = `perspective(1200px) translateX(${x - i + r}px) translateY(${y - i + r}px) rotateX(${r}deg) rotateY(${r}deg)`;
                i > 100 ? i = 0 : '';
                //item.style.filter = i % 3 === 0 ? 'blur(1px)' : 'blur(0)';
            }, 100 * index)
        })
    }
}

window.addEventListener('load', () => {
    let obg_card = {
        card: '.glass', // Анимируемый блок
        card__container: '.wave__container', // Блок контейнер
        tiltAngle: 15, // угол отклонения в градусах
        coins: '.coins li'
    };
    new Box3D(obg_card);

    /* Меняю волны */
    let wave = document.getElementById('wave');
    let wave__wrap = document.querySelector('.wave__wrap');
    let wave_up = document.querySelector('.wave_up');
    let wave_down = document.querySelector('.wave_down');
    let flagSwitch = true;

    setInterval(() => {
        wave.classList.add('opacity_wave')
        setTimeout(() => {
            if (flagSwitch) {
                wave_up.style.background = 'url(https://googleman.ru/bank_card/img/dest/wave_up1.webp) center center repeat-x';
                wave_down.style.background = 'url(https://googleman.ru/bank_card/img/dest/wave_down1.webp) center center repeat-x';
                flagSwitch = false;
            } else {
                wave_up.style.background = 'url(https://googleman.ru/bank_card/img/dest/wave_up.webp) center center repeat-x';
                wave_down.style.background = 'url(https://googleman.ru/bank_card/img/dest/wave_down.webp) center center repeat-x';
                flagSwitch = true;
            }
            wave_up.style.backgroundSize = 'contain';
            wave_down.style.backgroundSize = 'contain';
        }, 1000)

        setTimeout(() => {
            wave__wrap.style.transform = flagSwitch ? 'rotate(-35deg)' : 'rotate(35deg)'
            wave.classList.remove('opacity_wave')
        }, 1000)
    }, 20000)
});