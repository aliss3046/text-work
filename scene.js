(() => {
    const COLORS = ["red", "green", "yellow", "pink"];

    document.querySelectorAll("p").forEach(p => {
        let clickCount = 0;
        let intervals = []; //массив интервалов
        let active = false; //начальное состояние неактивно(изначально не двигается)
//эти переменные создаются заново для каждого объекта
        const bolds = Array.from(p.querySelectorAll("b")); //Array.from() превращает NodeList в обычный массив, p.querySelectorAll("b") - возвращает все выделенные элементы в параграфе 

        const originalStyle = { //сохраняет все исходные css-значения элемента перед тем как их изменять, чтобы в конце вернуть как было
            position: p.style.position, // p.style содержит только inline-стили и не включает css или из тега <style>
            width: p.style.width,
            height: p.style.height,
            left: p.style.left,
            bottom: p.style.bottom,
            background: p.style.background,
            margin: p.style.margin,
            padding: p.style.padding
        };

        function startBoldEffects() {
    if (active) return;
    active = true;

    bolds.forEach(b => {
        b.style.position = "relative";
        b.style.transition = "top 0.5s, color 0.5s";

        let shift = Math.floor(Math.random() * 21) - 10; // те функция дает числа 0-20, а -10 дает как раз диапазон [-10, 10]
        let color = COLORS[Math.floor(Math.random() * COLORS.length)];
        b.style.top = `${shift}px`;
        b.style.color = color;

        const interval = setInterval(() => {
            shift = Math.floor(Math.random() * 21) - 10;
            color = COLORS[Math.floor(Math.random() * COLORS.length)];
            b.style.top = `${shift}px`;
            b.style.color = color;
        }, 500);

        intervals.push(interval);
    });
}


        function stopBoldEffects() {
            intervals.forEach(clearInterval);
            intervals = [];
            active = false; 

            bolds.forEach(b => {
                b.style.top = "0px";
                b.style.color = "black";
            });
        }

        p.addEventListener("click", () => {
            clickCount = (clickCount % 4) + 1;

            switch (clickCount) {
                case 1:
                    startBoldEffects();   // смещение при первом клике
                    break;

                case 2:
                    p.classList.add("absolute-panel");
                    break;

                case 3:
                    stopBoldEffects();
                    break;

                case 4:
                    p.classList.remove("absolute-panel");
                    Object.assign(p.style, originalStyle);
                    break;
            }
        });
    });
})();
