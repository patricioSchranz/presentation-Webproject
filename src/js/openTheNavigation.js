const 
    theTimeDisplay = document.querySelector('.presentation_time'),
    theNavigation = document.querySelector('.presentation_nav')

let 
    theNavigationState = 'off'



//--- open the navigation ---

const openTheNavigation = (element, color)=>{
    // console.log('the parameters of the onclick dom event handler \n',element, color)

    theNavigationState === 'off'
    ? theNavigationState = 'on'
    : theNavigationState = 'off'

    if(theNavigationState === 'on'){
        setTimeout(()=>{
            element.style.top = 'calc(50vh - 2.2rem)'
            element.style.left = '5rem'
            element.style.transform = 'rotate(-5deg)'

            theTimeDisplay.style.display = 'block'

            setTimeout(()=>{
                theTimeDisplay.style.opacity = '1'
            }, 500)
            
        }, 50)
        

        theNavigation.style.top = '0'
    }
    else{
        fadeTheNaviOut(element)
    }
}



//--- common functions ---

const fadeTheNaviOut = (element)=>{
    element.style.top = '0'
    element.style.left = '0'
    element.style.transform = 'none'

    theNavigation.style.top = '-100vh'
    theTimeDisplay.style.opacity = '0'
    theTimeDisplay.style.display = 'none'
}



//--- handle the links in the navigation ---

const
    theChapterLinks = document.querySelectorAll('.chapter-span'),
    theSubChapterLinks = document.querySelectorAll('.presentation_nav-list.sub-chapter li')
    //headingOne => comes from control.ts
    //slider => comes from control.ts
    //presentationState => comes from control.ts
    //theSections => comes from control.ts
    //theSubSection => comes from control.ts
    //theSubSectionsControls => comes from control.ts

// console.log('the chapter links', theChapterLinks)
// console.log('the subchapter links', theSubChapterLinks)

theChapterLinks.forEach(chapterLink =>{
    chapterLink.addEventListener('click', ()=>{
        const 
            theParentElement = chapterLink.parentElement,
            theChapterNumber = theParentElement.dataset.chapter

        // console.log('the parent element of this link', theParentElement)
        // console.log('the chapter number', theChapterNumber)

        theNavigationState === 'off'
        ? theNavigationState = 'on'
        : theNavigationState = 'off'

        fadeTheNaviOut(headingOne)

        presentationState = parseInt(theChapterNumber)
        slider.style.left = `-${theChapterNumber}00%`
    })
})

theSubChapterLinks.forEach(subChapter => {

    // console.log('sub chapter', subChapter.dataset)

    subChapter.addEventListener('click', ()=>{
        const
            theParentOfTheSubChapter = subChapter.parentElement,
            theChapterNumberOfTheParentElement = theParentOfTheSubChapter.dataset.chapter,
            theSubChapterNumber = parseInt(subChapter.dataset.subChapter)

        // console.log('the sub chapter parent element', theParentOfTheSubChapter)
        // console.log('the sub chapter number before theSections.forEach \n', theSubChapterNumber)

        theNavigationState === 'off'
        ? theNavigationState = 'on'
        : theNavigationState = 'off'

        fadeTheNaviOut(headingOne)

        presentationState = parseInt(theChapterNumberOfTheParentElement)
        slider.style.left = `-${theChapterNumberOfTheParentElement}00%`

        theSections.forEach(section =>{ 
           if(section.dataset.sectionId === theChapterNumberOfTheParentElement){
            // console.log(section.dataset.sectionId)
            // console.log(section)

            const thisSubSection = document.querySelector(`[data-section-id='${section.dataset.sectionId}'] .presentation_sub-section:nth-of-type(${theSubChapterNumber})`)

            // console.log('this sub section',thisSubSection)
            // console.log('the sub chapter number', theSubChapterNumber)

            theSubSections.forEach(section =>{
                // console.log('the sub section', section)
                section.style.display = 'none'
            })

            thisSubSection.style.display = 'flex'
           }

           theSubSectionsControls.forEach(subSectionControl =>{
            subSectionControl.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'

            // console.log('sub section control count', subSectionControl.dataset.subSectionCount)
            // console.log('the sub chapter number', theSubChapterNumber)

            if(parseInt(subSectionControl.dataset.subSectionCount) === theSubChapterNumber){
                console.log('sub section control count', subSectionControl.dataset.subSectionCount)
                subSectionControl.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
            }

           })

        })
    })
})

