let content = '{{ content }}';
let lang = null;
let typed = null;
window.onload = load;

const langs = ['en', 'de', 'enchant'];
const alpabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(' ');
const enchanting_table = 'ᔑ ʖ ᓵ ↸ ᒷ ⎓ ⊣ ⍑ ╎ ⋮ ꖌ ꖎ ᒲ リ 𝙹 !¡ ᑑ ∷ ᓭ ℸ ̣⚍ ⍊ ∴ ̇/ || ⨅'.split(' ');
let lang_selector_toggled = false;

function langDropdown() {
    const lang_selector = document.querySelector('.lang-selector');
    if (lang_selector_toggled) {
        lang_selector.innerHTML = '<img src="../assets/svg/lang.svg" alt="Language">';
        lang_selector_toggled = false;
    } else {
        lang_selector.innerHTML = '<img src="../assets/svg/x.svg" alt="Exit Language Selector">';
        lang_selector_toggled = true;
    }
    document.querySelectorAll('.lang').forEach(btn => {
        if (!btn.classList.contains('lang_expanded')) {
            btn.classList.add('lang_expanded')
        } else {
            btn.classList.remove('lang_expanded')
        }
    });
}

function changeLang(language) {
    if (!langs.includes(language.toLowerCase())) {
        return;
    }
    document.getElementById(`lang_${lang}`).classList.remove('lang_active');
    document.getElementById(`lang_${lang}`).classList.add('lang_inactive');
    document.cookie = `lang=${language.toLowerCase()}`;
    document.getElementById(`lang_${language}`).classList.remove('lang_inactive');
    document.getElementById(`lang_${language}`).classList.add('lang_active');
    replaceContent();
}

function replaceContent() {
    document.title = content[lang != 'enchant' ? lang : 'en'][document.querySelector('.PAGE_TITLE').id.replace('{', '').replace('}', '')];
    let changeLang = false;
    if (lang != getCookie('lang')) {
        changeLang = true;
    }
    lang = getCookie('lang');
    document.body.innerHTML.split('id=\"').forEach(element => {
        element = element.split('"')[0];
        if (element.split('')[0] == '{' && element.split('')[element.split('').length - 1] == '}') {
            const key = element.replace('{', '').replace('}', '');
            const el = document.getElementById(`{${key}}`)
            if (!el) {
                return;
            }
            let replace = content[lang != 'enchant' ? lang : 'en'][key];
            if (lang == 'enchant') {
                replace = content['en'][key];
                replace.split('').forEach(char => {
                    let enchant_char = alpabet.indexOf(char);
                    const rand = Math.round((Math.random() * enchanting_table.length - 1));
                    if (enchant_char < 0) {
                        enchant_char = (rand != -1 ? rand : 4)
                    }
                    replace = replace.replace(char, char == ' ' ? ' ' : enchanting_table[enchant_char]);
                })
            }
            if (key == 'i-am.start') {
                replace += '<span class="typed"></span>'
            }
            el.innerHTML = replace;
            
            if (!changeLang) {
                el.classList.replace('_hidden', 'hidden');
            }
        }
    });
    let strings = content[lang != 'enchant' ? lang : 'en']['i-am.values'];
    if (lang == 'enchant') {
        strings = content['en']['i-am.values'];
        let newStrigs = [];
        console.log(strings)
        strings.forEach(txt => {
            txt.split('').forEach(char => {
                let enchant_char = alpabet.indexOf(char);
                const rand = Math.round((Math.random() * enchanting_table.length - 1));
                if (enchant_char < 0) {
                    enchant_char = (rand != -1 ? rand : 4)
                }
                txt = txt.replace(char, char == ' ' ? ' ' : enchanting_table[enchant_char]);
            });
            newStrigs.push(txt);
        });
        strings = newStrigs;
        console.log(newStrigs)
    }
    typed = new Typed('.typed', {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 40,
        loop: true
    });
}

function load() {
    if (lang == null) {
        content = JSON.parse(content);
        document.body.scrollIntoView();
        const cookie = getCookie('lang');
        if (!cookie) {
            document.cookie = `lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
            lang = 'en';
            document.getElementById('lang_en').classList.remove('lang_inactive');
            document.getElementById('lang_en').classList.add('lang_active');
        } else {
            lang = cookie;
            document.getElementById(`lang_${cookie}`).classList.remove('lang_inactive');
            document.getElementById(`lang_${cookie}`).classList.add('lang_active');
        }
        replaceContent();
    } else {
        lang = getCookie('lang');
        document.getElementById(`lang_${lang}`).classList.remove('lang_inactive');
        document.getElementById(`lang_${lang}`).classList.add('lang_active');
        replaceContent();
    }
}