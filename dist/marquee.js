"use strict";(()=>{function s(l,e){let t=typeof l;return typeof e!="string"||e.trim()===""?l:e==="true"&&t==="boolean"?!0:e==="false"&&t==="boolean"?!1:isNaN(e)&&t==="string"?e:!isNaN(e)&&t==="number"?+e:l}$("[tr-marquee-element='component']").each(function(l){let e=$(this),t=e.find("[tr-marquee-element='panel']"),p=e.find("[tr-marquee-element='triggerhover']"),c=e.find("[tr-marquee-element='triggerclick']"),n=s(100,e.attr("tr-marquee-speed")),v=s(!1,e.attr("tr-marquee-vertical")),S=s(!1,e.attr("tr-marquee-reverse")),b=s(!1,e.attr("tr-marquee-scrolldirection")),q=s(!1,e.attr("tr-marquee-scrollscrub")),m=-100,a=1,d=!1;S&&(m=100);let o=gsap.timeline({repeat:-1,onReverseComplete:()=>o.progress(1)});v?(n=t.first().height()/n,o.fromTo(t,{yPercent:0},{yPercent:m,ease:"none",duration:n})):(n=t.first().width()/n,o.fromTo(t,{xPercent:0},{xPercent:m,ease:"none",duration:n}));let g={value:1};ScrollTrigger.create({trigger:"body",start:"top top",end:"bottom bottom",onUpdate:r=>{if(!d&&(b&&a!==r.direction&&(a=r.direction,o.timeScale(r.direction)),q)){let i=r.getVelocity()*.006;i=gsap.utils.clamp(-60,60,i),gsap.timeline({onUpdate:()=>o.timeScale(g.value)}).fromTo(g,{value:i},{value:a,duration:.5})}}});function u(r){d=r;let i={value:1},f=gsap.timeline({onUpdate:()=>o.timeScale(i.value)});r?(f.fromTo(i,{value:a},{value:0,duration:.5}),c.addClass("is-paused")):(f.fromTo(i,{value:0},{value:a,duration:.5}),c.removeClass("is-paused"))}window.matchMedia("(pointer: fine)").matches&&(p.on("mouseenter",()=>u(!0)),p.on("mouseleave",()=>u(!1))),c.on("click",function(){$(this).hasClass("is-paused")?u(!1):u(!0)})});})();
