"use strict";(()=>{var i=new Swiper(".about-team_slider",{slidesPerView:"auto",spaceBetween:20,navigation:{nextEl:".swiper-arrow.next",prevEl:".swiper-arrow.prev"}}),a=new Swiper(".about-team_modal-slider .max-width-full",{slidesPerView:1,mousewheel:{enabled:!0,forceToAxis:!0,thresholdDelta:25},freeMode:!1,shortSwipes:!1,breakpoints:{0:{direction:"horizontal",spaceBetween:8},992:{direction:"vertical",spaceBetween:20}}});$(".about-team_card").on("click",function(){t($(this).closest(".w-dyn-item").index())});$('[data-modal="hide"]').on("click",o);function t(e){a.slideTo(e),$(".about-team_modal").fadeIn()}function o(){$(".about-team_modal").fadeOut()}})();