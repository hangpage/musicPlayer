	//@author zhuzhihang v1.0
	//@creat by zhuzhihang 2016.9
	//@parameters music currentIndex
	function Music(music,currentIndex) {
	    this.audioEl = $('<audio src=" "controls="controls" autoplay="true"></audio>');
	    this.musicLibrary = []; //模拟音乐库
	    this.line = $('<div class="player_songlist__line"></div>');
	    this.songList = $('<div class="player_songlist"></div>');
	    this.modalEl = $('<div class="player-modal"></div>');
	    this.songInfo = $('<div class="song-info"></div>');
	    this.bodyEl = $('<div class="player-body"></div>');
	    this.songList.appendTo(this.modalEl);
	    this.modalEl.appendTo(this.bodyEl);
	    this.songInfo.appendTo(this.bodyEl);
	    this.bodyEl.appendTo(document.body);
	    this.musicLibrary = music[0] ? this.musicLibrary.concat(music) : this.musicLibrary;
	    console.log(this.musicLibrary)
	    this.currentIndex = currentIndex || 0;
	    this.musicLength = this.musicLibrary.length;
	    this._init();
	    this._delegateEvents();
	}
	Music.prototype = {
	    _init: function() {
	        var elArr = [];
	        this.audioEl.attr('src', this.src);
	        this.controls = $('<div class="controls"></div>');
	        elArr.push('<div class="pre">上一首</div>');
	        elArr.push('<div class="play">播放</div>');
	        elArr.push('<div class="pause">暂停</div>');
	        elArr.push('<div class="next">下一首</div>');
	        elArr.push('<div class="restart">重新播放</div>');
	        elArr.push('<div class="loop">单曲循环</div>');
	        elArr.push('<div class="circle_loop">列表循环</div>');
	        elArr.push('<div class="stop_play">停止播放</div>');
	        elArr.push('<div class="random_play">随机播放</div>');
	        this.modalEl.append(elArr.join(''));
	        this._defaultSong();
	        this._renderList();
	        this._renderInfo();
	        this._setTitle();
	    },
	    _defaultSong: function() {
	        this._setSrc(this.musicLibrary[this.currentIndex].src);
	    },
	    _setTitle: function(){
	    	document.title = '正在播放... '+this.musicLibrary[this.currentIndex].name+'';
	    },
	    _changeSong: function(){
	    	this._setTitle();
	    	this._renderInfo();
	    },
	    _renderList: function() {
	        var els = '<i class="player_songlist__line"></i>';
	        for (var i = 0, len = this.musicLength; i < len; i++) {
	        	var music = this.musicLibrary[i];
	            els += '<li>' + music.name + '</li>';
	        }
	        this.songList.html(els);
	    },
	    _initField: function() {

	    },
	    _setMode: function(){

	    },
	    _renderInfo: function(){
	    	var inforEls = '<div class="song-info-info">';
	    	inforEls += '<div class="song_info__albumpic"><img class="song_info__pic" src="'+this.musicLibrary[this.currentIndex].albumpic+'"></div>';
	    	inforEls += '<div class="song_info__name">歌曲名:'+this.musicLibrary[this.currentIndex].name+'</div>';
            inforEls += '<div class="song_info__singer">歌手名:'+this.musicLibrary[this.currentIndex].singer+'</div>';
            inforEls += '<div class="song_info__album">专辑名:'+this.musicLibrary[this.currentIndex].album+'</div>';
            inforEls += '</div>';
	        this.songInfo.html(inforEls);
	    },
	    _getSrc: function(index) {
	        return this.musicLibrary[index].src;
	    },
	    _setSrc: function(src) {
	        this.audioEl.attr('src', src);
	    },
	    _stopPlay: function() {
	        this._pause();
	        this.audioEl[0].currentTime = 0;
	    },
	    _delegateEvents: function() {
	        var self = this;
	        this.modalEl.delegate('.play', 'click', function(e) {
	            self._play();
	        });
	        this.modalEl.delegate('.pause', 'click', function(e) {
	            self._pause();
	        });
	        this.modalEl.delegate('.pre', 'click', function(e) {
	            self._preSong();
	        });
	        this.modalEl.delegate('.next', 'click', function(e) {
	            self._nextSong();
	        });
	        this.modalEl.delegate('.restart', 'click', function(e) {
	            self._reStart();
	        });
	        this.modalEl.delegate('.loop', 'click', function(e) {
	            self._loop();
	        });
	        this.modalEl.delegate('.circle_loop', 'click', function(e) {
	            self._circleLoop();
	        });
	        this.modalEl.delegate('.stop_play', 'click', function(e) {
	            self._stopPlay();
	        });
	        this.modalEl.delegate('.random_play', 'click', function(e) {
	            self._randomPlay();
	        });
	    },
	    _play: function() {
	        this.audioEl[0].play();
	    },
	    _pause: function() {
	        this.audioEl[0].pause();
	    },
	    _preSong: function() {
	        this.currentIndex = this.currentIndex - 1;
	        this.currentIndex = this.currentIndex < 0 ? (this.musicLength - 1) : this.currentIndex;
	        this._setSrc(this.musicLibrary[this.currentIndex].src);
	        this._changeSong();
	    },
	    _nextSong: function() {
	        this.currentIndex = this.currentIndex + 1;
	        this.currentIndex = this.currentIndex > this.musicLength - 1 ? 0 : this.currentIndex;
	        this._setSrc(this.musicLibrary[this.currentIndex].src);
	        this._changeSong();
	    },
	    _loop: function() {
	        this.audioEl.attr('loop', 'true');
	    },
	    _circleLoop: function() {
	        this.currentIndex = this.currentIndex > this.musicLength - 1 ? 0 : this.currentIndex;
	    },
	    _queuePlay: function() {
	        this.currentIndex > this.musicLength - 1 ? this._stopPlay : ''; //此处可能有问题 this._stopPlay还是this._stopPlay();
	        this.currentIndex = 0;
	    },
	    _reStart: function() {
	        this.audioEl[0].load();
	    },
	    _randomPlay: function() {
	        if (this.audioEl.ended) {
	            this.currentIndex = Math.ceil(Math.random() * this.musicLength);
	            this._setSrc(this.musicLibrary[this.currentIndex].src);
	        }

	    }

	}

















	var player = new Music([
	    { name: "岁月神偷", singer: "不才", src: "不才 - 岁月神偷.mp3", duration: "04:12", albumpic: "imgs/bucai.jpg",album: '暂未添加'},
	    { name: "合家欢乐", singer: "凤凰传奇", src: "凤凰传奇 - 合家欢.mp3", duration: "02:39", albumpic: "imgs/fenghuang.jpg",album: '暂未添加'},
	    { name: "Butter-Fly", singer: "和田光司 ", src: "和田光司 - Butter-Fly.mp3", duration: "04:17", albumpic: "imgs/shumabaobei.jpg",album: '暂未添加'}, { name: "一次就好", singer: "杨宗纬 ", src: "杨宗纬 - 一次就好.mp3", duration: "04:26", albumpic: "imgs/yangzongwei.jpg",album: '暂未添加'}, { name: "向天再借五百年", singer: "韩磊 ", src: "韩磊 - 向天再借五百年.mp3", duration: "03:11", albumpic: "imgs/wubainian.jpg",album: '暂未添加'}, { name: "富士山下", singer: "Eason ", src: "陈奕迅 - 富士山下.mp3", duration: "", albumpic: "",albumpic: "imgs/T002R300x300M000003nMzes28P7wv.jpg",album: '暂未添加'}

	]);
