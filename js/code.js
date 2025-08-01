// Script
(function()
{
    "use strict";
    // easy selector helper function 
    const select = (el, all = false)=>
    {
        el = el.trim()
        if(all)
        {
            return [...document.querySelectorAll(el)]
        }
        else
        {
            return document.querySelector(el)
        }
    }

    // Easy Event Listener Function 

    const on=(type, el, listener, all=false)=>
    {
        let selectEl = select(el, all)
        if(selectEl){
            if(all)
        {
            selectEl.forEach(e => e.addEventListener(type, listener))
        }
        else
        {
            selectEl.addEventListener(type, listener)
        }
      }
    }
    // Easy on Scroll Event Listener
    const onscroll=(el, listener)=>
    {
        el.addEventListener('scroll', listener)
    }
    // Navbar Link Active State on Scroll 

    let navbarlinks=select('#navbar .scrollto', true)
    const navbarlinksActive=()=>
    {
        let position=window.scrollY + 200
        navbarlinks.forEach(navbarlink =>
            {
                if(!navbarlink.hash) return
                let section=select(navbarlink.hash)
                if(!section) return
                if(position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight))
                {
                    navbarlink.classList.add('active')
                }
                else
                {
                    navbarlink.classList.remove('active')
                }
            })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    // Scroll to an Element With Header Offset 
    const scrollto=(el)=>
    {
        let elementPos=select(el).offsetTop
        window.scrollTo(
            {
                top:elementPos,
                behavior:'smooth'
            })
    }
    //Mobile Nav Toggle 

  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
    // Scroll with offset on links a class name scrollto
    on('click', '.scrollto', function(e)
    {
        if(select(this.hash))
        {
            e.preventDefault()
            let body=select('body')
            if(body.classList.contains('mobile-nav-active'))
            {
                body.classList.remove('mobile-nav-active')
                let navbarToggle=select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
           scrollto(this.hash)
        }
    },true)

    // Scroll with offset on page load with hash in URL 
    window.addEventListener('load',()=>
    {
        if(window.location.hash)
        {
            if(select(window.location.hash))
            {
                scrollto(window.location.hash)
            }
        }
    });
    
    // Intiating AOS 
    // AOS.init();

    // Skill Animation
    let skillsContent=select('.skill-content')
    if(skillsContent)
    {
        new Waypoint(
            {
                element:skillsContent,
                offset:'80%',
                handler:function(direction)
                {
                    let progress=select('.progress .progress-bar', true)
                    progress.forEach((el)=>
                    {
                        el.style.width=el.getAttribute('aria-valuenow') + '%'
                    });
                }
            }
        )
    };
    //Portfolio Isotops and Filter
    window.addEventListener('load',()=>
    {
        let portfolioContainer=select('.portfolio-container');
        if(portfolioContainer)
        {
            let portfolioIsotop=new Isotope(portfolioContainer,{
                itemSelector:'.portfolio-item'
            });
            let portfolioFilter=select('#portfolio-filter li', true);
            on('click','#portfolio-filter li', function(e)
            {
                e.preventDefault();
                portfolioFilters.forEach(function(el)
                {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');
                portfolioIsotope.arrange({
                    filter:this.getAttribute('data-filter')
                });
            }, true);
        }
    });
    //Initalizing GlightBox
    const portfolioLightbox=GLightbox(
        {
            selector:'.portfolio-lightbox'
        }
    )
    //Intallizing Slider
    new Swiper('.testimonial-slider',{
        speed:600,
        loop: true,
        autoplay:{
            delay:5000,
            disableOnInteraction:false
        },
        slidePerView:'auto',
        pagination:{
            el:'.swiper-pagination',
            type:'bullets',
            clickable:true
        },
        breakpoints:{
            320:{
                slidesPerView: 1,
                spaceBetween: 20
            },
            640:{
                slidesPerView: 3,
                spaceBetween:40
            }
        }
    })
    //Intializing Back To Top
    let backtotop=select('.back-to-top')
    if(backtotop)
    {
        const toggleBacktotop=()=>
        {
            if(window.scrollY > 100)
            {
                backtotop.classList.add('active')
            }
            else
            {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }
    // Intializing Pure Counter
    new PureCounter();
})()