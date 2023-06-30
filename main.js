const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    songs: [
        {
            name: 'Anh nang cua anh',
            singer: 'Duc Phuc',
            path: './assets/music/baihat1.mp3',
            image: './assets/images/image1.jpg',
        },
        {
            name: 'Bao nhieu tien mot mo binh yen',
            singer: 'Casper',
            path: './assets/music/baihat2.mp3',
            image: './assets/images/image2.jpeg',
        },
        {
            name: 'Nhu anh da thay em',
            singer: 'Phuc XP',
            path: './assets/music/baihat3.mp3',
            image: './assets/images/image3.jpg',
        },
        {
            name: 'Yeu khong can hua',
            singer: 'Vuong Anh Tu',
            path: './assets/music/baihat4.mp3',
            image: './assets/images/image4.jpg',
        }
    ],
    render: function(){
        console.log(123);
    },
    start: function(){
        this.render();
    }
}
    app.start();
