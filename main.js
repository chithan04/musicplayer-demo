/**
         * 1.Render songs
         * 2.Scroll top
         * 3.Play/ Pause/ Seek
         * 4.CD rotate
         * 5.Next / prev
         * 6.Random
         * 7.Next / Repeat when ended
         * 8.Active song
         * 9.Scroll active song into view
         * 10.Play song when click
         */
        
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Ánh nắng của anh',
            singer: 'Đức Phúc',
            path: './assets/music/baihat1.mp3',
            image: './assets/img/image1.jpg',
        },
        {
            name: 'Như anh đã thấy em',
            singer: 'Phúc XP',
            path: './assets/music/baihat2.mp3',
            image: './assets/img/image2.jpg',
        },
        {
            name: 'Yêu không cần hứa',
            singer: 'Vương Anh Tú',
            path: './assets/music/baihat3.mp3',
            image: './assets/img/image3.jpg',
        },
        {
            name: 'Sắp 30',
            singer: 'Trịnh Đình Quang',
            path: './assets/music/baihat4.mp3',
            image: './assets/img/image4.jpg',
        },
        {
            name: 'Dành cho em',
            singer: 'Hoàng Tôn',
            path: './assets/music/baihat5.mp3',
            image: './assets/img/image5.jpg',
        },
        {
            name: 'Hẹn em ở lần yêu thứ 2',
            singer: 'Nguyên Trần',
            path: './assets/music/baihat6.mp3',
            image: './assets/img/image6.jpg',
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index ="${index}">
                    <div class="thumb"
                         style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    </div>
    `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lí CD quay / dừng
         const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Xử lí phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lí khi click play
        
        playBtn.onclick = function() {
            if( _this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }                  
        }

        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // Khi song bị pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent
            }
        }

        // Xử lí khi tua xong
        progress.onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi next song
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong();
            }
            audio.play();
            _this.render();                
            _this.scrollToActiveSong();
        }

        // Khi prev song
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // xử lí bật / tắt random song
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lí lặp lại một song
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lí next song khi audio ended\
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playlish
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')

            if(songNode || e.target.closest('.option')){
                // Xử lí khi click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                  
                }
            }
        }

    },
    scrollToActiveSong: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })

        }, 300)
    },
  
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function(){
        this.currentIndex ++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },

    prevSong: function(){
        this.currentIndex --;
        if(this.currentIndex < 0 ){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong();
    },

    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function () {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        // Lắng nghe / Xử lí các sự kiện (Dom Events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI(user interface) khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();
    }
}
app.start();