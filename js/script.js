let currentTest = null;
let currentCleanup = null;

const container = document.getElementById('fullscreenTest');

const I18N_TEXT = {
    en: {
        'home.title': 'Display Diagnostic Suite',
        'home.subtitle': 'Professional web-based diagnostics for display quality, uniformity, sharpness, and color fidelity.',
        'home.grid.aria': 'Display diagnostics mode list',
        'home.card.solid.title': 'Solid Color Uniformity',
        'home.card.solid.desc': 'Detect dead, stuck, or dim pixels using full-screen black, white, red, green, blue, and additional color fields.',
        'home.card.solid.aria': 'Start solid color uniformity test',
        'home.card.lightLeak.title': 'Light Leakage Inspection',
        'home.card.lightLeak.desc': 'Assess edge and corner backlight bleed under a pure black background in low ambient light.',
        'home.card.lightLeak.aria': 'Start light leakage inspection',
        'home.card.interference.title': 'Interference Pattern Analysis',
        'home.card.interference.desc': 'Reveal moire artifacts, distortion, and pixel matrix irregularities with stripe and grid patterns.',
        'home.card.interference.aria': 'Start interference pattern analysis',
        'home.card.focus.title': 'Focus & Sharpness Calibration',
        'home.card.focus.desc': 'Verify center-to-corner clarity, line precision, and text sharpness across the panel.',
        'home.card.focus.aria': 'Start focus and sharpness calibration',
        'home.card.breathing.title': 'Luminance Breathing Check',
        'home.card.breathing.desc': 'Evaluate smoothness and uniformity of brightness transitions to identify flicker or instability.',
        'home.card.breathing.aria': 'Start luminance breathing check',
        'home.card.contrast.title': 'Contrast Legibility',
        'home.card.contrast.desc': 'Measure black-white separation and readability performance under high and low contrast text blocks.',
        'home.card.contrast.aria': 'Start contrast legibility test',
        'home.card.grayscale.title': 'Grayscale Gradient',
        'home.card.grayscale.desc': 'Check step visibility and tonal smoothness to detect banding or abrupt gray-level transitions.',
        'home.card.grayscale.aria': 'Start grayscale gradient test',
        'home.card.saturation.title': 'Color Saturation Ramp',
        'home.card.saturation.desc': 'Inspect chroma intensity and color fidelity using controlled RGB/CMY gradient ramps.',
        'home.card.saturation.aria': 'Start color saturation ramp test',
        'home.footer.about': 'About',
        'home.footer.privacy': 'Privacy Policy',
        'home.footer.copyright': '© 2025 Display Diagnostic Suite | Built by ET',
        'meta.title': 'Display Diagnostic Suite - Professional Online Screen Quality Testing | By ET',
        'meta.description': 'Display Diagnostic Suite is a professional web-based screen quality tool with 8 diagnostic modes for dead pixels, light leakage, contrast, grayscale, and color performance.',
        'meta.keywords': 'display diagnostics, dead pixel test, light leakage test, monitor test, LCD test, OLED test, ET',
        'meta.og.title': 'Display Diagnostic Suite - Professional Online Screen Quality Testing',
        'meta.og.description': 'A professional web-based display testing suite with 8 diagnostic modes.',
        'meta.twitter.title': 'Display Diagnostic Suite - Professional Online Screen Quality Testing',
        'meta.twitter.description': 'Professional display diagnostics with 8 web-based test modes.',
        'test.control.previous': 'Previous',
        'test.control.next': 'Next',
        'test.control.close': 'Close (ESC)',
        'test.solid.color.black': 'Black',
        'test.solid.color.white': 'White',
        'test.solid.color.red': 'Red',
        'test.solid.color.green': 'Green',
        'test.solid.color.blue': 'Blue',
        'test.solid.color.cyan': 'Cyan',
        'test.solid.color.magenta': 'Magenta',
        'test.solid.color.yellow': 'Yellow',
        'test.solid.instruction': 'Inspect the panel carefully for dead, stuck, or dim pixels.',
        'test.lightLeak.title': 'Light Leakage Inspection',
        'test.lightLeak.instruction': 'In a dark environment, inspect all panel edges and corners for visible backlight bleed.',
        'test.interference.pattern.horizontal': 'Horizontal Stripes',
        'test.interference.pattern.vertical': 'Vertical Stripes',
        'test.interference.pattern.grid': 'Grid',
        'test.interference.pattern.checkerboard': 'Checkerboard',
        'test.interference.instruction': 'Check whether lines remain straight and sharp without waves, distortion, or moire artifacts.',
        'test.focus.title': 'Focus & Sharpness Calibration',
        'test.focus.instruction': 'Evaluate center target, corner text sharpness, and radial line clarity.',
        'test.breathing.title': 'Luminance Breathing Check',
        'test.breathing.instruction': 'Observe whether brightness transitions are smooth and uniform, without flicker.',
        'test.contrast.title': 'Contrast Legibility',
        'test.contrast.instruction': 'Verify text readability and tonal separation under different contrast conditions.',
        'test.contrast.block.blackOnWhite': 'Black on White',
        'test.contrast.block.whiteOnBlack': 'White on Black',
        'test.contrast.block.grayOnBlack': 'Gray on Black',
        'test.contrast.block.grayOnWhite': 'Gray on White',
        'test.grayscale.title': 'Grayscale Gradient',
        'test.grayscale.instruction': 'Check smooth grayscale transitions and ensure each tone step is distinguishable.',
        'test.saturation.title': 'Color Saturation Ramp',
        'test.saturation.instruction': 'Assess color richness, consistency, and gradient smoothness across channels.',
        'test.saturation.ramp.red': 'Red Ramp',
        'test.saturation.ramp.green': 'Green Ramp',
        'test.saturation.ramp.blue': 'Blue Ramp',
        'test.saturation.ramp.cyan': 'Cyan Ramp',
        'test.saturation.ramp.magenta': 'Magenta Ramp',
        'test.saturation.ramp.yellow': 'Yellow Ramp'
    },
    zh: {
        'home.title': '屏幕检测专家',
        'home.subtitle': '专业的在线屏幕质量诊断平台，覆盖均匀性、清晰度、对比度与色彩表现评估。',
        'home.grid.aria': '屏幕诊断模式列表',
        'home.card.solid.title': '纯色均匀性测试',
        'home.card.solid.desc': '通过黑白及 RGB 扩展纯色全屏检测坏点、亮点、暗点等像素异常。',
        'home.card.solid.aria': '开始纯色均匀性测试',
        'home.card.lightLeak.title': '漏光诊断',
        'home.card.lightLeak.desc': '在低环境光与纯黑背景下评估屏幕边缘及角落漏光情况。',
        'home.card.lightLeak.aria': '开始漏光诊断',
        'home.card.interference.title': '干扰纹理分析',
        'home.card.interference.desc': '利用条纹与网格图案识别摩尔纹、畸变及像素矩阵异常。',
        'home.card.interference.aria': '开始干扰纹理分析',
        'home.card.focus.title': '对焦与锐度校准',
        'home.card.focus.desc': '验证中心到边角的文本与线条清晰度，评估整体锐度表现。',
        'home.card.focus.aria': '开始对焦与锐度校准',
        'home.card.breathing.title': '亮度呼吸一致性',
        'home.card.breathing.desc': '检查亮度过渡的连续性与均匀性，识别闪烁与不稳定问题。',
        'home.card.breathing.aria': '开始亮度呼吸一致性测试',
        'home.card.contrast.title': '对比度可读性测试',
        'home.card.contrast.desc': '评估黑白分离与灰阶层次在高低对比文本场景中的可辨识度。',
        'home.card.contrast.aria': '开始对比度可读性测试',
        'home.card.grayscale.title': '灰阶渐变测试',
        'home.card.grayscale.desc': '检查灰阶级别可分辨性与渐变平滑度，识别色带与跳变。',
        'home.card.grayscale.aria': '开始灰阶渐变测试',
        'home.card.saturation.title': '饱和度渐变测试',
        'home.card.saturation.desc': '使用 RGB/CMY 渐变条评估色彩饱和度、过渡自然度与还原能力。',
        'home.card.saturation.aria': '开始饱和度渐变测试',
        'home.footer.about': '关于',
        'home.footer.privacy': '隐私政策',
        'home.footer.copyright': '© 2025 屏幕检测专家 | 作者: ET',
        'meta.title': '屏幕检测专家 - 专业的在线屏幕质量检测工具 | ET出品',
        'meta.description': '屏幕检测专家是一款免费的在线屏幕质量检测工具，支持坏点、漏光、对比度、灰阶与色彩等8种专业检测模式。',
        'meta.keywords': '屏幕检测,坏点检测,漏光测试,屏幕测试工具,显示器检测,LCD测试,OLED测试,ET',
        'meta.og.title': '屏幕检测专家 - 专业的在线屏幕质量检测工具',
        'meta.og.description': '免费在线屏幕检测工具，支持纯色、漏光、对比度、色阶等8种测试模式。',
        'meta.twitter.title': '屏幕检测专家 - 专业的在线屏幕质量检测工具',
        'meta.twitter.description': '免费在线屏幕检测工具，支持8种专业测试模式。',
        'test.control.previous': '上一个',
        'test.control.next': '下一个',
        'test.control.close': '关闭 (ESC)',
        'test.solid.color.black': '黑色',
        'test.solid.color.white': '白色',
        'test.solid.color.red': '红色',
        'test.solid.color.green': '绿色',
        'test.solid.color.blue': '蓝色',
        'test.solid.color.cyan': '青色',
        'test.solid.color.magenta': '品红',
        'test.solid.color.yellow': '黄色',
        'test.solid.instruction': '仔细观察屏幕，寻找异常的亮点、坏点或暗点。',
        'test.lightLeak.title': '漏光测试模式',
        'test.lightLeak.instruction': '在暗室环境下观察屏幕四周边缘，检查是否有明显漏光现象。',
        'test.interference.pattern.horizontal': '横向条纹',
        'test.interference.pattern.vertical': '纵向条纹',
        'test.interference.pattern.grid': '网格',
        'test.interference.pattern.checkerboard': '棋盘格',
        'test.interference.instruction': '观察条纹是否清晰笔直，是否出现波纹、扭曲或摩尔纹。',
        'test.focus.title': '对焦测试模式',
        'test.focus.instruction': '检查中心图案、四角文字与放射线条是否清晰锐利。',
        'test.breathing.title': '呼吸效应测试',
        'test.breathing.instruction': '观察亮度变化是否均匀平滑，是否存在闪烁或不均匀现象。',
        'test.contrast.title': '对比度测试',
        'test.contrast.instruction': '检查文字是否清晰可辨，并评估对比层次表现。',
        'test.contrast.block.blackOnWhite': '白底黑字',
        'test.contrast.block.whiteOnBlack': '黑底白字',
        'test.contrast.block.grayOnBlack': '黑底灰字',
        'test.contrast.block.grayOnWhite': '白底灰字',
        'test.grayscale.title': '色阶测试',
        'test.grayscale.instruction': '观察灰阶过渡是否平滑，是否能区分每一级并识别色带。',
        'test.saturation.title': '饱和度测试',
        'test.saturation.instruction': '检查颜色是否鲜艳饱满，渐变过渡是否平滑自然。',
        'test.saturation.ramp.red': '红色渐变',
        'test.saturation.ramp.green': '绿色渐变',
        'test.saturation.ramp.blue': '蓝色渐变',
        'test.saturation.ramp.cyan': '青色渐变',
        'test.saturation.ramp.magenta': '品红渐变',
        'test.saturation.ramp.yellow': '黄色渐变'
    }
};

const LANGUAGE_STORAGE_KEY = 'screen-inspection-language';
let currentLanguage = 'en';

if (container) {
    document.addEventListener('DOMContentLoaded', initPage);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
}

function initPage() {
    initTestCards();
    initLanguageSwitcher();
}

function initTestCards() {
    const cards = document.querySelectorAll('.test-card[data-test]');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            startTest(card.dataset.test);
        });
    });
}

function initLanguageSwitcher() {
    const languageButtons = document.querySelectorAll('.lang-btn[data-lang]');
    if (!languageButtons.length) {
        return;
    }

    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const initialLanguage = savedLanguage === 'zh' ? 'zh' : 'en';
    applyLanguage(initialLanguage);

    languageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const language = button.dataset.lang === 'zh' ? 'zh' : 'en';
            applyLanguage(language);
            localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        });
    });
}

function applyLanguage(language) {
    const locale = I18N_TEXT[language] ? language : 'en';
    const dictionary = I18N_TEXT[locale];
    currentLanguage = locale;

    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
        const attributeMappings = element.getAttribute('data-i18n-attr').split(';');
        attributeMappings.forEach((mapping) => {
            const [attributeName, key] = mapping.split(':');
            if (attributeName && key && dictionary[key]) {
                element.setAttribute(attributeName.trim(), dictionary[key]);
            }
        });
    });

    updateMetaByLanguage(dictionary);

    document.querySelectorAll('.lang-btn[data-lang]').forEach((button) => {
        const isActive = button.dataset.lang === locale;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function getLocalizedText(key) {
    return I18N_TEXT[currentLanguage]?.[key] || I18N_TEXT.en[key] || key;
}

function updateMetaByLanguage(dictionary) {
    document.title = dictionary['meta.title'];

    const descriptionMeta = document.querySelector('meta[name="description"]');
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');

    if (descriptionMeta) {
        descriptionMeta.setAttribute('content', dictionary['meta.description']);
    }

    if (keywordsMeta) {
        keywordsMeta.setAttribute('content', dictionary['meta.keywords']);
    }

    if (ogTitleMeta) {
        ogTitleMeta.setAttribute('content', dictionary['meta.og.title']);
    }

    if (ogDescriptionMeta) {
        ogDescriptionMeta.setAttribute('content', dictionary['meta.og.description']);
    }

    if (twitterTitleMeta) {
        twitterTitleMeta.setAttribute('content', dictionary['meta.twitter.title']);
    }

    if (twitterDescriptionMeta) {
        twitterDescriptionMeta.setAttribute('content', dictionary['meta.twitter.description']);
    }
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
        prevButton.textContent = getLocalizedText('test.control.previous');
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
        nextButton.textContent = getLocalizedText('test.control.next');
        nextButton.addEventListener('click', onNext);
        controls.appendChild(nextButton);
    }

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close-btn';
    closeButton.textContent = getLocalizedText('test.control.close');
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
        { nameKey: 'test.solid.color.black', value: '#000000' },
        { nameKey: 'test.solid.color.white', value: '#FFFFFF' },
        { nameKey: 'test.solid.color.red', value: '#FF0000' },
        { nameKey: 'test.solid.color.green', value: '#00FF00' },
        { nameKey: 'test.solid.color.blue', value: '#0000FF' },
        { nameKey: 'test.solid.color.cyan', value: '#00FFFF' },
        { nameKey: 'test.solid.color.magenta', value: '#FF00FF' },
        { nameKey: 'test.solid.color.yellow', value: '#FFFF00' }
    ];

    let currentColorIndex = 0;

    const { controls, titleElement } = createControls({
        title: getLocalizedText(colors[currentColorIndex].nameKey),
        onPrev: () => changeColor(-1),
        onNext: () => changeColor(1)
    });

    const instruction = createInstruction(getLocalizedText('test.solid.instruction'));

    target.appendChild(controls);
    target.appendChild(instruction);

    updateColor();

    function updateColor() {
        target.style.backgroundColor = colors[currentColorIndex].value;
        titleElement.textContent = getLocalizedText(colors[currentColorIndex].nameKey);
    }

    function changeColor(direction) {
        currentColorIndex = (currentColorIndex + direction + colors.length) % colors.length;
        updateColor();
    }
}

function loadLightLeakTest(target) {
    target.style.backgroundColor = '#000000';

    const { controls } = createControls({ title: getLocalizedText('test.lightLeak.title') });
    const instruction = createInstruction(getLocalizedText('test.lightLeak.instruction'));

    target.appendChild(controls);
    target.appendChild(instruction);
}

function loadInterferenceTest(target) {
    const patterns = [
        { nameKey: 'test.interference.pattern.horizontal', type: 'horizontal' },
        { nameKey: 'test.interference.pattern.vertical', type: 'vertical' },
        { nameKey: 'test.interference.pattern.grid', type: 'grid' },
        { nameKey: 'test.interference.pattern.checkerboard', type: 'checkerboard' }
    ];

    let currentPattern = 0;

    const layer = createFullLayer();
    target.appendChild(layer);

    const { controls, titleElement } = createControls({
        title: getLocalizedText(patterns[currentPattern].nameKey),
        onPrev: () => changePattern(-1),
        onNext: () => changePattern(1)
    });
    const instruction = createInstruction(getLocalizedText('test.interference.instruction'));

    target.appendChild(controls);
    target.appendChild(instruction);

    updatePattern();

    function updatePattern() {
        const pattern = patterns[currentPattern];
        titleElement.textContent = getLocalizedText(pattern.nameKey);

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

    const { controls } = createControls({ title: getLocalizedText('test.focus.title') });
    const instruction = createInstruction(getLocalizedText('test.focus.instruction'));
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

    const { controls } = createControls({ title: getLocalizedText('test.breathing.title') });
    const instruction = createInstruction(getLocalizedText('test.breathing.instruction'));

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
        { bg: '#000', text: '#fff', label: getLocalizedText('test.contrast.block.whiteOnBlack') },
        { bg: '#fff', text: '#000', label: getLocalizedText('test.contrast.block.blackOnWhite') },
        { bg: '#000', text: '#808080', label: getLocalizedText('test.contrast.block.grayOnBlack') },
        { bg: '#fff', text: '#808080', label: getLocalizedText('test.contrast.block.grayOnWhite') }
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

    const { controls } = createControls({ title: getLocalizedText('test.contrast.title') });
    const instruction = createInstruction(getLocalizedText('test.contrast.instruction'));

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

    const { controls } = createControls({ title: getLocalizedText('test.grayscale.title') });
    const instruction = createInstruction(getLocalizedText('test.grayscale.instruction'));

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
        { name: getLocalizedText('test.saturation.ramp.red'), start: '#000', end: '#ff0000' },
        { name: getLocalizedText('test.saturation.ramp.green'), start: '#000', end: '#00ff00' },
        { name: getLocalizedText('test.saturation.ramp.blue'), start: '#000', end: '#0000ff' },
        { name: getLocalizedText('test.saturation.ramp.cyan'), start: '#000', end: '#00ffff' },
        { name: getLocalizedText('test.saturation.ramp.magenta'), start: '#000', end: '#ff00ff' },
        { name: getLocalizedText('test.saturation.ramp.yellow'), start: '#000', end: '#ffff00' }
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

    const { controls } = createControls({ title: getLocalizedText('test.saturation.title') });
    const instruction = createInstruction(getLocalizedText('test.saturation.instruction'));

    target.appendChild(controls);
    target.appendChild(instruction);
}
