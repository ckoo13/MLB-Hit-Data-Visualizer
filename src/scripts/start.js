appear = (ele, time) => {
    ele.style.webkitAnimation = `appear ${time}s`
    ele.style.webkitAnimationTimingFunction = "ease-in"
  }
  
disappear = (ele, time) => {
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

    enter.onclick = function() {
        disappear(landingPage, 1);
        appear(page, 2);

        page.style.display = 'block'
        setTimeout(() => {
            landingPage.style.display = 'none'
        }, 1000);
    }
}