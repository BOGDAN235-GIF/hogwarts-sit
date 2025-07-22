const themeToggle = document.getElementById('theme-btn');
const body = document.body;
const head = document.getElementById('head');

function applyDarkTheme() {
    if (head) head.style.backgroundColor = "#0f1949ff";
}

function applyLightTheme() {
    if (head) head.style.backgroundColor = "rgba(241, 241, 241)";
}

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
        applyDarkTheme();

      document.querySelectorAll('#textwhite, .nav-link, #magik, .section-header h2').forEach(el => {
    el.style.color = 'white';
});

    } else {
        body.classList.remove('dark-theme');
        themeToggle.textContent = '🌙';
        applyLightTheme();

      document.querySelectorAll('#textwhite, .nav-link, #magik, .section-header h2').forEach(el => {
    el.style.color = 'black';
});

    }

    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

const header = document.getElementById("head");
const magicLink = document.getElementById("magik");
const clickText = document.querySelector('.click-text');
const crestImg = document.querySelector('.crest-img');
const spotifyWidget = document.querySelector('.spotify-widget');
const text1 = document.querySelector('.text1');
let isExpanded = false;

spotifyWidget.style.display = 'none';

magicLink.addEventListener("mouseenter", () => {
    header.style.height = "330px";
    isExpanded = true;
    text2.style.display = "none"
});

header.addEventListener("mouseleave", () => {
    header.style.height = "90px";
    isExpanded = false;
    text1.style.opacity = '1';
    text1.style.display = 'flex';
    spotifyWidget.style.display = 'none';
    spotifyWidget.style.opacity = '0';
});

function toggleMusicWidget() {
    if (!isExpanded) return;
    
    text1.style.transition = 'opacity 0.5s ease';
    text1.style.opacity = '0';
    
    setTimeout(() => {
        text1.style.display = 'none';
        spotifyWidget.style.display = 'block';
        setTimeout(() => {
            spotifyWidget.style.transition = 'opacity 0.5s ease';
            spotifyWidget.style.opacity = '1';
        }, 50);
    }, 200);
}

crestImg.addEventListener('click', toggleMusicWidget);
clickText.addEventListener('click', toggleMusicWidget);

const letters = document.querySelectorAll('.letter');
const container = document.querySelector('.floating-letters');

const style = document.createElement('style');
style.textContent = `
    @keyframes letterTilt {
        0%, 100% { transform: rotate(0deg) translateY(0); }
        25% { transform: rotate(-15deg) translateY(-10px); }
        50% { transform: rotate(15deg) translateY(-5px); }
        75% { transform: rotate(-5deg) translateY(-7px); }
    }
    @keyframes letterFly {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }
    @keyframes letterFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

letters.forEach(letter => {
    let isAnimating = false;
    
    letter.style.opacity = '0';
    letter.style.transform = 'translateY(50px) rotate(10deg)';
    
    setTimeout(() => {
        letter.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0) rotate(0deg)';
        
        setTimeout(() => {
            letter.style.animation = 'letterFloat 6s infinite ease-in-out';
        }, 800);
    }, Math.random() * 1500);
    
    const handleMouseEnter = () => {
        if (isAnimating) return;
        letter.style.animation = 'letterTilt 2s infinite';
    };
    
    const handleMouseLeave = () => {
        if (isAnimating) return;
        letter.style.animation = 'letterFloat 6s infinite ease-in-out';
    };
    
    const handleClick = () => {
        if (isAnimating) return;
        isAnimating = true;
        
        letter.style.animation = 'letterFly 1s forwards';
        letter.style.transition = '';
        
        setTimeout(() => {
            const containerRect = container.getBoundingClientRect();
            const minTop = 300;
            const maxTop = containerRect.height - letter.clientHeight;
            const randomLeft = Math.random() * (containerRect.width - letter.clientWidth);
            const randomTop = minTop + Math.random() * (maxTop - minTop);
            
            letter.style.animation = '';
            letter.style.transition = 'left 1.5s ease-out, top 1.5s ease-out';
            letter.style.left = `${randomLeft}px`;
            letter.style.top = `${randomTop}px`;
            
            setTimeout(() => {
                isAnimating = false;
                letter.style.animation = 'letterFloat 5s infinite ease-in-out';
                letter.addEventListener('mouseenter', handleMouseEnter);
                letter.addEventListener('mouseleave', handleMouseLeave);
            }, 2000);
            
        }, 1000);
        
        letter.removeEventListener('mouseenter', handleMouseEnter);
        letter.removeEventListener('mouseleave', handleMouseLeave);
    };
    
    letter.addEventListener('click', handleMouseEnter);
    letter.addEventListener('mouseleave', handleMouseLeave);
    letter.addEventListener('mouseenter', handleClick);
});

const characterCards = document.querySelectorAll('.character-card');
characterCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const house = this.getAttribute('data-house');
        let color;
        
        switch(house) {
            case 'gryffindor': color = 'rgba(116, 0, 1, 0.2)'; break;
            case 'slytherin': color = 'rgba(26, 71, 42, 0.2)'; break;
            case 'ravenclaw': color = 'rgba(14, 26, 64, 0.2)'; break;
            case 'hufflepuff': color = 'rgba(236, 185, 57, 0.2)'; break;
            default: color = 'rgba(148, 107, 45, 0.2)';
        }
        
        this.style.boxShadow = `0 0 20px ${color}`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
});

const modals = {
    'harry': document.getElementById('harry-modal'),
    'hermione': document.getElementById('hermione-modal'),
    'ron': document.getElementById('ron-modal'),
    'voldemort': document.getElementById('voldemort-modal')
};

function showModal(character) {
    const modal = modals[character];
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const character = this.getAttribute('data-character');
        showModal(character);
    });
});

document.querySelectorAll('.close-modal, .modal-close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.character-modal');
        closeModal(modal);
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('character-modal')) {
        closeModal(e.target);
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(modal);
            }
        });
    }
});

const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('mouseenter', function() {
        this.innerHTML = 'Погрузиться в волшебство <i class="fas fa-magic fa-spin"></i>';
    });
    
    exploreBtn.addEventListener('mouseleave', function() {
        this.innerHTML = 'Погрузиться в волшебство <i class="fas fa-magic"></i>';
    });
    
    exploreBtn.addEventListener('click', function() {
        document.getElementById('characters').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

function initSparks() {
    const sparksContainer = document.querySelector('.sparks');
    if (!sparksContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;
        spark.style.animationDelay = `${Math.random() * 3}s`;
        sparksContainer.appendChild(spark);
    }
}

initSparks();

document.addEventListener('mousemove', function(e) {
    const sparks = document.querySelectorAll('.spark');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    sparks.forEach((spark, index) => {
        const speedX = (index % 3) * 0.02;
        const speedY = (index % 2) * 0.03;
        
        const moveX = (mouseX - 0.5) * 100 * speedX;
        const moveY = (mouseY - 0.5) * 100 * speedY;
        
        spark.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

window.addEventListener('load', function() {
    const title = document.querySelector('.title');
    if (title) {
        title.style.animation = 'glow 2s infinite alternate';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const magik = document.getElementById('magik');
    const head = document.getElementById('head');
    const secondHead = document.querySelector('.second_head');
    const miniHead = document.querySelector('.mini-head');
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function initHeader() {
        if (isMobile()) {
            magik.removeEventListener('mouseenter', expandHeader);
            head.removeEventListener('mouseleave', collapseHeader);
            
            burgerCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    head.style.height = '320px';
                    miniHead.style.display = 'flex';
                    setTimeout(() => {
                        miniHead.style.opacity = '1';
                    }, 10);
                } else {
                    miniHead.style.opacity = '0';
                    setTimeout(() => {
                        miniHead.style.display = 'none';
                        head.style.height = '90px';
                    }, 300);
                }
            });
        } else {
            burgerCheckbox.checked = false;
            burgerCheckbox.removeEventListener('change', function() {});
            
            magik.addEventListener('mouseenter', expandHeader);
            head.addEventListener('mouseleave', collapseHeader);
        }
    }
    
    function expandHeader() {
        head.style.height = '330px';
        secondHead.style.display = 'flex';
        setTimeout(() => {
            secondHead.style.opacity = '1';
        }, 10);
    }
    
    function collapseHeader() {
        secondHead.style.opacity = '0';
        setTimeout(() => {
            secondHead.style.display = 'none';
            head.style.height = '90px';
        }, 300);
    }
    
    initHeader();
    
    window.addEventListener('resize', initHeader);
    
    if (!isMobile()) {
        const toggleMusicWidget = () => {
            document.querySelector('.text1').style.display = 'none';
            document.querySelector('.spotify-widget').style.display = 'block';
        };
        
        document.querySelector('.crest-img').addEventListener('click', toggleMusicWidget);
        document.querySelector('.click-text').addEventListener('click', toggleMusicWidget);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const spells = {
        'avada-kedavra': {
            name: "Avada Kedavra",
            effect: "Ярко-зелёная вспышка света, мгновенно убивающая жертву. Одно из трёх Непростительных заклинаний.",
            type: "Тёмные искусства",
            difficulty: "Экстремальная",
            incantation: "Авада Кедавра",
            history: "Одно из древнейших заклинаний, известное как 'Убивающее проклятие'. Запрещено Министерством магии.",
            color: "#2a9d8f",
            textEffect: "AVADA KEDAVRA",
            category: "dark"
        },
        'expelliarmus': {
            name: "Expelliarmus",
            effect: "Красная вспышка, выбивающая оружие или палочку из рук противника. Также может отбрасывать противника назад.",
            type: "Защитное",
            difficulty: "Средняя",
            incantation: "Экспеллиармус",
            history: "Широко использовалось в битвах с Тёмным Лордом. Простое, но эффективное заклинание.",
            color: "#e63946",
            textEffect: "EXPELLIARMUS",
            category: "defense"
        },
        'expecto-patronum': {
            name: "Expecto Patronum",
            effect: "Создаёт серебристого Патронуса - защитное воплощение счастливых воспоминаний, отгоняющее дементоров.",
            type: "Защитное",
            difficulty: "Сложная",
            incantation: "Экспекто Патронум",
            history: "Использовалось Орденом Феникса для защиты от дементоров. Требует сильного счастливого воспоминания.",
            color: "#a8dadc",
            textEffect: "EXPECTO PATRONUM",
            category: "defense"
        },
        'wingardium-leviosa': {
            name: "Wingardium Leviosa",
            effect: "Заставляет объекты левитировать в воздухе. Чем сильнее маг, тем тяжелее объекты можно поднять.",
            type: "Утилитарное",
            difficulty: "Начальная",
            incantation: "Вингардиум Левиоса",
            history: "Одно из первых заклинаний, изучаемых в Хогвартсе. Важно правильное произношение.",
            color: "#f4a261",
            textEffect: "WINGARDIUM LEVIOSA",
            category: "utility"
        },
        'lumos': {
            name: "Lumos",
            effect: "Зажигает небольшой свет на кончике волшебной палочки, подобно фонарику.",
            type: "Утилитарное",
            difficulty: "Простая",
            incantation: "Люмос",
            history: "Одно из самых распространённых заклинаний, используемых в повседневной жизни.",
            color: "#ffd166",
            textEffect: "LUMOS",
            category: "utility"
        },
        'nox': {
            name: "Nox",
            effect: "Гасит свет, созданный заклинанием Люмос.",
            type: "Утилитарное",
            difficulty: "Простая",
            incantation: "Нокс",
            history: "Создано как парное заклинание к Люмос для удобства.",
            color: "#3a5a40",
            textEffect: "NOX",
            category: "utility"
        },
        'alohomora': {
            name: "Alohomora",
            effect: "Отпирает замки и механические защёлки. Не действует на магически защищённые замки.",
            type: "Утилитарное",
            difficulty: "Средняя",
            incantation: "Алохомора",
            history: "Популярно среди магов-авантюристов и исследователей.",
            color: "#588157",
            textEffect: "ALOHOMORA",
            category: "utility"
        },
        'accio': {
            name: "Accio",
            effect: "Призывает объект к заклинателю. Чем дальше объект, тем больше требуется магической силы.",
            type: "Утилитарное",
            difficulty: "Средняя",
            incantation: "Акцио",
            history: "Использовалось для быстрого доступа к нужным предметам. Требует чёткого представления объекта.",
            color: "#3d405b",
            textEffect: "ACCIO",
            category: "utility"
        },
        'reparo': {
            name: "Reparo",
            effect: "Чинит повреждённые объекты. Эффективность зависит от сложности повреждений и мастерства мага.",
            type: "Утилитарное",
            difficulty: "Средняя",
            incantation: "Репаро",
            history: "Широко используется в быту для ремонта вещей.",
            color: "#81b29a",
            textEffect: "REPARO",
            category: "utility"
        },
        'protego': {
            name: "Protego",
            effect: "Создаёт защитный барьер, отражающий заклинания и физические атаки.",
            type: "Защитное",
            difficulty: "Сложная",
            incantation: "Протего",
            history: "Основное защитное заклинание, преподаваемое в Хогвартсе.",
            color: "#457b9d",
            textEffect: "PROTEGO",
            category: "defense"
        },
        'sectumsempra': {
            name: "Sectumsempra",
            effect: "Наносит невидимые порезы на теле жертвы, вызывая сильное кровотечение. ",
            type: "Атакующее",
            difficulty: "Сложная",
            incantation: "Сектумсемпра",
            history: "Создано Северусом Снейпом в школьные годы.",
            color: "#d62828",
            textEffect: "SECTUMSEMPRA",
            category: "attack"
        },
        'imperio': {
            name: "Imperio",
            effect: "Даёт полный контроль над действиями жертвы. Одно из трёх Непростительных заклинаний.",
            type: "Тёмные искусства",
            difficulty: "Экстремальная",
            incantation: "Империо",
            history: "Использовалось Пожирателями смерти для контроля над жертвами.",
            color: "#7209b7",
            textEffect: "IMPERIO",
            category: "dark"
        },
        'crucio': {
            name: "Crucio",
            effect: "Причиняет невыносимую боль жертве. Одно из трёх Непростительных заклинаний.",
            type: "Тёмные искусства",
            difficulty: "Экстремальная",
            incantation: "Круцио",
            history: "Использовалось как орудие пыток Тёмными магами.",
            color: "#b5179e",
            textEffect: "CRUCIO",
            category: "dark"
        },
        'riddikulus': {
            name: "Riddikulus",
            effect: "Превращает боггарта (существо, принимающее облик худшего страха человека) в смешную форму.",
            type: "Защитное",
            difficulty: "Средняя",
            incantation: "Ридикулус",
            history: "Используется против боггартов. Требует силы воли.",
            color: "#ff9f1c",
            textEffect: "RIDDIKULUS",
            category: "defense"
        },
        'aguamenti': {
            name: "Aguamenti",
            effect: "Создаёт поток воды из кончика палочки. Сила потока зависит от мага.",
            type: "Утилитарное",
            difficulty: "Средняя",
            incantation: "Агуаменти",
            history: "Используется для тушения пожаров или создания воды в пустыне.",
            color: "#4cc9f0",
            textEffect: "AGUAMENTI",
            category: "utility"
        },
        'episkey': {
            name: "Episkey",
            effect: "Лечит незначительные травмы, такие как порезы, синяки или сломанные носы.",
            type: "Исцеляющее",
            difficulty: "Средняя",
            incantation: "Эпискеи",
            history: "Базовое лечебное заклинание, преподаваемое на курсах первой помощи.",
            color: "#38b000",
            textEffect: "EPISKEY",
            category: "healing"
        },
        'legilimens': {
            name: "Legilimens",
            effect: "Позволяет проникать в мысли и воспоминания другого человека.",
            type: "Тёмные искусства",
            difficulty: "Сложная",
            incantation: "Легилименс",
            history: "Использовалось для допросов и получения информации.",
            color: "#3a0ca3",
            textEffect: "LEGILIMENS",
            category: "dark"
        },
        'occlumency': {
            name: "Occlumency",
            effect: "Защищает разум от проникновения с помощью Легилименс. Требует дисциплины ума.",
            type: "Защитное",
            difficulty: "Сложная",
            incantation: "Окклюменция",
            history: "Редкое умение, которым владеют немногие маги.",
            color: "#4361ee",
            textEffect: "OCCLUMENCY",
            category: "defense"
        },
        'morsmordre': {
            name: "Morsmordre",
            effect: "Создаёт Тёмную метку (символ Черепа со Змеёй) в небе.",
            type: "Тёмные искусства",
            difficulty: "Сложная",
            incantation: "Морсмордре",
            history: "Использовалось Пожирателями смерти для устрашения.",
            color: "#480ca8",
            textEffect: "MORSMORDRE",
            category: "dark"
        },
        'finite-incantatem': {
            name: "Finite Incantatem",
            effect: "Прекращает действие других заклинаний или ослабляет их эффект.",
            type: "Защитное",
            difficulty: "Средняя",
            incantation: "Фините Инкантатем",
            history: "Используется для нейтрализации магических эффектов.",
            color: "#f72585",
            textEffect: "FINITE INCANTATEM",
            category: "defense"
        }
    };

    const wand = document.getElementById('wand');
    const castBtn = document.getElementById('cast-spell-btn');
    const spellDisplay = document.getElementById('spell-display');
    const spellName = document.querySelector('.spell-name');
    const spellEffect = document.querySelector('.spell-effect');
    const spellType = document.getElementById('spell-type');
    const spellDifficulty = document.getElementById('spell-difficulty');
    const spellIncantation = document.getElementById('spell-incantation');
    const spellHistory = document.getElementById('spell-history');
    const spellCircle = document.getElementById('spell-circle');
    const spellItems = document.querySelectorAll('.spells-list li');
    const spellSearch = document.getElementById('spell-search');
    const spellTypeFilter = document.getElementById('spell-type-filter');
    const particlesContainer = document.querySelector('.spell-particles');
    const textEffectContainer = document.querySelector('.spell-text-effect');

    function castSpell(spellKey) {
        const spell = spells[spellKey];
        if (!spell) return;

        resetSpellEffects();
        spellName.textContent = spell.name;
        spellEffect.textContent = spell.effect;
        spellType.textContent = spell.type;
        spellDifficulty.textContent = spell.difficulty;
        spellIncantation.textContent = spell.incantation;
        spellHistory.textContent = spell.history;
        spellDisplay.className = 'spell-result';
        spellDisplay.classList.add(`spell-${spell.category}`);
        
        spellCircle.style.background = `radial-gradient(circle, ${spell.color} 0%, transparent 70%)`;

        animateSpellCast(spell);
    }

    function resetSpellEffects() {
        spellCircle.style.opacity = '0';
        wand.classList.remove('wand-active');
        particlesContainer.innerHTML = '';
        textEffectContainer.innerHTML = '';
        spellCircle.style.animation = '';
        textEffectContainer.style.animation = '';
    }

    function animateSpellCast(spell) {
        setTimeout(() => {
            wand.classList.add('wand-active');
            
            spellCircle.style.opacity = '0.6';
            spellCircle.style.animation = 'spellCircle 1.5s ease-out';
            
            if (spell.textEffect) {
                textEffectContainer.textContent = spell.textEffect;
                textEffectContainer.style.color = spell.color;
                textEffectContainer.style.opacity = '1';
                textEffectContainer.style.animation = 'textAppear 1.5s ease-out';
            }
            
            createParticles(spell.color);
            
            setTimeout(() => {
                spellCircle.style.opacity = '0';
                spellCircle.style.animation = '';
                textEffectContainer.style.opacity = '0';
                textEffectContainer.style.animation = '';
            }, 1500);
        }, 50);
    }

    function createParticles(color) {
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'spell-particle';
            
            const size = Math.random() * 10 + 3;
            const duration = 1000 + Math.random() * 1000;
            const delay = Math.random() * 500;
            
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                left: `${50 + (Math.random() - 0.5) * 40}%`,
                top: `${50 + (Math.random() - 0.5) * 40}%`,
                opacity: '0',
                boxShadow: `0 0 ${Math.random() * 15 + 5}px ${color}`,
                zIndex: '5'
            });
            
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 0.8 
                },
                { 
                    transform: `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: duration,
                delay: delay
            });
            
            particlesContainer.appendChild(particle);
            
            animation.onfinish = () => particle.remove();
        }
    }

    if (castBtn) {
        castBtn.addEventListener('click', function() {
            const spellKeys = Object.keys(spells);
            const randomKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
            castSpell(randomKey);
        });
    }

    spellItems.forEach(item => {
        item.addEventListener('click', function() {
            const spellKey = this.getAttribute('data-spell');
            castSpell(spellKey);

            spellItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    if (spellSearch) {
        spellSearch.addEventListener('input', function() {
            filterSpells();
        });
    }
    
    if (spellTypeFilter) {
        spellTypeFilter.addEventListener('change', function() {
            filterSpells();
        });
    }
    
    function filterSpells() {
        const searchTerm = spellSearch.value.toLowerCase();
        const selectedType = spellTypeFilter.value;
        
        spellItems.forEach(item => {
            const spellKey = item.getAttribute('data-spell');
            const spell = spells[spellKey];
            const spellText = item.textContent.toLowerCase();
            const matchesSearch = spellText.includes(searchTerm);
            const matchesType = selectedType === 'all' || spell.category === selectedType;
            
            item.style.display = matchesSearch && matchesType ? 'grid' : 'none';
        });
    }
    const initialSpellKeys = Object.keys(spells);
    const initialKey = initialSpellKeys[Math.floor(Math.random() * initialSpellKeys.length)];
    castSpell(initialKey);
});
document.addEventListener('DOMContentLoaded', function() {
    const houses = {
        'gryffindor': {
            name: 'Гриффиндор',
            traits: ['Храбрость', 'Честь', 'Доблесть'],
            description: 'Гриффиндор ценит храбрость, отвагу, решимость и рыцарство. Основан Годриком Гриффиндором. Талисман - лев, цвета - алый и золотой. Гостиная находится в Гриффиндорской башне, а вход охраняет Жирная Дама.',
            famous: ['Гарри Поттер', 'Гермиона Грейнджер', 'Рон Уизли', 'Альбус Дамблдор'],
            banner: 'https://klev.club/uploads/posts/2023-11/1698878527_klev-club-p-arti-gerb-garri-pottera-griffindor-17.jpg'
        },
        'slytherin': {
            name: 'Слизерин',
            traits: ['Амбициозность', 'Хитрость', 'Решительность'],
            description: 'Слизерин ценит амбициозность, хитрость, находчивость и стремление к величию. Основан Салазаром Слизерином. Талисман - змея, цвета - зелёный и серебряный. Гостиная находится в подземельях под озером.',
            famous: ['Северус Снейп', 'Драко Малфой', 'Том Реддл (Волдеморт)', 'Беллатриса Лестрейндж'],
            banner: 'https://png.klev.club/uploads/posts/2024-05/png-klev-club-grvc-p-gerb-slizerin-png-1.png'
        },
        'ravenclaw': {
            name: 'Когтевран',
            traits: ['Ум', 'Мудрость', 'Творчество'],
            description: 'Когтевран ценит интеллект, мудрость, остроумие и творчество. Основан Кандидой Когтевран. Талисман - орёл, цвета - синий и бронзовый. Гостиная находится в башне на западной стороне замка.',
            famous: ['Луна Лавгуд', 'Филиус Флитвик', 'Гилдерой Локхарт', 'Чжоу Чанг'],
            banner: 'https://pm1.aminoapps.com/7167/89dcde1b6102561c03c487709408a574ff8b76cfr1-399-512v2_00.jpg'
        },
        'hufflepuff': {
            name: 'Пуффендуй',
            traits: ['Трудолюбие', 'Верность', 'Справедливость'],
            description: 'Пуффендуй ценит трудолюбие, терпение, верность и справедливость. Основан Пенелопой Пуффендуй. Талисман - барсук, цвета - жёлтый и чёрный. Гостиная находится рядом с кухнями.',
            famous: ['Седрик Диггори', 'Нимфадора Тонкс', 'Помона Стебль', 'Ньют Саламандер'],
            banner: 'https://abrakadabra.fun/uploads/posts/2021-12/1640199343_1-abrakadabra-fun-p-gerb-puffenduya-iz-garri-pottera-1.png'
        }
    };

    const houseOptions = document.querySelectorAll('.house-option');
    const houseName = document.getElementById('house-name');
    const houseBannerImg = document.getElementById('house-banner-img');
    const houseDescription = document.getElementById('house-description');
    const famousStudents = document.getElementById('famous-students');
    const sortingBtn = document.getElementById('sorting-btn');
    const traits = [
        document.getElementById('trait-1'),
        document.getElementById('trait-2'),
        document.getElementById('trait-3')
    ];

    function updateHouseInfo(house) {
        houseName.textContent = house.name;
        houseBannerImg.src = house.banner;
        houseDescription.textContent = house.description;
        
        traits.forEach((trait, index) => {
            trait.textContent = house.traits[index];
        });
        
        famousStudents.innerHTML = '';
        house.famous.forEach(student => {
            const li = document.createElement('li');
            li.textContent = student;
            famousStudents.appendChild(li);
        });
        
        document.querySelectorAll('.house-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector(`.house-option[data-house="${house.id || house.name.toLowerCase()}"]`)?.classList.add('selected');
    }

    houseOptions.forEach(option => {
        option.addEventListener('click', function() {
            const house = this.getAttribute('data-house');
            updateHouseInfo(houses[house]);
        });
    });

    sortingBtn.addEventListener('click', function() {
        const houseKeys = Object.keys(houses);
        const randomHouse = houseKeys[Math.floor(Math.random() * houseKeys.length)];
        
        this.textContent = "Думаю...";

        setTimeout(() => {
            updateHouseInfo(houses[randomHouse]);
            this.textContent = "Попробовать ещё раз!";
        }, 300); 
    });
    updateHouseInfo(houses['gryffindor']);
});