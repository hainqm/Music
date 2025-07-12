var playlist = [
    {
        song: 'Em cưới rồi à',
        singer: 'Thanh Hưng',
        src: './audio/em-cuoi-roi-a.mp3',
        image: './image/hon-le-cua-em.jpg'
    },
    {
        song: 'Ai chung tình được mãi',
        singer: 'Đinh Tùng Huy',
        src: './audio/ai-chung-tinh-duoc-mai.mp3',
        image: './image/ai-chung-tinh-duoc-mai.jpg'
    },
    {
        song: 'Cẩm tú cầu',
        singer: 'RayO, Huỳnh Văn',
        src: './audio/cam-tu-cau.mp3',
        image: './image/cam-tu-cau.jpg'
    },
    {
        song: 'Bông hoa đẹp nhất',
        singer: 'Quân A.P',
        src: './audio/bong-hoa-dep-nhat.mp3',
        image: './image/bong-hoa-dep-nhat.jpg'
    }
]
console.log(playlist);

var count = 0; // biến đếm chuyển bài hát
var song = document.querySelector('.song');
var singer = document.querySelector('.singer');
var image = document.querySelector('.image');




var progressBar = document.querySelector('.progress-bar');
var progress = progressBar.querySelector('.progress');
var progressSpan = progress.querySelector('span')

//Thời gian bắt đầu và kết thúc của lời nhạc
var startTextTime, endTextTime;

// xuống dòng
var br = document.createElement('br');

//lấy chiều dài của progress
var handleProgressWidth = function(value){
    progress.style.width = `${value}%`;
}
var isDown = false;
var offsetX, value;
var progressBarWidth = progressBar.clientWidth;//Tính chiều dài progressBar


//Xử lý audio phát nhạc
var audio = document.querySelector('.audio');
var time = document.querySelectorAll('.time');
var test = document.querySelector('.test');
// console.log(audio);

//khai báo 1 biến để lấy thời gian chạy chữ
var updateTextTime;


//nút điều khiển
var controls = document.querySelector('.controls');
var btnControl = controls.querySelector('.play');

var btnPlay = '<i class="fa-solid fa-play"></i>';
var btnPause = '<i class="fa-solid fa-pause"></i>';


// 1 câu
var sentences = lyric[0].data.sentences; ;
// console.log(sentences[0]);


//back
var btnBack = controls.querySelector('.back');
var btnForward = controls.querySelector('.forward');
btnBack.addEventListener('click', function(){
    console.log(count);
    
    if(count < 0){
        count = playlist.length - 1; // nếu đếm nhỏ hơn 0 thì quay về bài cuối
    }
    // console.log(playlist[count]);
    singer.innerText =' - '+ playlist[count].singer;
    song.innerText =  playlist[count].song ;
    audio.src = playlist[count].src;
    image.src = playlist[count].image;
    // console.log(playlist[count].singer);
    sentences = lyric[count].data.sentences;


    count--;
    
})



//forward
btnForward.addEventListener('click', function(){
    console.log(count);
    
    if(count >= playlist.length){
        count = 0;
         // nếu đếm lớn hơn số bài thì quay về bài đầu
    }

    // console.log(playlist[count]);
    song.innerText = playlist[count].song;
    singer.innerText =' - '+ playlist[count].singer;
    audio.src = playlist[count].src;
    image.src = playlist[count].image;
    // console.log(lyric[count].data.sentences);
    sentences = lyric[count].data.sentences;
    
    
    count++;
})

// lyric
var showLyric = document.querySelector('.showLyric');

// console.log(lyric);







progressBar.addEventListener('mousedown', function(e){
    isDown = true
    offsetX = e.offsetX;
    // console.log(offsetX);
    value = ( offsetX * 100 ) / progressBarWidth;
    handleProgressWidth(value);
    // console.log(value);

    audio.currentTime = (value * audio.duration) / 100 ;
})

//chống nội bọt 
progressSpan.addEventListener('mousedown', function(e){
    e.stopPropagation();
    
})

// chống giật giật
progressSpan.addEventListener('mousemove', function(e){
    e.stopPropagation();
    
})




document.addEventListener('mousemove', function(e){
    if (isDown) {
        var progressBarLeft = progressBar.getBoundingClientRect().left;// Khoảng cách từ mép trái trình duyệt đến phần tử
        var cursorX = e.clientX - progressBarLeft; // vị trí con trỏ trong progressBar
        if (cursorX < 0) cursorX = 0;
        if (cursorX > progressBarWidth) cursorX = progressBarWidth;

        value = (cursorX * 100) / progressBarWidth;
        handleProgressWidth(value);
        

        // console.log(`value: ${value}%`);
        audio.currentTime = (value * audio.duration) / 100 ;

    }
});

document.addEventListener('mouseup',function(e){
    isDown = false;
   
})





//Tính độ dài nhạc
var getTime = function(seconds){
    var minute = Math.floor(seconds / 60);
    var second = Math.floor(seconds - (minute * 60));

    return( minute < 10 ?`0${minute}`:`${minute}`) + ':' + (second < 10 ?`0${second}`:`${second}`);
   
   
    
}


//lắng nghe sự kiện load nhạc
audio.addEventListener('loadeddata', function(){
    time[1].innerText = getTime(audio.duration);
    
    // console.log(audio.paused);
    
    
})

btnControl.addEventListener('click', function(){
    
    if(audio.paused ){
        btnControl.innerHTML = btnPause;
        audio.play();
        // console.log(audio.paused);
        
    }else{
        btnControl.innerHTML = btnPlay;
        audio.pause();
        // console.log(audio.paused);
        
    }

   
    
})

var textColor = document.createElement('span');
//cập nhật thời gian chạy
audio.addEventListener('timeupdate', function(){
    time[0].innerText = getTime(audio.currentTime);//
    //Lấy ra tỉ lệ % dựa vào currentTime và duration
    var value = (audio.currentTime * 100) / audio.duration;
    // console.log(value);
    handleProgressWidth(value);
    
    updateSentenceTime = Math.floor(audio.currentTime * 1000);
    var showSentence = sentenceTime(updateSentenceTime);
    
    
    
    if(showSentence){
        const appearSentence = showSentence.words.map(function(value){
            return value.data}).join(" ");
        return showLyric.innerText ='♪ ' + appearSentence;
        
    }else{
        return showLyric.innerText = '***';
    }
    
})


// function textTime(updateTextTime){
//     for(var k = 0; k < sentences.length; k++){
//         for( var j = 0; j < sentences[k].words.length; j++){
            
//             startTextTime = sentences[k].words[j].startTime;
//             endTextTime = sentences[k].words[j].endTime;
//             if(startTextTime <= updateTextTime && updateTextTime < endTextTime){
//                 return sentences[k].words[j].data ;
                
//             }
//         }

        
//     }
// }

function sentenceTime(updateSentenceTime){
    for(var i = 0; i < sentences.length; i++){
        startSentenceTime = sentences[i].words[0].startTime;
        endSentenceTime = sentences[i].words[sentences[i].words.length - 1].endTime;
        if(startSentenceTime <= updateSentenceTime && updateSentenceTime < endSentenceTime){
            return sentences[i] ;
            
        }
    }
}













