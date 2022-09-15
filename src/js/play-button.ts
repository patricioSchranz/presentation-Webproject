const
    playButton = document.querySelector('.play-button') as HTMLElement,
    playWrapper = document.querySelector('.play-wrapper') as HTMLElement,
    appImages = document.querySelectorAll('.presentation_intro-image-figure img'),
    headingFirstPart = document.querySelector('.presentation_intro-heading_accompanying') as HTMLElement,
    headingSecondPart = document.querySelector('.presentation_intro-heading_main-title') as HTMLElement


playButton.onclick = (event)=>{
    /**
     * event target gibt das Element zurück auf welches geklickt wurde
     * und nicht unbedingt den Button =>
     * 
     * wird auf das image geklickt , ist das image das target Element
    */

    // console.log(event.target)

    playButton.classList.add('play-action')
    playWrapper.style.opacity = '0'

    setTimeout(()=>{
        playWrapper.style.display = 'none'
    }, 1000)

    // setTimeout(()=>{
    //     headingFirstPart.style.opacity = '1'
    // },500)

    // setTimeout(()=>{
    //     headingSecondPart.style.opacity = '1'
    // },800)

   
    // let i = 1700
    let i = 800

    appImages.forEach((img)=>{
        setTimeout(()=>{
            img.classList.add('img-display')
        }, i)

        i += 100
    })

    setTime()
}

const 
    hourDisplay = document.querySelector('.presentation_time span:nth-of-type(1)') as HTMLElement,
    minuteDisplay = document.querySelector('.presentation_time span:nth-of-type(2)') as HTMLElement,
    secondDisplay = document.querySelector('.presentation_time span:nth-of-type(3)') as HTMLElement

let 
    hour = 0,
    minute = 0,
    seconds: any = 0

const setTime = ()=>{
    setInterval(()=>{
        seconds ++

        if(seconds === 60){
            minute++
            seconds = 0
        }

        if (minute === 60){
            hour++
            minute = 0
        }

        const makeACoolerTimeFormat = (time: any)=>{
            return time.toString().padStart(2, '0')
        }

        hourDisplay.innerHTML = `${makeACoolerTimeFormat(hour)}`
        minuteDisplay.innerHTML = `${makeACoolerTimeFormat(minute)}`
        secondDisplay.innerHTML = `${seconds.toString().padStart(2, '0')}`
    }, 1000)
}