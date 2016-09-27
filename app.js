	
	//@author zhuzhihang v1.0
	//paragrams music:arr[{}]
	function Music(music){
		this.audioEl = $('<audio src=" "controls="controls" autoplay="true"></audio>');
		this.musicLibrary = [{src:'不才 - 岁月神偷.mp3'}];//模拟音乐库
		this.modalEl = $('<div class="uimodal"></div>');
		this.audioEl.appendTo(document.body);
		this.modalEl.appendTo(document.body);
		this.musicLibrary = music[0] ? this.musicLibrary.concat(music) : this.musicLibrary;
		this.currentIndex = 0;
		this.musicLength = this.musicLibrary.length;
		this._init();
		this._delegateEvents();
	}
	Music.prototype = {
		_init : function(){
			this.audioEl.attr('src',this.src);
			this.controls = $('<div class="controls"></div>');
			this.controls.append('<div class="pre">上一首</div><div class="play">播放</div><div class="pause">暂停</div><div class="next">下一首</div><div class="restart">重新播放</div><div class="loop">单曲循环</div><div class="circle_loop">列表循环</div><div class="stop_play">停止播放</div>');
			this.controls.appendTo(this.modalEl);
			this._defaultSong();
		},
		_defaultSong : function(){
			this._setSrc(this.musicLibrary[this.currentIndex].src);
		},
		_initField : function(){

		},
		_getSrc : function(index){
			return this.musicLibrary[index].src;
		},
		_setSrc : function(src){
			this.audioEl.attr('src',src);
		},
		_stopPlay : function(){
			this._pause();
			this.audioEl[0].currentTime = 0;
		},
		_delegateEvents : function(){
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
		},
		_play : function(){
			this.audioEl[0].play();
		},
		_pause : function(){
			this.audioEl[0].pause();
		},
		_preSong : function(){
			this.currentIndex = this.currentIndex-1;
			this.currentIndex = this.currentIndex < 0 ? (this.musicLength-1) : this.currentIndex;
			this._setSrc(this.musicLibrary[this.currentIndex].src);
		},
		_nextSong : function(){
			this.currentIndex = this.currentIndex+1;
			this.currentIndex = this.currentIndex > this.musicLength-1 ? 0 : this.currentIndex;
			this._setSrc(this.musicLibrary[this.currentIndex].src);
		},
		_loop : function(){
			this.audioEl.attr('loop','true');
		},
		_circleLoop : function(){
			this.currentIndex = this.currentIndex>this.musicLength-1 ? 0 : this.currentIndex;
		},
		_queuePlay : function(){
			this.currentIndex > this.musicLength-1 ? this._stopPlay : '';//此处可能有问题
			this.currentIndex = 0; 
		},
		_reStart : function(){
			this.audioEl[0].load();
		}

	}

















	var player = new Music([
       {name:"岁月神偷",geshou:"不才",src:"不才 - 岁月神偷.mp3",duration:"04:12",photourl:"bucai.jpg"},
       {name:"合家欢乐",geshou:"凤凰传奇", src:"凤凰传奇 - 合家欢.mp3",duration:"02:39",photourl:"fenghuang.jpg"},
       {name:"Butter-Fly",geshou:"和田光司 ",src:"和田光司 - Butter-Fly.mp3",duration:"04:17",photourl:"shumabaobei.jpg"}, {name:"一次就好",geshou:"杨宗纬 ",src:"杨宗纬 - 一次就好.mp3",duration:"04:26",photourl:"yangzongwei.jpg"},{name:"向天再借五百年",geshou:"韩磊 ",src:"韩磊 - 向天再借五百年.mp3",duration:"03:11",photourl:"wubainian.jpg"}

       ]);