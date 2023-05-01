"use strict";(()=>{var _=r=>{let t=e=>{if(e.nodeType===Node.TEXT_NODE){if(!e.parentNode.classList.contains("letter")){let n=e.textContent,o=document.createDocumentFragment();for(let i=0;i<n.length;i++){let a=document.createElement("span");a.className="letter",a.textContent=n[i],o.appendChild(a)}e.parentNode.replaceChild(o,e)}}else e.nodeType===Node.ELEMENT_NODE&&e.tagName!=="BR"&&Array.from(e.childNodes).forEach(t)};$(r).contents().each(function(){t(this)})},B=(r,t)=>{let e=gsap.timeline(),n=0;return $(r).each((o,i)=>{let a=$(i).find(".letter").not(".line-numbers-row .code-letter"),l=$(i).find(".word-highlight");if(a.each((g,c)=>{e.fromTo(c,{visibility:"hidden"},{visibility:"initial"},n*t,"<"),n++}),l.length){let g=l[0],c=window.getComputedStyle(g).getPropertyValue("background-color"),u=window.getComputedStyle(g).getPropertyValue("box-shadow"),d=(s,m)=>{let[E,C,S]=s.match(/\w\w/g).map(q=>parseInt(q,16));return`rgba(${E}, ${C}, ${S}, ${m})`},h=s=>{let m=s.replace(/^rgba?\(/,"").replace(/\)$/,"").split(",");return`rgba(${m[0]}, ${m[1]}, ${m[2]}, 0)`},b=s=>/^#(?:[0-9a-f]{3}){1,2}$/i.test(s),v=b(c)?d(c,0):h(c),N=u.replace(/rgba?\([^)]+\)/g,s=>b(s)?d(s,0):h(s));Array.from(l).forEach(s=>{s.style.backgroundColor=v,s.style.boxShadow=N}),e.to(l,{backgroundColor:c,boxShadow:u,duration:.35},"<")}}),e},p=(r,t)=>{let e;return t==="label"?e=.03:t==="heading"?e=.01:typeof t=="number"?e=t:e=.01,_(r),B(r,e)};var x=r=>{$(r).each(function(){let t={val:0},e=$(this).text(),n=parseFloat(e),o=e%1>=.5&&e%1<1;if(!isNaN(n)){$(this).css("visibility","hidden");let i=()=>{let a;Math.abs(n-t.val)<=.01?a=n%1===0?n.toFixed(0):n.toFixed(2):t.val>=1?a=Math.floor(t.val).toFixed(0):a=t.val.toFixed(2),$(this).text(a)};TweenLite.to(t,1,{val:n,onUpdate:i,onStart:()=>$(this).css("visibility","visible")})}})},f=r=>{let t=gsap.timeline();return t.add(p(`.graph${r}_head .text-size-metadata`),"label").add(()=>x(`.graph${r}_head .graph-number`),"<"),t},G=(r,t)=>{let e=gsap.timeline();return $(r).each(function(n){let o=$(this).find(`.graph${t}_box`),i=$(this).find(`.graph${t}_label div`),a=$(this).find(`.graph${t}_row-num div`),l=gsap.timeline();l.from(o,{scaleX:0,duration:1}).add(()=>{x(a)},"<").add(p(i,"label")),e.add(l,n*.2)}),e},A=r=>{gsap.timeline().fromTo(r,{scaleY:0},{scaleY:1,duration:1},"<")},y=(r,t,e)=>{let n=$(e),o=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:n,start:"70% bottom",onEnter:()=>{o.play()}}});return o.add(f(t)),o.add(G(r,t),"<"),o},w=(r,t,e)=>{let n=$(e),o=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:n,start:"70% bottom",onEnter:()=>{o.play()}}}),i=$(r).find(".text-size-label"),a=$(e).find(".graphd_legend-dot"),l=$(r).find(".graph-charts");return o.add(f(t)),o.add(p(i,"label"),"<").add(A(l),"<").fromTo(a,{scale:.5,opacity:0},{scale:1,opacity:1},"<"),o},T=(r,t,e)=>{let n=$(e),o=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:n,start:"70% bottom",onEnter:()=>{o.play()}}}),i=$(r).find(".text-size-label"),a=$(r).find(".graphc_item");return o.add(f(t)),o.fromTo(a,{scale:0,opacity:0},{scale:1,opacity:1,stagger:.2}).add(p(i,"label")),o};$(document).ready(function(){$("#hero").each(function(){let t=gsap.timeline({delay:.2}),e=$(this).find("h1"),n=$(this).find("p"),o=$(this).find(".button");t.to(e,{opacity:1}),t.add(p(e),"<"),t.to(n,{opacity:1,duration:.5},"<1"),t.to(o,{opacity:1,duration:.5},"<0.4"),t.add(w(".graphd","d",".graphd"),"<")});function r(t,e){let n=typeof t;return typeof e!="string"||e.trim()===""?t:e==="true"&&n==="boolean"?!0:e==="false"&&n==="boolean"?!1:isNaN(e)&&n==="string"?e:!isNaN(e)&&n==="number"?+e:t}$(document).ready(function(){let t=()=>{window.matchMedia("(min-width: 992px)").matches?$("[tr-marquee-element='component']").each(function(){let e=$(this),n=e.find("[tr-marquee-element='panel']"),o=r(100,e.attr("tr-marquee-speed")),i=r(!1,e.attr("tr-marquee-vertical")),a=r(!1,e.attr("tr-marquee-reverse")),l=-100;a&&(l=100);let g=d=>{i?gsap.set(n,{yPercent:d*l}):gsap.set(n,{xPercent:d*l})},c=gsap.timeline(),u=ScrollTrigger.create({trigger:"body",start:"top top",end:"bottom bottom",onUpdate:d=>{let h=d.progress;g(h)}});e.data("scrollTrigger",u)}):$("[tr-marquee-element='component']").each(function(){let e=$(this),n=e.find("[tr-marquee-element='panel']"),o=e.data("scrollTrigger");o&&(o.kill(),e.removeData("scrollTrigger")),gsap.set(n,{clearProps:"all"})})};t(),$(window).on("resize",t)}),$(".graphb_row").each(function(){y($(this),"b",".graphb")}),$(".graphc_box").each(function(){T($(this),"c",".graphc")})});})();
