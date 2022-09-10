import Modal from "./modal"

const appear = (ele, time) => {
    ele.style.webkitAnimation = `appear ${time}s`
    ele.style.webkitAnimationTimingFunction = "ease-in"
  }
  
const disappear = (ele, time) => {
    ele.style.webkitAnimation = `disappear ${time}s`
    ele.style.webkitAnimationTimingFunction = "ease-out"
}

export const startDemo = () => {
    //need the start button for event listener
    let enter = document.getElementById('start');
    //need the landing-page to disappear
    let landingPage = document.getElementById('landing-page');
    //need the rest of the page to appear
    let page = document.getElementById('page-content');

    let stickyButton = document.getElementById('sticky-info-button');

    let modalRoot = document.getElementById('modal-entry');

    const modal = new Modal();

    enter.onclick = function() {
        disappear(landingPage, 1);
        appear(page, 2);
        appear(stickyButton, 2);

        page.style.display = 'block'

        setTimeout(() => {
            landingPage.style.display = 'none'
            modalRoot.appendChild(modal.displayModal());
        }, 1000);
    }
}