const
    slider = document.querySelector('.presentation_main') as HTMLElement,
    headingOne = document.querySelector('.presentation_h1') as HTMLElement,
    theSections = document.querySelectorAll('.presentation_section') as NodeListOf<HTMLElement>,
    theHeadingTwos = document.querySelectorAll('.presentation_heading-2') as NodeListOf<HTMLElement>,
    theHeadingThrees = document.querySelectorAll('.presentation_heading-3') as NodeListOf<HTMLElement>,
    theListItems = document.querySelectorAll('.presentation_key-points li') as NodeListOf<HTMLElement>,
    theSubSections = document.querySelectorAll('.presentation_sub-section') as NodeListOf<HTMLElement>,
    theSubSectionsControls = document.querySelectorAll('.presentation_sub-sec-control')as NodeListOf<HTMLElement>

let 
    wheelState = '',
    presentationState = 0
 
addEventListener('wheel', (event)=>{
    // console.log('event', event)
    // console.log('event target', event.target)
    // console.log('event deltaY', event.deltaY)

    let wheelNumber = event.deltaY

    wheelNumber > 0
    ? wheelState = 'down'
    : wheelState = 'up'

    // console.log('wheel state =>', wheelState)

    wheelState === 'down'
    ? presentationState++
    : presentationState--

    presentationState <=5 && (slider.style.left = `-${presentationState * 100}%`)
    presentationState >= 5 && (presentationState = 5)

    presentationState > 0
    ? headingOne.style.opacity = '1'
    : headingOne.style.opacity = '0'

    if(presentationState <= 0){
        slider.style.left = '0'
        presentationState = 0
    }

    theHeadingTwos.forEach(heading=> {
       heading.classList.remove('presentation_in-viewport')
    })

    theListItems.forEach(listItem =>{
        listItem.classList.remove('presentation_in-viewport')
    } )

    theHeadingThrees.forEach(heading => heading.classList.remove('presentation_in-viewport'))

    theSubSections.forEach(subSection =>{
        subSection.dataset.subSectionCount === '1'
        ?subSection.style.display = 'flex'
        :subSection.style.display = 'none'
    })

    theSubSectionsControls.forEach(subSecControl =>{
        subSecControl.dataset.subSectionCount === '1'
        ?subSecControl.style.backgroundColor = ' rgba(0, 0, 0, 0.2)'
        :subSecControl.style.backgroundColor = ' rgba(0, 0, 0, 0.1)'
    })

    // console.log(presentationState)
})


slider.addEventListener('transitionend', (event)=>{
    // console.log('transitioned event target', event.target)

    theSections.forEach(section =>{
        // console.log('the section id', section.dataset.sectionId)

        if(
            presentationState >0 && 
            section.dataset.sectionId === presentationState.toString()){
                // console.log('presentation state is bigger than zero =>', presentationState)
                // console.log('data id', section.dataset.sectionId)
                // console.log(theSections.length)

            //    for(const key in section){
            //     console.log(key)
            //    }
                const 
                    sectionHeadingTwo = section.querySelector('h2') as HTMLElement,
                    sectionHeadingsThree = section.querySelectorAll('h3')  as NodeListOf<HTMLElement>,
                    sectionListItems = section.querySelectorAll('.presentation_key-points li') as NodeListOf<HTMLElement>,
                    subSectionsOfThisSection = section.querySelectorAll('.presentation_sub-section') as NodeListOf<HTMLElement>,
                    subSecControlsOfThisSection = section.querySelectorAll('.presentation_sub-sec-control')  as NodeListOf<HTMLElement>,
                    subSectionLength = subSectionsOfThisSection.length
        
                let 
                    timeOutTime = 200,
                    subSectionClickCounter = 1

                sectionHeadingTwo && (sectionHeadingTwo.classList.add('presentation_in-viewport'))
                
                sectionListItems.forEach(listItem =>{
                    setTimeout(()=>{
                        listItem.classList.add('presentation_in-viewport')
                    }, timeOutTime)

                    timeOutTime += 100
                })
            
            //    console.log('the sub sections of this section', subSectionsOfThisSection)
            //    console.log('the sub section controls of this element', subSecControlsOfThisSection)
               
               subSectionsOfThisSection.forEach(subSection =>{
                    subSection.onclick = (event)=>{
                        if(subSectionClickCounter < subSectionLength){
                            subSection.style.display = 'none'
                        
                            console.log('the mouse button that made the click', event.button)
                            subSectionClickCounter++
    
                            subSectionsOfThisSection.forEach(suSec =>{
                                suSec.dataset.subSectionCount === subSectionClickCounter.toString()
                                ? suSec.style.display = 'flex'
                                : suSec.style.display = 'none'
                            })

                            subSecControlsOfThisSection.forEach(subSectionControl =>{
                                subSectionControl.dataset.subSectionCount === subSectionClickCounter.toString()
                                ? subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.2)'
                                : subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.1)'
                            })
                        }
                          
                    } 
               })

               sectionHeadingsThree.forEach((headingThree)=>{
                headingThree.classList.add('presentation_in-viewport')
               })

               subSecControlsOfThisSection.forEach(subSecControl =>{
                    subSecControl.onclick = ()=>{
                        if(subSecControl.dataset.subSectionCount){
                            subSectionClickCounter = parseInt(subSecControl.dataset.subSectionCount)

                            subSectionsOfThisSection.forEach(subSection =>{
                                subSection.dataset.subSectionCount === subSecControl.dataset.subSectionCount
                                ? subSection.style.display = 'flex'
                                : subSection.style.display = 'none'
                            })

                            subSecControlsOfThisSection.forEach(subSectionControl =>{
                                subSectionControl.dataset.subSectionCount === subSectionClickCounter.toString()
                                ? subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.2)'
                                : subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.1)'
                            })
                        }
                    }

                    subSecControl.onmouseover = ()=>{
                        let content = ''

                        subSectionsOfThisSection.forEach(section =>{
                            if(section.dataset.subSectionCount === subSecControl.dataset.subSectionCount){
                                const headingText = section.querySelector('h3') as HTMLElement

                                content = headingText.innerHTML
                            }
                            
                        })

                        subSecControl.setAttribute('data-content', content)
                    }
               })


            }

    })
})

