export const renderSlide = (options, slide, idx) => {
    
    const handleScrollOnto = (entries, observer) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                document.querySelector(`.slide-svg-${idx}`)
                    .classList.remove('hidden');
            }

            let currentSVG = d3.select(`.slide-svg-${idx}`)

            if (document.querySelector(`.slide-svg-${idx - 1}`)) {
                document.querySelector(`.slide-svg-${idx - 1}`)
                .classList.add("hidden");
              }
      
              if (document.querySelector(`.slide-svg-${idx + 1}`)) {
                document.querySelector(`.slide-svg-${idx + 1}`)
                .classList.add("hidden");
              }
        });
    };

    let observer = new IntersectionObserver(handleScrollOnto, options);
    observer.observe(slide);
}