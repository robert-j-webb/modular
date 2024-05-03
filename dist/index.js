"use strict";(()=>{var D=a=>{let n=i=>{if(i.nodeType===Node.TEXT_NODE){if(!i.parentNode.classList.contains("letter")){let d=i.textContent,h=document.createDocumentFragment();for(let s=0;s<d.length;s++){let m=document.createElement("span");m.className="letter",m.textContent=d[s],h.appendChild(m)}i.parentNode.replaceChild(h,i)}}else i.nodeType===Node.ELEMENT_NODE&&i.tagName!=="BR"&&Array.from(i.childNodes).forEach(n)};$(a).contents().each(function(){n(this)})},R=(a,n)=>{let i=gsap.timeline(),d=0;return $(a).each((h,s)=>{let m=$(s).find(".letter").not(".line-numbers-row .code-letter"),l=$(s).find(".word-highlight");if(m.each((x,f)=>{i.fromTo(f,{visibility:"hidden"},{visibility:"initial"},d*n,"<"),d++}),l.length){let x=l[0],f=window.getComputedStyle(x).getPropertyValue("background-color"),b=window.getComputedStyle(x).getPropertyValue("box-shadow"),u=(c,v)=>{let[N,L,S]=c.match(/\w\w/g).map(T=>parseInt(T,16));return`rgba(${N}, ${L}, ${S}, ${v})`},w=c=>{let v=c.replace(/^rgba?\(/,"").replace(/\)$/,"").split(",");return`rgba(${v[0]}, ${v[1]}, ${v[2]}, 0)`},k=c=>/^#(?:[0-9a-f]{3}){1,2}$/i.test(c),_=k(f)?u(f,0):w(f),E=b.replace(/rgba?\([^)]+\)/g,c=>k(c)?u(c,0):w(c));Array.from(l).forEach(c=>{c.style.backgroundColor=_,c.style.boxShadow=E}),i.to(l,{backgroundColor:f,boxShadow:b,duration:.35},"<")}}),i},P=(a,n)=>{let i;return n==="label"?i=.03:n==="heading"?i=.01:typeof n=="number"?i=n:i=.01,D(a),R(a,i)},q=a=>{let n=$(a).find("code"),i=n.find(".line-numbers-rows").eq(0).clone();return n.find(".line-numbers-rows").remove(),D(n),n.prepend(i),R(n,.01)},I=(a,n)=>{let i=gsap.timeline();return i.to(a,{text:{value:n,ease:"none",speed:1}},"<"),i};function F({tabs:a,cards:n,onCardLeave:i,onTabLeave:d,onCardShow:h,onTabShow:s}){if(a.length!==n.length)throw new Error(`Cards length: ${n.length} did not match tabs length: ${a.length}`);let m=!1,l=0;async function x(u){let w=u===0?n.length-1:u-1;await Promise.all([i(n.eq(w)),d(a.eq(w))]),await Promise.all([h(n.eq(u)),s(a.eq(u))])}async function f(){for(;!m;)await x(l),l+=1,l===n.length&&(l=0)}a.each((u,w)=>{w.onclick=()=>{i(n.eq(l)),d(a.eq(l)),h(n.eq(u)),s(a.eq(u)),m=!0,l=u}});let b=new IntersectionObserver(u=>{u[0].intersectionRatio<=0||(f(),b.unobserve(a[0]))},{threshold:1});b.observe(a[0])}function X({animateOnSlide:a,sliderSelector:n,onInit:i,duration:d}){function h({activeIndex:s,slides:m}){m.length!==0&&a($(m[s]))}new Swiper(n,{slidesPerView:1,spaceBetween:24,speed:250,autoplay:{delay:d},observer:!0,on:{init:s=>{i(),h(s)},transitionEnd:s=>{h(s)}},pagination:{el:".swiper-navigation",type:"bullets",clickable:!0,bulletActiveClass:"w-active",bulletClass:"w-slider-dot"}})}document.documentElement.classList.add("js-enabled");$(document).ready(function(){gsap.registerPlugin(ScrollTrigger);let a=$(".curl_copy"),n;if(a){let e=function(o){var t=document.createElement("textarea");t.value=o,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select();try{var g=document.execCommand("copy");clearTimeout(n),$("#copy-icon").hide(),$("#copy-success").show(),n=setTimeout(()=>{$("#copy-icon").show(),$("#copy-success").hide()},4e3)}catch{}document.body.removeChild(t)};var Z=e;a.on("click",function(o){o.preventDefault();let t=$(this).find("[data-copy]").text();console.log(t),e(t),amplitude.track("copyMojoDownload")})}window.location.pathname!=="/team"&&$("img").each(function(){$(this).removeAttr("loading"),ScrollTrigger.refresh()});function i(){let e=document.querySelectorAll("*");for(let o of e){if(o.tagName.toLowerCase()==="body"||o.tagName.toLowerCase()==="html")continue;let t=window.getComputedStyle(o);(t.overflow==="auto"||t.overflow==="scroll"||t.overflowX==="auto"||t.overflowX==="scroll"||t.overflowY==="auto"||t.overflowY==="scroll")&&(o.classList.add("no-scrollbar"),o.classList.add("swiper-no-swiping"))}}i();let d=[];function h(){d.forEach(e=>e.kill()),d=[],$(".line-mask").attr("style",""),$(".line-mask").each(function(){let o=window.getComputedStyle($(this)[0]).getPropertyValue("height");$(this).closest(".line-mask_wrap").hasClass("bottom")?gsap.set($(this),{height:"0%"}):gsap.set($(this),{height:"100%"});let t=ScrollTrigger.create({trigger:$(this).closest(".line-mask_wrap"),once:!0,start:"70% bottom",invalidateOnRefresh:!0,onEnter:()=>{gsap.to($(this),{height:o,duration:1.2})}});d.push(t)})}function s(e,o){let t;return function(){let g=this,r=arguments,p=function(){t=null,e.apply(g,r)};clearTimeout(t),t=setTimeout(p,o)}}let m=$(window).width();setTimeout(()=>{h()},500),$(window).on("resize",s(()=>{let e=$(window).width();e!==m&&(h(),m=e)},250)),$(".dashboard_inner[code-animation]").each(function(){let e=$(this).find(".dashboard_code-block");e.hide(),ScrollTrigger.create({trigger:$(this),once:!0,start:"50% bottom",invalidateOnRefresh:!0,toggleActions:"play null null null",onEnter:()=>{e.show(),q($(this))}})}),$("#ctaBox").each(function(){let e=$(this).find("#ctaLabel"),o=$(this).find("#ctaText"),t=$(this),g=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:t,start:"center bottom",onEnter:()=>{g.play()}}});g.add(P(e)).add(P(o))});var l=!1,x=!1;let f=".navbar_part.links",b=".navbar_link",u=".navbar_menu-btn",w="Close";function k(){return gsap.timeline({paused:!0,onComplete:()=>{E()}}).add(I(u+" div",()=>w)).fromTo(f,{display:"none"},{display:"flex"},"<").fromTo(f,{yPercent:-100},{yPercent:0},"<").fromTo(b,{y:"100%",opacity:0},{y:"0%",opacity:1,stagger:{each:.05}},"-=0.2").fromTo($(".navbar_buttons-respo .button"),{opacity:0},{opacity:1,stagger:.2}).fromTo(b,{pointerEvents:"none"},{pointerEvents:"auto"},"<")}let _,E=()=>{l?$("html, body").scrollTop(_).removeClass("overflow-hidden"):(_=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden")),l=!l},c;ScrollTrigger.matchMedia({"(max-width: 991px)":function(){c=k()}}),$(".navbar_menu-btn").on("click",v);function v(){c&&N()}function N(){L(),l?($(".navbar_menu-btn").removeClass("open"),c.timeScale(1.5).reverse(),E()):($(".navbar_menu-btn").addClass("open"),c.timeScale(1).play())}function L(){w=l?"Menu":"Close"}let S=$(".navbar_dropdown"),T=$(".navbar_dropdown-inner"),G=$(".navbar_dropdown-link-list"),y=$(".navbar_dropdown-bg"),O,A,j,M=.5,H=(e,o,t)=>{y.fadeIn(),A=!0,gsap.set(y,{top:`${o.top}px`,left:`${o.left}px`,width:`${o.width}px`,height:`${o.height}px`})},V=()=>{let e=gsap.timeline({defaults:{ease:Circ.easeOut}});return e.to(y,{duration:M,autoAlpha:0}),A=!1,e},z=(e,o,t,g)=>{let r=$(e).find(G),p=$(e).find(".navbar_dropdown-main");console.log(p);let C=gsap.timeline({defaults:{ease:"circ.out"}});return C.to(y,{top:`${o.top}px`,left:`${o.left}px`,width:`${o.width}px`,height:`${o.height}px`,autoAlpha:A?1:0,duration:t,delay:.2}),C.to($(e).find(T),{opacity:1,duration:.2},"<0.05"),C.add(Y(r.add(p),g),"<"),C},Y=(e,o,t)=>{let g=o==="left"?-5:5;return gsap.timeline({defaults:{ease:"circ.out"}}).fromTo(e,{xPercent:g},{xPercent:0,duration:.4})},W=e=>{gsap.killTweensOf(y);let t=$(e).find(T)[0].getBoundingClientRect(),r=e.getBoundingClientRect().width/2,p;A||H(e,t,r),O<$(e).index()?p="right":O>$(e).index()&&(p="left");let C=z(e,t,M,p);O=$(e).index()};var B;if(S.on("mouseenter",function(){$(window).width()>991&&(clearTimeout(B),W(this))}),S.on("mouseleave",function(){$(window).width()>991&&(gsap.killTweensOf(y),gsap.to($(this).find(T),{opacity:0}),B=setTimeout(function(){V()},50))}),$(".tabs.max-tab").length){let g=function(r){return new Promise(p=>{r.addClass("active"),p()})};var ee=g;let e="tab-active",o=".tabs_block-progress-line";F({tabs:$(".tabs.max-tab .tabs_block-link-menu .tabs_block-link"),cards:$(".tabs.max-tab .max-products .max-products_grid-cell"),onCardLeave:r=>{r.removeClass("active")},onTabLeave:r=>{r.removeClass(e),r.find(o).stop(),r.find(o).css("width","0")},onCardShow:g,onTabShow:r=>new Promise(p=>{r.addClass(e),r.find(o).animate({width:"100%"},4e3,p)})}),X({sliderSelector:".tabs_slider.max-tab",animateOnSlide(r){r.find(o).stop(!0,!0).css("width","0").animate({width:"100%"},4e3);let p=$(".tabs_slider.max-tab .max-products .max-products_grid-cell");p.removeClass("active"),p.eq(r.index()).addClass("active")},onInit(){},duration:4e3})}});})();
