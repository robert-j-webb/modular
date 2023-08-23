"use strict";(()=>{var A=o=>{let t=e=>{if(e.nodeType===Node.TEXT_NODE){if(!e.parentNode.classList.contains("letter")){let i=e.textContent,a=document.createDocumentFragment();for(let l=0;l<i.length;l++){let s=document.createElement("span");s.className="letter",s.textContent=i[l],a.appendChild(s)}e.parentNode.replaceChild(a,e)}}else e.nodeType===Node.ELEMENT_NODE&&e.tagName!=="BR"&&Array.from(e.childNodes).forEach(t)};$(o).contents().each(function(){t(this)})},D=(o,t)=>{let e=gsap.timeline(),i=0;return $(o).each((a,l)=>{let s=$(l).find(".letter").not(".line-numbers-row .code-letter"),r=$(l).find(".word-highlight");if(s.each((n,d)=>{e.fromTo(d,{visibility:"hidden"},{visibility:"initial"},i*t,"<"),i++}),r.length){let n=r[0],d=window.getComputedStyle(n).getPropertyValue("background-color"),p=window.getComputedStyle(n).getPropertyValue("box-shadow"),h=(c,u)=>{let[T,_,E]=c.match(/\w\w/g).map(C=>parseInt(C,16));return`rgba(${T}, ${_}, ${E}, ${u})`},g=c=>{let u=c.replace(/^rgba?\(/,"").replace(/\)$/,"").split(",");return`rgba(${u[0]}, ${u[1]}, ${u[2]}, 0)`},y=c=>/^#(?:[0-9a-f]{3}){1,2}$/i.test(c),w=y(d)?h(d,0):g(d),v=p.replace(/rgba?\([^)]+\)/g,c=>y(c)?h(c,0):g(c));Array.from(r).forEach(c=>{c.style.backgroundColor=w,c.style.boxShadow=v}),e.to(r,{backgroundColor:d,boxShadow:p,duration:.35},"<")}}),e},m=(o,t)=>{let e;return t==="label"?e=.03:t==="heading"?e=.01:typeof t=="number"?e=t:e=.01,A(o),D(o,e)};var b=o=>{$(o).each(function(){let t={val:0},e=$(this).text(),i=parseFloat(e),a=e%1>=.5&&e%1<1;if(!isNaN(i)){$(this).css("visibility","hidden");let l=()=>{let s;Math.abs(i-t.val)<=.01?s=i%1===0?i.toFixed(0):i.toFixed(2):t.val>=1?s=Math.floor(t.val).toFixed(0):s=t.val.toFixed(2),$(this).text(s)};TweenLite.to(t,1,{val:i,onUpdate:l,onStart:()=>$(this).css("visibility","visible")})}})},L=o=>{let t=gsap.timeline();return t.add(m(`.graph${o}_head .text-size-metadata`),"label").add(()=>b(`.graph${o}_head .graph-number`),"<"),t},S=(o,t)=>{let e=gsap.timeline();return $(o).each(function(i){let a=$(this).find(`.graph${t}_box`),l=$(this).find(`.graph${t}_label div`),s=$(this).find(`.graph${t}_row-num div`),r=gsap.timeline();r.from(a,{scaleX:0,duration:1}).add(()=>{b(s)},"<").add(m(l,"label")),e.add(r,i*.2)}),e};var x=(o,t,e)=>{let i=$(e),a=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:i,start:"70% bottom",onEnter:()=>{a.play()}}});return a.add(L(t)),a.add(S(o,t),"<"),a};var f=class{constructor(t="#termynal",e={}){this.container=typeof t=="string"?document.querySelector(t):t,this.pfx=`data-${e.prefix||"ty"}`,this.startDelay=e.startDelay||parseFloat(this.container.getAttribute(`${this.pfx}-startDelay`))||600,this.typeDelay=e.typeDelay||parseFloat(this.container.getAttribute(`${this.pfx}-typeDelay`))||90,this.lineDelay=e.lineDelay||parseFloat(this.container.getAttribute(`${this.pfx}-lineDelay`))||1500,this.progressLength=e.progressLength||parseFloat(this.container.getAttribute(`${this.pfx}-progressLength`))||40,this.progressChar=e.progressChar||this.container.getAttribute(`${this.pfx}-progressChar`)||"\u2588",this.progressPercent=e.progressPercent||parseFloat(this.container.getAttribute(`${this.pfx}-progressPercent`))||100,this.cursor=e.cursor||this.container.getAttribute(`${this.pfx}-cursor`)||"\u258B",this.lineData=this.lineDataToElements(e.lineData||[]),e.noInit||this.init()}init(){this.lines=[...this.container.querySelectorAll(`[${this.pfx}]`)].concat(this.lineData);let t=getComputedStyle(this.container);this.container.style.width=t.width!=="0px"?t.width:void 0,this.container.style.minHeight=t.height!=="0px"?t.height:void 0,this.container.setAttribute("data-termynal",""),this.container.innerHTML="",this.start()}async start(){await this._wait(this.startDelay);for(let t of this.lines){let e=t.getAttribute(this.pfx),i=t.getAttribute(`${this.pfx}-delay`)||this.lineDelay;e=="input"?(t.setAttribute(`${this.pfx}-cursor`,this.cursor),await this.type(t),await this._wait(i)):e=="progress"?(await this.progress(t),await this._wait(i)):(this.container.appendChild(t),await this._wait(i)),t.removeAttribute(`${this.pfx}-cursor`)}this._emitAnimationEndEvent()}_emitAnimationEndEvent(){let t=new Event("termynal-anim-end");this.container.dispatchEvent(t)}async type(t){let e=[...t.textContent],i=t.getAttribute(`${this.pfx}-typeDelay`)||this.typeDelay;t.textContent="",this.container.appendChild(t);for(let a of e)await this._wait(i),t.textContent+=a}async progress(t){let e=t.getAttribute(`${this.pfx}-progressLength`)||this.progressLength,a=(t.getAttribute(`${this.pfx}-progressChar`)||this.progressChar).repeat(e),l=t.getAttribute(`${this.pfx}-progressPercent`)||this.progressPercent;t.textContent="",this.container.appendChild(t);for(let s=1;s<a.length+1;s++){await this._wait(this.typeDelay);let r=Math.round(s/a.length*100);if(t.textContent=`${a.slice(0,s)} ${r}%`,r>l)break}}_wait(t){return new Promise(e=>setTimeout(e,t))}lineDataToElements(t){return t.map(e=>{let i=document.createElement("div");return i.innerHTML=`<span ${this._attributes(e)}>${e.value||""}</span>`,i.firstElementChild})}_attributes(t){let e="";for(let i in t)e+=this.pfx,i==="type"?e+=`="${t[i]}" `:i!=="value"&&(e+=`-${i}="${t[i]}" `);return e}};gsap.registerPlugin(ScrollTrigger);$(document).ready(function(){let o=setInterval(function(){window.gsap&&(clearInterval(o),setTimeout(()=>{let r=gsap.timeline();r.from("[hero-pattern-lines]",{opacity:0}),r.from("[hero-pattern-square]",{scale:0}),t.forEach(n=>{a(n),l(n)}),Object.values(i).forEach(n=>{e(n)}),$("#mojoCode").css("visibility","visible")},400))},100),t=["termynal-1"];function e(r){r.container.addEventListener("termynal-anim-end",()=>{setTimeout(()=>{r.init()},3e3)})}let i={};function a(r){console.log(`Defining Termynal for: ${r}`),i[r]=new f(`#${r}`,{startDelay:600,noInit:!0})}function l(r){i[r]?(i[r].init(),$(`#${r}`).css("visibility","visible")):console.warn(`Termynal instance for ${r} not found.`)}function s(r,n,d){let p,h=!1;function g(){window.matchMedia(n).matches?h||(h=!0,p=new Swiper(r,{slidesPerView:1,spaceBetween:24,speed:250,observer:!0,touchMoveStopPropagation:!1,preventInteractionOnTransition:!0,pagination:{el:".swiper-navigation",type:"bullets",clickable:!0,bulletActiveClass:"w-active",bulletClass:"w-slider-dot"},...d})):h&&(p&&p.destroy(!0,!0),h=!1)}return window.addEventListener("load",g),window.addEventListener("resize",g),g}s(".carda_slider","(max-width: 991px)",{}),$("#deployment-visual").each(function(){let r=$(this),n=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:r,start:"50% bottom",onEnter:()=>{n.play()}}}),d=$(this).find(".cardj_row1").add(".cardj_row2").find(".w-embed");n.fromTo(d,{scale:.8,opacity:0},{scale:1,opacity:1,stagger:.05}),n.fromTo($(this).find(".cardj_row2"),{opacity:0},{opacity:1},"<").add(m($(this).find(".text-size-tiny"),"label"))}),$(".cardd_visual.hardware").each(function(){let r=$(this),n=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:r,start:"50% bottom",onEnter:()=>{n.play()}}});n.fromTo($(this).find(".cardd_logo-box"),{scale:.8,opacity:0},{scale:1,opacity:1,stagger:.05}),n.fromTo($(this).find(".cardd_logo-line-2").add(".cardd_logo-line-1"),{opacity:0},{opacity:1})}),$(".discord_box").each(function(){let r=$(this),n=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:r,start:"50% bottom",onEnter:()=>{n.play()}}});n.fromTo($(this).find(".discord_card"),1,{y:"1rem",opacity:0},{y:"0rem",opacity:1}).fromTo($(this).find(".discord_bg"),1,{y:"1rem",opacity:0},{y:"0rem",opacity:1},"<0.3").from($(this).find(".discord_avatar,.discord_message-text:first-child, .discord_message-time"),.5,{opacity:0,stagger:.15},"<").add(m($(this).find(".discord_message-text").eq(1),.03))}),$(".grapha_row").each(function(){x($(this),"a",".grapha")})});$(window).on("load resize scroll",function(){$(".section_videohero").each(function(){N($(this))?$(".navbar_wrapper").addClass("white"):$(".navbar_wrapper").removeClass("white")})});function N(o){var t=$(o),e=$(window),i=e.scrollTop(),a=i+e.height(),l=t.offset().top,s=l+t.height();return l<a&&s>i}})();