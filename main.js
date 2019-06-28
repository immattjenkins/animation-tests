const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 1]
}

let prevScrollPosition = 0;
let scrollPosition = 0;
let direction = 0;
const h1s = [...document.querySelectorAll('h1')];
const tweens = h1s.map(el => TweenLite.to(el, 2, { paused: true, opacity: 1, top: 0}))

const observer = new IntersectionObserver((entries, observer) => {
 entries.forEach(e => {
     if(e.intersectionRatio > 0) {
        e.target.classList.add('animate');
     } else if(e.intersectionRatio === 0) {
         e.target.classList.remove('animate');
     }
 })
}, options);

[...document.querySelectorAll('section')].forEach(el => observer.observe(el))



window.addEventListener('scroll', e => {
    prevScrollPosition = scrollPosition;
    scrollPosition = window.pageYOffset;
    if(scrollPosition - prevScrollPosition >= 0) {
        direction = 1;
    } else {
        direction = -1;
    }
    // console.log(prevScrollPosition, scrollPosition);
    window.requestAnimationFrame(animationCallback);
})

const animationCallback = () => {
    console.log("animation callback start");
    const animate = [...document.querySelectorAll('.animate')];
    animate.forEach((el) => {
        const idx = [...el.parentNode.children].findIndex(i => i === el);
        const tween = tweens[idx]
        const h1 = h1s[idx];
        const viewportOffset = el.getBoundingClientRect();
        const h1BoundingRect = h1.getBoundingClientRect();
        
        // console.log( el.id, direction > 0 ? 'DOWN' : 'UP', scrollPosition, viewportOffset.height, viewportOffset.top);
        // console.log( elBoundingRect.height, elBoundingRect.top)
        // console.log(scrollPosition / window.outerHeight )
        const progress = (viewportOffset.height - viewportOffset.top) / viewportOffset.height;
        console.log(el.id, progress, viewportOffset.height, viewportOffset.top, (viewportOffset.height - viewportOffset.top) )


        tween.progress(progress * 100 / 100);
        // const progress = 

    })
};

window.requestAnimationFrame(animationCallback);
