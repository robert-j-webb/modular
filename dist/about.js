"use strict";(()=>{var i=new Swiper(".about-team_slider",{slidesPerView:"auto",spaceBetween:20,navigation:{nextEl:".swiper-arrow.next",prevEl:".swiper-arrow.prev"}}),a=new Swiper(".about-team_modal-slider .max-width-full",{slidesPerView:1,noSwiping:!1,navigation:{prevEl:".about-team-modal-arrow.prev",nextEl:".about-team-modal-arrow.next"},breakpoints:{0:{direction:"horizontal",spaceBetween:8,autoHeight:!0},992:{direction:"vertical",spaceBetween:20,autoHeight:!1}}});$(".about-team_card").on("click",function(){e($(this).closest(".w-dyn-item").index())});$(".blog-detail_hero-list-item").not("[fs-cmsstatic-element]").on("click",function(){e($(this).closest(".w-dyn-item").index())});$('[data-modal="hide"]').on("click",o);function e(t){a.slideTo(t),$(".about-team_modal").fadeIn(),$("html, body").addClass("overflow-hidden")}function o(){$(".about-team_modal").fadeOut(),$("html, body").removeClass("overflow-hidden")}})();
