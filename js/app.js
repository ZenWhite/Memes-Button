window.addEventListener('DOMContentLoaded', () => {

    //UI
    
    //Main Meme Circle Class
    class Meme {
        constructor(options) {
            /*
                {
                    id: 1,
                    name: 'Test',
                    src: 'https://google.com'
                    audio: './audio/test.mp3',
                    image: './img/test.png'
                }

                Options Object
            */
            this.options = options;
            this.render();
            this.events();
        }
        render() {
            const el = document.createElement('div');
            el.classList.add('options-page__item');
            el.id = this.options.id;
        }
        events() {
            return;
        }
        setActiveMeme() {
            return;
        }
    }

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
            const memes = new Map();

            await getMemes().then(data => {
                data.forEach(dataItem => memes.set(dataItem.id, dataItem));
            });

            memes.forEach(item => {
                console.log(item);
            });
        } catch(err) {
            console.log(err);
        }
    })();
});