"use strict";(()=>{var k=i=>{let e=t=>{if(t.nodeType===Node.TEXT_NODE){let n=t.textContent,s=document.createDocumentFragment();for(let o=0;o<n.length;o++){let l=document.createElement("span");l.className="letter",l.textContent=n[o],s.appendChild(l)}t.parentNode.replaceChild(s,t)}else t.nodeType===Node.ELEMENT_NODE&&t.tagName!=="BR"&&Array.from(t.childNodes).forEach(e)};$(i).contents().each(function(){e(this)})},_=(i,e)=>{let t=$(i).find(".letter").not(".line-numbers-row .code-letter"),n=gsap.timeline();return t.each((s,o)=>{let l=$(o).closest(".word-highlight");l.length?n.fromTo(o,{display:"none"},{display:"inline"},s*e,"<").to(l,{opacity:1,duration:.2},"<"):n.fromTo(o,{visibility:"hidden"},{visibility:"initial"},s*e,"<")}),n};var u=i=>{let e=$(i).find("code"),t=e.find(".line-numbers-rows").eq(0).clone();return e.find(".line-numbers-rows").remove(),k(e),e.prepend(t),_(e,.01)};var b="(min-width: 992px)",h=!1,a=$(".tabs_block-link-menu .tabs_block-link"),p=$(".tabs .cardb_visual .dashboard_code-block"),d="tab-active",r=$(".tabs_block-progress-line"),f=4e3,w=!0;function g(){if(!w)return;let i=a.filter("."+d);i.find(r).animate({width:"100%"},f,function(){x();let e=i.index(),t=e>=a.length-1?0:e+1;t===e&&(t=e>=a.length-2?0:e+2),a.eq(t).addClass(d),C(t),g()})}var x=()=>{a.removeClass(d),r.css("width","0"),p.hide()},v=()=>{w=!1,a.find(r).stop(!0,!0),x()},C=i=>{p.eq(i).show(),u(p.eq(i))},E=()=>{h=!0,a.eq(0).addClass(d),g(),a.on("click",function(){let i=$(this).index();v(),$(this).addClass(d),$(this).find(r).animate({width:"100%"},200),C(i)})};$(window).on("load resize",function(){if(window.matchMedia(b).matches){if(!h){let i=ScrollTrigger.create({trigger:".tabs",start:"top center",onEnter:()=>{E(),i.kill()}})}}else h&&(v(),h=!1)});var m,c=!1,y=$(".tabs_slider .cardb_visual .hero-dashboard_code-block");function T(){let i=window.matchMedia("(min-width: 0px) and (max-width: 991px)"),e=window.matchMedia(b);function t(n){let{activeIndex:s}=n;r.stop(!0,!0),r.css("width","0"),$(n.slides[s]).find(r).animate({width:"100%"},f);let o=n.slides[s].querySelector(".hero-dashboard_code-block");o&&($(o).show(),u(o))}e.matches?c&&(m.destroy(!0,!0),c=!1):i.matches&&(c||(c=!0,m=new Swiper(".tabs_slider",{slidesPerView:1,spaceBetween:24,speed:250,autoplay:{delay:f},observer:!0,on:{init:n=>{t(n)},slideChange:()=>{$(y).hide()},transitionEnd:n=>{t(n)}},pagination:{el:".swiper-navigation",type:"bullets",clickable:!0,bulletActiveClass:"w-active",bulletClass:"w-slider-dot"}})))}window.addEventListener("load",function(){T()});window.addEventListener("resize",function(){T()});})();