import { animate } from 'animejs';
let anim = animate({}, { duration: 10, onComplete: () => console.log('onComplete fired'), complete: () => console.log('complete fired') });
