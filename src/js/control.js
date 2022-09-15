var slider = document.querySelector('.presentation_main'), headingOne = document.querySelector('.presentation_h1'), theSections = document.querySelectorAll('.presentation_section'), theHeadingTwos = document.querySelectorAll('.presentation_heading-2'), theHeadingThrees = document.querySelectorAll('.presentation_heading-3'), theListItems = document.querySelectorAll('.presentation_key-points li'), theSubSections = document.querySelectorAll('.presentation_sub-section'), theSubSectionsControls = document.querySelectorAll('.presentation_sub-sec-control');
var wheelState = '', presentationState = 0;
addEventListener('wheel', function (event) {
    // console.log('event', event)
    // console.log('event target', event.target)
    // console.log('event deltaY', event.deltaY)
    var wheelNumber = event.deltaY;
    wheelNumber > 0
        ? wheelState = 'down'
        : wheelState = 'up';
    // console.log('wheel state =>', wheelState)
    wheelState === 'down'
        ? presentationState++
        : presentationState--;
    presentationState <= 5 && (slider.style.left = "-".concat(presentationState * 100, "%"));
    presentationState >= 5 && (presentationState = 5);
    presentationState > 0
        ? headingOne.style.opacity = '1'
        : headingOne.style.opacity = '0';
    if (presentationState <= 0) {
        slider.style.left = '0';
        presentationState = 0;
    }
    theHeadingTwos.forEach(function (heading) {
        heading.classList.remove('presentation_in-viewport');
    });
    theListItems.forEach(function (listItem) {
        listItem.classList.remove('presentation_in-viewport');
    });
    theHeadingThrees.forEach(function (heading) { return heading.classList.remove('presentation_in-viewport'); });
    theSubSections.forEach(function (subSection) {
        subSection.dataset.subSectionCount === '1'
            ? subSection.style.display = 'flex'
            : subSection.style.display = 'none';
    });
    theSubSectionsControls.forEach(function (subSecControl) {
        subSecControl.dataset.subSectionCount === '1'
            ? subSecControl.style.backgroundColor = ' rgba(0, 0, 0, 0.2)'
            : subSecControl.style.backgroundColor = ' rgba(0, 0, 0, 0.1)';
    });
    // console.log(presentationState)
});
slider.addEventListener('transitionend', function (event) {
    // console.log('transitioned event target', event.target)
    theSections.forEach(function (section) {
        // console.log('the section id', section.dataset.sectionId)
        if (presentationState > 0 &&
            section.dataset.sectionId === presentationState.toString()) {
            // console.log('presentation state is bigger than zero =>', presentationState)
            // console.log('data id', section.dataset.sectionId)
            // console.log(theSections.length)
            //    for(const key in section){
            //     console.log(key)
            //    }
            var sectionHeadingTwo = section.querySelector('h2'), sectionHeadingsThree = section.querySelectorAll('h3'), sectionListItems = section.querySelectorAll('.presentation_key-points li'), subSectionsOfThisSection_1 = section.querySelectorAll('.presentation_sub-section'), subSecControlsOfThisSection_1 = section.querySelectorAll('.presentation_sub-sec-control'), subSectionLength_1 = subSectionsOfThisSection_1.length;
            var timeOutTime_1 = 200, subSectionClickCounter_1 = 1;
            sectionHeadingTwo && (sectionHeadingTwo.classList.add('presentation_in-viewport'));
            sectionListItems.forEach(function (listItem) {
                setTimeout(function () {
                    listItem.classList.add('presentation_in-viewport');
                }, timeOutTime_1);
                timeOutTime_1 += 100;
            });
            //    console.log('the sub sections of this section', subSectionsOfThisSection)
            //    console.log('the sub section controls of this element', subSecControlsOfThisSection)
            subSectionsOfThisSection_1.forEach(function (subSection) {
                subSection.onclick = function (event) {
                    if (subSectionClickCounter_1 < subSectionLength_1) {
                        subSection.style.display = 'none';
                        console.log('the mouse button that made the click', event.button);
                        subSectionClickCounter_1++;
                        subSectionsOfThisSection_1.forEach(function (suSec) {
                            suSec.dataset.subSectionCount === subSectionClickCounter_1.toString()
                                ? suSec.style.display = 'flex'
                                : suSec.style.display = 'none';
                        });
                        subSecControlsOfThisSection_1.forEach(function (subSectionControl) {
                            subSectionControl.dataset.subSectionCount === subSectionClickCounter_1.toString()
                                ? subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.2)'
                                : subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.1)';
                        });
                    }
                };
            });
            sectionHeadingsThree.forEach(function (headingThree) {
                headingThree.classList.add('presentation_in-viewport');
            });
            subSecControlsOfThisSection_1.forEach(function (subSecControl) {
                subSecControl.onclick = function () {
                    if (subSecControl.dataset.subSectionCount) {
                        subSectionClickCounter_1 = parseInt(subSecControl.dataset.subSectionCount);
                        subSectionsOfThisSection_1.forEach(function (subSection) {
                            subSection.dataset.subSectionCount === subSecControl.dataset.subSectionCount
                                ? subSection.style.display = 'flex'
                                : subSection.style.display = 'none';
                        });
                        subSecControlsOfThisSection_1.forEach(function (subSectionControl) {
                            subSectionControl.dataset.subSectionCount === subSectionClickCounter_1.toString()
                                ? subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.2)'
                                : subSectionControl.style.backgroundColor = ' rgba(0, 0, 0, 0.1)';
                        });
                    }
                };
                subSecControl.onmouseover = function () {
                    var content = '';
                    subSectionsOfThisSection_1.forEach(function (section) {
                        if (section.dataset.subSectionCount === subSecControl.dataset.subSectionCount) {
                            var headingText = section.querySelector('h3');
                            content = headingText.innerHTML;
                        }
                    });
                    subSecControl.setAttribute('data-content', content);
                };
            });
        }
    });
});
