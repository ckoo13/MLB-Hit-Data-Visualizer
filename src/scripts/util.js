export const appear = (ele, time) => {
    ele.style.webkitAnimation = `appear ${time}s`
    ele.style.webkitAnimationTimingFunction = "ease-in"
  }
  
export const disappear = (ele, time) => {
    ele.style.webkitAnimation = `disappear ${time}s`
    ele.style.webkitAnimationTimingFunction = "ease-out"
}