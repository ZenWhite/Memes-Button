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
            this.el.style.background = `url(${this.options.image}) no-repeat center center`;
            this.el.style.backgroundSize = '100%';
            this.el.style.filter = 'opacity(0.9) grayscale(0.5)';

            return this.el;
        }
        events() {
            return;
        }
        static setActiveMeme(id) {
            const el = document.querySelector(`.meme[id="${id}"]`);
            const meme = memes.get( id.toString() );
            el.style.filter = 'opacity(1) grayscale(1)';
            document.body.style.background = `url(${meme.image}) no-repeat center center`;
            document.body.style.backgroundSize = 'cover';
            play.dataset.audio = meme.audio;
            console.log(meme);
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
        console.log('play!');
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

        memes.forEach(({id, name, src, audio, image}) => {
            const meme = new Meme({id,name,src,audio,image});
            const memeBlock = meme.render();
            fragment.appendChild(memeBlock);
        });

        memeGrid.appendChild(fragment);
        Meme.setActiveMeme(1);
    }
});