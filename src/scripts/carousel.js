window.addEventListener('DOMContentLoaded', (e) => {

    const track = document.querySelector(".carousel-track")
    const slides = Array.from(track.children)
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav')
    const dots = Array.from(dotsNav.children);
    
    const slideWidth = slides[0].getBoundingClientRect().width;

    //arrange the slides next to one another
        //What is happening to each element
            // slides[0].style.left = slideWidth * 0 + 'px';
            // slides[1].style.left = slideWidth * 1 + 'px';
            // slides[2].style.left = slideWidth * 2 + 'px';

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    }

    slides.forEach(setSlidePosition);


    const moveToSlide = (track, currentSlide, targetSlide) => {
        //move to the next slide
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    //updating dots
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    }

    //when I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const previousDot = currentDot.previousElementSibling;

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, previousDot);
        const prevIndex = slides.findIndex(slide => slide === prevSlide)

        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    })

    //when I click right, move to the right
    nextButton.addEventListener('click', e => {
        //grab the current slide
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide)
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    //when I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        //what indicator was clicked on
        const targetDot = e.target.closest('button');

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide') ;
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);

        updateDots(currentDot, targetDot);

        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });


})