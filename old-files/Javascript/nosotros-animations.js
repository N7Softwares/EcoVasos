let animationMove = document.querySelectorAll('.animateMove');
let nTeam = document.querySelectorAll('.nTeam');
let nMember = document.querySelectorAll('.nMember');

let animateImg = (entries, observer) =>{

    entries.forEach(entry => {
        if(entry.isIntersecting){

            entry.target.classList.remove('hiddenOpacity');

            setTimeout(() =>{
                entry.target.classList.remove('hiddenLeft');
                entry.target.classList.remove('hiddenRight');
                entry.target.classList.remove('hiddenBottom')
                entry.target.classList.remove('hiddenBottom2')
                entry.target.classList.remove('hiddenTop');
                entry.target.classList.remove('hiddenScaleGrow');
            },150);
        }
        
    });
}

const observer = new IntersectionObserver(animateImg, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
});


animationMove.forEach(e =>{
    observer.observe(e);
});



let animateImg2 = (entries, observer) =>{
    
    entries.forEach((entry,index) => {
        let delay = 4000; // Start with a 1-second delay
        setTimeout(()=>{
            if(entry.isIntersecting){
                console.log('hello')
            }
        }),delay;

            

            // let nMemebr = document.querySelectorAll('.nMember');
            //     nMemebr.forEach(e=>{
            //         setTimeout(() => {
                    
            //     }), delay;
            //     })

                delay += 1000; // Increase the delay by 1 second for each iteration
        
    });
 }

const observer2 = new IntersectionObserver(animateImg2, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
});




nMember.forEach((link, index) =>{
    observer2.observe(link);
})





// let textAnimation = document.querySelectorAll('.nosotros-banner2 span');




// textAnimation.forEach(e, index =>{
    
//     function test(e){
//         e.classList.remove('hiddenBottom');
//     }

//     setInterval(test,400)

// })