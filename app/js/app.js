class Box3D {
    constructor(obj) {
        this.varDebounce = 0; // ТаймАут срабатывания всей анимации
        this.сountdownAnim = 0; // ТаймАут срабатывания всей анимации
        this.card = document.querySelector(obj.card); // Анимируемый блок
        this.card__container = document.querySelector(obj.card__container); // Блок контейнер
        this.tiltAngle = obj.tiltAngle || 10; // угол отклонения в градусах
        this.card__container.addEventListener('mousemove', this.mainAnimate.bind(this));
    }

    clearTagStyle(el) {
        el.removeAttribute('style')
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

        }, 10);

        this.сountdownAnim = setTimeout(() => {
            this.clearTagStyle(this.card)
        },1000)
    }

    elementDirectionalShift(x, y) {
        this.card.style.transform = `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) translateZ(0)`;
    }
}

window.addEventListener('load', () => {
let obg = {
    card: '.glass', // Анимируемый блок
    card__container: '.wave__container', // Блок контейнер
    tiltAngle: 15, // угол отклонения в градусах
};

new Box3D(obg);
})
