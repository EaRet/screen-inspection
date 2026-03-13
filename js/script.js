let currentTest = null;
let currentCleanup = null;

const container = document.getElementById('fullscreenTest');

if (container) {
    document.addEventListener('DOMContentLoaded', initTestCards);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
}

function initTestCards() {
    const cards = document.querySelectorAll('.test-card[data-test]');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            startTest(card.dataset.test);
        });
    });
}

function startTest(testType) {
    if (!container || !testType) {
        return;
    }

    if (currentTest) {
        teardownTest({ skipFullscreenExit: true });
    }

    currentTest = testType;
    currentCleanup = null;
    container.innerHTML = '';
    container.style.backgroundColor = '';
    container.classList.add('active');

    requestFullscreen(container);

    switch (testType) {
        case 'solidColor':
            loadSolidColorTest(container);
            break;
        case 'lightLeak':
            loadLightLeakTest(container);
            break;
        case 'interference':
            loadInterferenceTest(container);
            break;
        case 'focus':
            loadFocusTest(container);
            break;
        case 'breathing':
            loadBreathingTest(container);
            break;
        case 'contrast':
            loadContrastTest(container);
            break;
        case 'grayscale':
            loadGrayscaleTest(container);
            break;
        case 'saturation':
            loadSaturationTest(container);
            break;
        default:
            teardownTest({ skipFullscreenExit: true });
    }

    document.addEventListener('keydown', handleEscape);
}

function requestFullscreen(target) {
    if (target.requestFullscreen) {
        target.requestFullscreen();
    } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function setCleanup(cleanupFn) {
    currentCleanup = cleanupFn;
}

function exitTest() {
    teardownTest({ skipFullscreenExit: false });
}

function teardownTest({ skipFullscreenExit }) {
    if (!container) {
        return;
    }

    if (typeof currentCleanup === 'function') {
        currentCleanup();
        currentCleanup = null;
    }

    container.classList.remove('active');
    container.innerHTML = '';
    container.style.backgroundColor = '';
    currentTest = null;

    document.removeEventListener('keydown', handleEscape);

    if (!skipFullscreenExit) {
        exitFullscreen();
    }
}

function handleEscape(event) {
    if (event.key === 'Escape') {
        exitTest();
    }
}

function handleFullscreenChange() {
    const activeFullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!activeFullscreenElement && currentTest) {
        teardownTest({ skipFullscreenExit: true });
    }
}

function createControls({ title, onPrev, onNext }) {
    const controls = document.createElement('div');
    controls.className = 'controls';

    let titleElement = null;

    if (typeof onPrev === 'function') {
        const prevButton = document.createElement('button');
        prevButton.type = 'button';
        prevButton.textContent = '上一个';
        prevButton.addEventListener('click', onPrev);
        controls.appendChild(prevButton);
    }

    titleElement = document.createElement('span');
    titleElement.style.fontWeight = '500';
    titleElement.textContent = title;
    controls.appendChild(titleElement);

    if (typeof onNext === 'function') {
        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.textContent = '下一个';
        nextButton.addEventListener('click', onNext);
        controls.appendChild(nextButton);
    }

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close-btn';
    closeButton.textContent = '关闭 (ESC)';
    closeButton.addEventListener('click', exitTest);
    controls.appendChild(closeButton);

    return { controls, titleElement };
}

function createInstruction(text) {
    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = text;
    return instruction;
}

function createFullLayer() {
    const layer = document.createElement('div');
    layer.style.position = 'absolute';
    layer.style.top = '0';
    layer.style.left = '0';
    layer.style.width = '100%';
    layer.style.height = '100%';
    return layer;
}

function loadSolidColorTest(target) {
    const colors = [
        { name: '黑色', value: '#000000' },
        { name: '白色', value: '#FFFFFF' },
        { name: '红色', value: '#FF0000' },
        { name: '绿色', value: '#00FF00' },
        { name: '蓝色', value: '#0000FF' },
        { name: '青色', value: '#00FFFF' },
        { name: '品红', value: '#FF00FF' },
        { name: '黄色', value: '#FFFF00' }
    ];

    let currentColorIndex = 0;

    const { controls, titleElement } = createControls({
        title: colors[currentColorIndex].name,
        onPrev: () => changeColor(-1),
        onNext: () => changeColor(1)
    });

    const instruction = createInstruction('仔细观察屏幕，寻找异常的亮点或暗点');

    target.appendChild(controls);
    target.appendChild(instruction);

    updateColor();

    function updateColor() {
        target.style.backgroundColor = colors[currentColorIndex].value;
        titleElement.textContent = colors[currentColorIndex].name;
    }

    function changeColor(direction) {
        currentColorIndex = (currentColorIndex + direction + colors.length) % colors.length;
        updateColor();
    }
}

function loadLightLeakTest(target) {
    target.style.backgroundColor = '#000000';

    const { controls } = createControls({ title: '漏光测试模式' });
    const instruction = createInstruction('在暗室环境下观察屏幕四周边缘，检查是否有明显的漏光现象');

    target.appendChild(controls);
    target.appendChild(instruction);
}

function loadInterferenceTest(target) {
    const patterns = [
        { name: '横向条纹', type: 'horizontal' },
        { name: '纵向条纹', type: 'vertical' },
        { name: '网格', type: 'grid' },
        { name: '棋盘格', type: 'checkerboard' }
    ];

    let currentPattern = 0;

    const layer = createFullLayer();
    target.appendChild(layer);

    const { controls, titleElement } = createControls({
        title: patterns[currentPattern].name,
        onPrev: () => changePattern(-1),
        onNext: () => changePattern(1)
    });
    const instruction = createInstruction('观察条纹是否清晰笔直，是否有波纹或扭曲现象');

    target.appendChild(controls);
    target.appendChild(instruction);

    updatePattern();

    function updatePattern() {
        const pattern = patterns[currentPattern];
        titleElement.textContent = pattern.name;

        switch (pattern.type) {
            case 'horizontal':
                layer.style.background = 'repeating-linear-gradient(0deg, #000 0px, #000 2px, #fff 2px, #fff 4px)';
                layer.style.backgroundImage = '';
                break;
            case 'vertical':
                layer.style.background = 'repeating-linear-gradient(90deg, #000 0px, #000 2px, #fff 2px, #fff 4px)';
                layer.style.backgroundImage = '';
                break;
            case 'grid':
                layer.style.background = '#fff';
                layer.style.backgroundImage = 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 20px)';
                break;
            case 'checkerboard':
                layer.style.background = '';
                layer.style.backgroundImage = 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)';
                layer.style.backgroundSize = '40px 40px';
                break;
            default:
                layer.style.background = '#fff';
                layer.style.backgroundImage = '';
        }
    }

    function changePattern(direction) {
        currentPattern = (currentPattern + direction + patterns.length) % patterns.length;
        updatePattern();
    }
}

function loadFocusTest(target) {
    target.style.backgroundColor = '#ffffff';

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const ctx = canvas.getContext('2d');
    target.appendChild(canvas);

    const { controls } = createControls({ title: '对焦测试模式' });
    const instruction = createInstruction('检查中心图案和四角文字是否清晰，线条是否锐利');
    target.appendChild(controls);
    target.appendChild(instruction);

    function drawPattern() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;

        for (let i = 5; i > 0; i -= 1) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, i * 30, 0, Math.PI * 2);
            ctx.fillStyle = i % 2 === 0 ? '#000' : '#fff';
            ctx.fill();
        }

        const testText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
        const rightTextX = Math.max(20, width - 380);
        const bottomTextY = Math.max(30, height - 20);

        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(testText, 20, 30);
        ctx.fillText(testText, rightTextX, 30);
        ctx.fillText(testText, 20, bottomTextY);
        ctx.fillText(testText, rightTextX, bottomTextY);

        for (let angle = 0; angle < 360; angle += 15) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            const radian = (angle * Math.PI) / 180;
            const x = centerX + Math.cos(radian) * 200;
            const y = centerY + Math.sin(radian) * 200;
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    const resizeHandler = () => drawPattern();
    window.addEventListener('resize', resizeHandler);
    drawPattern();

    setCleanup(() => {
        window.removeEventListener('resize', resizeHandler);
    });
}

function loadBreathingTest(target) {
    target.style.backgroundColor = '#808080';

    const overlay = createFullLayer();
    overlay.style.backgroundColor = '#ffffff';
    overlay.style.animation = 'breathe 3s ease-in-out infinite';
    target.appendChild(overlay);

    const { controls } = createControls({ title: '呼吸效应测试' });
    const instruction = createInstruction('观察屏幕亮度变化是否均匀平滑，是否有闪烁或不均匀现象');

    target.appendChild(controls);
    target.appendChild(instruction);
}

function loadContrastTest(target) {
    target.style.backgroundColor = '#000';

    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2px;
        width: 80%;
        max-width: 800px;
    `;

    const blocks = [
        { bg: '#000', text: '#fff', label: '黑底白字' },
        { bg: '#fff', text: '#000', label: '白底黑字' },
        { bg: '#000', text: '#808080', label: '黑底灰字' },
        { bg: '#fff', text: '#808080', label: '白底灰字' }
    ];

    blocks.forEach((block) => {
        const item = document.createElement('div');
        item.style.cssText = `
            background: ${block.bg};
            color: ${block.text};
            padding: 3rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
        `;
        item.textContent = block.label;
        testDiv.appendChild(item);
    });

    target.appendChild(testDiv);

    const { controls } = createControls({ title: '对比度测试' });
    const instruction = createInstruction('检查文字是否清晰可辨，对比度是否足够');

    target.appendChild(controls);
    target.appendChild(instruction);
}

function loadGrayscaleTest(target) {
    target.style.backgroundColor = '#000';

    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 1000px;
    `;

    const gradientDiv = document.createElement('div');
    gradientDiv.style.cssText = `
        width: 100%;
        height: 100px;
        display: flex;
        margin-bottom: 2rem;
    `;

    for (let i = 0; i < 32; i += 1) {
        const shade = Math.floor((255 / 31) * i);
        const block = document.createElement('div');
        block.style.cssText = `
            flex: 1;
            background-color: rgb(${shade}, ${shade}, ${shade});
        `;
        gradientDiv.appendChild(block);
    }

    testDiv.appendChild(gradientDiv);

    const smoothGradient = document.createElement('div');
    smoothGradient.style.cssText = `
        width: 100%;
        height: 100px;
        background: linear-gradient(90deg, #000 0%, #fff 100%);
    `;
    testDiv.appendChild(smoothGradient);

    target.appendChild(testDiv);

    const { controls } = createControls({ title: '色阶测试' });
    const instruction = createInstruction('观察灰阶过渡是否平滑，是否能区分每一级，是否有色带现象');

    target.appendChild(controls);
    target.appendChild(instruction);
}

function loadSaturationTest(target) {
    target.style.backgroundColor = '#1a1a1a';

    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        width: 80%;
        max-width: 900px;
    `;

    const colors = [
        { name: '红色渐变', start: '#000', end: '#ff0000' },
        { name: '绿色渐变', start: '#000', end: '#00ff00' },
        { name: '蓝色渐变', start: '#000', end: '#0000ff' },
        { name: '青色渐变', start: '#000', end: '#00ffff' },
        { name: '品红渐变', start: '#000', end: '#ff00ff' },
        { name: '黄色渐变', start: '#000', end: '#ffff00' }
    ];

    colors.forEach((color) => {
        const item = document.createElement('div');
        item.style.cssText = `
            height: 150px;
            background: linear-gradient(180deg, ${color.start} 0%, ${color.end} 100%);
            border-radius: 0.5rem;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 1rem;
        `;

        const label = document.createElement('span');
        label.textContent = color.name;
        label.style.cssText = `
            color: white;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        `;

        item.appendChild(label);
        testDiv.appendChild(item);
    });

    target.appendChild(testDiv);

    const { controls } = createControls({ title: '饱和度测试' });
    const instruction = createInstruction('检查颜色是否鲜艳饱满，渐变是否平滑自然');

    target.appendChild(controls);
    target.appendChild(instruction);
}
