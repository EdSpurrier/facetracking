
const Animations = {
    fade: ({
        state,
        elements, 
        callBack,
        duration = 1,
        delay = 0,
        easing = 'easeInOutSine',
        update = () => {},
        begin = () => {},
        complete = () => {},
    }) => {

        if (state) {
            elements.forEach(element => {
                if(element.classList?.contains('hidden')) {
                    element.classList.remove('hidden');
                    anime.set(elements, {
                        opacity: 0
                    });
                };
            });
        }
        

        const onComplete = () => {
            if(!state) {
                elements.forEach(element => {
                    element.classList.add('hidden');
                });
            };
            callBack();
        }

        var animation = anime.timeline({
            targets: elements,
            delay: delay * 1000,
            duration: duration * 1000,
            easing: easing,
            update: function(anim) {
                /* system.log('animating : '+(anim.progress.toFixed(2))+'%'); */
                update(anim);
            },
            begin: function(anim) {
                system.log('animation > began : ' + anim.began)
                begin(anim);
            },
            complete: function(anim) {
                system.log('animation > completed : ' + anim.completed);
                complete(anim);
            }
        }).add({
            opacity: state?1:0,
        });

        animation.finished.then(onComplete);
    },


    
}
