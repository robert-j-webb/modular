"use strict";(()=>{var d=n=>{let t=e=>{if(e.nodeType===Node.TEXT_NODE){if(!e.parentNode.classList.contains("letter")){let i=e.textContent,o=document.createDocumentFragment();for(let a=0;a<i.length;a++){let l=document.createElement("span");l.className="letter",l.textContent=i[a],o.appendChild(l)}e.parentNode.replaceChild(o,e)}}else e.nodeType===Node.ELEMENT_NODE&&e.tagName!=="BR"&&Array.from(e.childNodes).forEach(t)};$(n).contents().each(function(){t(this)})},c=(n,t)=>{let e=gsap.timeline(),i=0;return $(n).each((o,a)=>{$(a).find(".letter").not(".line-numbers-row .code-letter").each((p,r)=>{e.fromTo(r,{visibility:"hidden"},{visibility:"initial"},i*t,"<"),i++})}),e},s=(n,t)=>{let e;return t==="label"?e=.03:t==="heading"?e=.01:typeof t=="number"?e=t:e=.01,d(n),c(n,e)};$(document).ready(function(){$("#hero").each(function(){let i=gsap.timeline({delay:.2}),o=$(this).find("h1"),a=$(this).find("p"),l=$(this).find(".button");i.to(o,{opacity:1}),i.add(s("h1"),"<"),i.to(a,{opacity:1,duration:.5},"<1"),i.to(l,{opacity:1,duration:.5},"<0.4")});let n,t=!1;function e(){let i=window.matchMedia("(min-width: 0px) and (max-width: 991px)");window.matchMedia("(min-width: 992px)").matches?t&&(n&&n.destroy(!0,!0),t=!1):i.matches&&(t||(t=!0,n=new Swiper(".steps_component .padding-small",{slidesPerView:1,spaceBetween:24,speed:250,observer:!0,pagination:{el:".swiper-navigation",type:"bullets",clickable:!0,bulletActiveClass:"w-active",bulletClass:"w-slider-dot"}})))}window.addEventListener("load",function(){e()}),window.addEventListener("resize",function(){e()})});})();
