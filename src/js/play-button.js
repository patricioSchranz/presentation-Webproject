var playButton = document.querySelector('.play-button'), playWrapper = document.querySelector('.play-wrapper'), appImages = document.querySelectorAll('.presentation_intro-image-figure img'), headingFirstPart = document.querySelector('.presentation_intro-heading_accompanying'), headingSecondPart = document.querySelector('.presentation_intro-heading_main-title');
playButton.onclick = function (event) {
    /**
     * event target gibt das Element zurück auf welches geklickt wurde
     * und nicht unbedingt den Button =>
     *
     * wird auf das image geklickt , ist das image das target Element
    */
    // console.log(event.target)
    playButton.classList.add('play-action');
    playWrapper.style.opacity = '0';
    setTimeout(function () {
        playWrapper.style.display = 'none';
    }, 1000);
    // setTimeout(()=>{
    //     headingFirstPart.style.opacity = '1'
    // },500)
    // setTimeout(()=>{
    //     headingSecondPart.style.opacity = '1'
    // },800)
    // let i = 1700
    var i = 800;
    appImages.forEach(function (img) {
        setTimeout(function () {
            img.classList.add('img-display');
        }, i);
        i += 100;
    });
    setTime();
};
var hourDisplay = document.querySelector('.presentation_time span:nth-of-type(1)'), minuteDisplay = document.querySelector('.presentation_time span:nth-of-type(2)'), secondDisplay = document.querySelector('.presentation_time span:nth-of-type(3)');
var hour = 0, minute = 0, seconds = 0;
var setTime = function () {
    setInterval(function () {
        seconds++;
        if (seconds === 60) {
            minute++;
            seconds = 0;
        }
        if (minute === 60) {
            hour++;
            minute = 0;
        }
        var makeACoolerTimeFormat = function (time) {
            return time.toString().padStart(2, '0');
        };
        hourDisplay.innerHTML = "".concat(makeACoolerTimeFormat(hour));
        minuteDisplay.innerHTML = "".concat(makeACoolerTimeFormat(minute));
        secondDisplay.innerHTML = "".concat(seconds.toString().padStart(2, '0'));
    }, 1000);
};
