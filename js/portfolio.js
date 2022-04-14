const $blocks = document.querySelectorAll('.unit_content'),
$close = document.querySelectorAll('.close'),
$pf = document.querySelector('.pf')


function preventScroll(e){
    e.preventDefault();
    e.stopPropagation();
}

function disable(element){
    document.querySelector('.blur').addEventListener('wheel', preventScroll);
    document.querySelector('body').addEventListener('wheel', preventScroll);
    element.addEventListener('wheel', preventScroll);
}
  
function enable(element){
    document.querySelector('.blur').removeEventListener('wheel', preventScroll);
    document.querySelector('body').removeEventListener('wheel', preventScroll);
    element.removeEventListener('wheel', preventScroll);
}


function animation( tl, container, info, button, side, head){
    
    tl.to(container, { width: '31.25rem', top: head, left: side, ease: 'elastic.out(1, 0.5)'})
    .to(button, { scale: 1, ease: 'power4.out' })
    .to(info, { top: '50%', display: 'block', opacity: 1}, "-=1.5")

    console.log(1)
}



$pf.addEventListener('click', function(){
    const modal = document.querySelector('.modal_pf');
    const close_button = modal.querySelector('.close');
    disable(modal)

    console.log(close_button)

    modal.classList.add('visible')
    close_button.classList.add('grow')
    document.querySelector('.blur').classList.add('appear')


    close_button.addEventListener('click', function(){
        enable(modal)
        modal.classList.remove('visible')
        document.querySelector('.blur').classList.remove('appear')
    })

})


$blocks.forEach( block =>{

    block.addEventListener('click', function (e) {

            if ( !(this.parentElement.classList.contains('pop')) ) {
                let tl = gsap.timeline({defaults: {duration: 1}})
                disable(this)

                this.parentElement.classList.add('pop')
                this.classList.remove('scaler')
                const $info = this.querySelector('.info');
                const $close = this.querySelector('.close');

                let result1 = (window.innerWidth/2 - this.getBoundingClientRect().left) - 1120/2 + 'px';
                let result2 = (window.innerHeight/2 - this.getBoundingClientRect().top) - 344.36/2 + 'px';

                animation( tl ,this, $info, $close, result1, result2)
            
                document.querySelector('.blur').classList.add('appear')
                

                $close.addEventListener('click', async function(){

                    await tl.reverse(!tl.reverse())

                    document.querySelector('.blur').classList.remove('appear')
                    this.parentElement.classList.add('scaler')
                    this.parentElement.parentElement.classList.remove('pop')
                    enable(this.parentElement)

                })


            }
    })
})

