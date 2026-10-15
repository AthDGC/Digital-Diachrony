/* Language switch: Greek is the default; the choice is remembered when the browser allows it. */
(function () {
    function apply(lang) {
        var code = lang === 'en' ? 'en' : 'gr';
        document.body.classList.remove('lang-gr', 'lang-en');
        document.body.classList.add('lang-' + code);
        document.documentElement.lang = code === 'en' ? 'en' : 'el';
        var buttons = document.querySelectorAll('.lang-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-lang') === code ? 'true' : 'false');
        }
        var imgs = document.querySelectorAll('img[data-alt-gr]');
        for (var k = 0; k < imgs.length; k++) {
            imgs[k].alt = imgs[k].getAttribute(code === 'en' ? 'data-alt-en' : 'data-alt-gr');
        }
        try { window.localStorage.setItem('dd-lang', code); } catch (e) { /* storage unavailable */ }
    }
    window.setLanguage = apply;
    var initial = 'gr';
    try {
        var fromUrl = new URLSearchParams(window.location.search).get('lang');
        if (fromUrl === 'en' || fromUrl === 'gr') { initial = fromUrl; }
        else {
            var saved = window.localStorage.getItem('dd-lang');
            if (saved === 'en' || saved === 'gr') { initial = saved; }
        }
    } catch (e) { /* storage unavailable */ }
    document.addEventListener('DOMContentLoaded', function () {
        var buttons = document.querySelectorAll('.lang-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () { apply(this.getAttribute('data-lang')); });
        }
        apply(initial);
    });
})();
