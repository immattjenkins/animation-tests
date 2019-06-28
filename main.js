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
    const animate = [...document.querySelectorAll('.animate')];
    animate.forEach((el) => {
        const idx = [...el.parentNode.children].findIndex(i => i === el);
        const tween = tweens[idx]
        const h1 = h1s[idx];
        const viewportOffset = el.getBoundingClientRect();

        // here's a fun diagram of this...

        // thinking we do something where animation should take 2 of the height to complete

        
        /* this is just one section
                ----------------
                |               | -
                |               |  | this would be what's above the viewport
                |               | -
                |===============| -
                |               |  | 
                |               |  | this is what's visible inside of the viewport
                |               |  |
                |===============| -
                |               | -
                |               |  |
                |               |  | this is what's left of element to show
                |               |  |
                |               | -
                ----------------
        */

        const offset = -200;
        const ht = viewportOffset.height / 2;
        const offsetTop = viewportOffset.top + ht + offset;

        const progress = offsetTop / ht;
        const viewportSize = window.innerHeight;
        const amountSeen = viewportOffset.top < 0 ? viewportOffset.top : 0;
        const amountVisible = (viewportOffset.top * -1) 
        const animationArea = viewportOffset.height / 2;
        const roundProgress = progress / 100 * 100;

        tween.progress(roundProgress);
        // const progress = 

    })
};

window.requestAnimationFrame(animationCallback);
