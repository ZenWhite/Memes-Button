window.addEventListener('DOMContentLoaded', () => {
    //Main Meme Circle Class
    class Meme {
        constructor(options) {
            this.options = options;
            this.el = document.createElement('div');
            this.events();
        }
        render() {
            this.el.classList.add('options-page__item', 'meme');
            this.el.id = this.options.id;
            this.el.style.background = `url(${this.options.image}) no-repeat center center/100%`;
            return this.el;
        }
        events() {
            document.body.addEventListener('click', ({target}) => {
                if(target.classList.contains('meme')) {
                    Meme.setActiveMeme(target.id);
                }
            });
        }
        static setActiveMeme(id) {
            const prev  = document.querySelector('.active');
            const el = document.querySelector(`.meme[id="${id}"]`);
            const meme = memes.get( id.toString() );

            if(prev) prev.classList.remove('active');
            el.classList.add('active');

            document.body.style.background = `url(${meme.image}) no-repeat center center, rgba(39,39,39,0.9)`;
            document.body.style.backgroundSize = 'cover';

            play.dataset.audio = meme.audio;
        }
    }

    //Main Memes Container
    const memes = new Map();

    //UI
    const play = document.querySelector('.play');
    const memeGrid = document.querySelector('.options-page__block');

    //Events
    play.addEventListener('click', function(e) {
        e.preventDefault();
        /*const audio = new Audio(play.dataset.audio);
        audio.play();*/
    });

    const getMemes = async () => {//Get Memes From JSON File(My Fake Database)
        try {
            const response = await fetch('./memes.json');
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    (async () => {//Main Module. I Run Code This
        try {
            await getMemes().then(data => {
                data.memes.forEach(dataItem => memes.set(dataItem.id, dataItem));
            });
            renderMemes();
        } catch(err) {
            console.log(err);
        }
    })();

    function renderMemes() {
        const fragment = document.createDocumentFragment();
        const wrap = document.createElement('div');
        wrap.classList.add('wrap');

        memes.forEach(({id, name, src, audio, image}) => {
            const meme = new Meme({id,name,src,audio,image});
            const memeBlock = meme.render();
            fragment.appendChild(memeBlock);
        });

        wrap.appendChild(fragment);
        memeGrid.appendChild(wrap);
        Meme.setActiveMeme(1);
    }
});