const wrapper=document.querySelector(".wrapper"),carousel=document.querySelector(".carousel"),firstCardWidth=carousel.querySelector(".card").offsetWidth,arrowBtns=document.querySelectorAll(".wrapper i"),carouselChildrens=[...carousel.children];let startX,startScrollLeft,timeoutId,isDragging=!1,isDragging2=isAutoPlay=!0,cardPerView=Math.round(carousel.offsetWidth/firstCardWidth);carouselChildrens.slice(-cardPerView).reverse().forEach((r=>{carousel.insertAdjacentHTML("afterbegin",r.outerHTML)})),carouselChildrens.slice(0,cardPerView).forEach((r=>{carousel.insertAdjacentHTML("beforeend",r.outerHTML)})),carousel.classList.add("no-transition"),carousel.classList.remove("no-transition"),arrowBtns.forEach((r=>{r.addEventListener("click",(()=>{carousel.scrollLeft+="left"==r.id?-firstCardWidth:firstCardWidth}))}));const dragStart=r=>{isDragging=!0,carousel.classList.add("dragging"),startX=r.pageX,startScrollLeft=carousel.scrollLeft},dragging=r=>{isDragging&&(carousel.scrollLeft=startScrollLeft-(r.pageX-startX))},dragStop=()=>{isDragging=!1,carousel.classList.remove("dragging")},infiniteScroll=()=>{0===carousel.scrollLeft?(carousel.classList.add("no-transition"),carousel.scrollLeft=carousel.scrollWidth-2*carousel.offsetWidth,carousel.classList.remove("no-transition")):Math.ceil(carousel.scrollLeft)===carousel.scrollWidth-carousel.offsetWidth&&(carousel.classList.add("no-transition"),carousel.classList.remove("no-transition"))};wrapper.addEventListener("mouseenter",(()=>clearTimeout(timeoutId)));