"use strict";(()=>{var x=t=>{let e=n=>{if(n.nodeType===Node.TEXT_NODE){let i=n.textContent,r=document.createDocumentFragment();for(let a=0;a<i.length;a++){let o=document.createElement("span");o.className="letter",o.textContent=i[a],r.appendChild(o)}n.parentNode.replaceChild(r,n)}else n.nodeType===Node.ELEMENT_NODE&&n.tagName!=="BR"&&Array.from(n.childNodes).forEach(e)};$(t).contents().each(function(){e(this)})},y=(t,e)=>{let n=gsap.timeline();return $(t).each((i,r)=>{let a=$(r).find(".letter").not(".line-numbers-row .code-letter"),o=gsap.timeline();a.each((g,m)=>{let c=$(m).closest(".word-highlight");c.length?o.fromTo(m,{display:"none"},{display:"inline"},g*e,"<").to(c,{opacity:1,duration:.2},"<"):o.fromTo(m,{visibility:"hidden"},{visibility:"initial"},g*e,"<")}),n.add(o,0)}),n},E=(t,e)=>{let n;return e==="label"?n=.03:e==="heading"?n=.02:typeof e=="number"?n=e:n=.01,x(t),y(t,n)};var N=t=>{gsap.timeline().fromTo(t,{scaleY:0},{scaleY:1,duration:1},"<")};var b=(t,e)=>{let n=$(e),i=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:n,start:"50% bottom",onEnter:()=>{i.play()}}}),r=$(t).find(".text-size-label"),a=$(e).find(".graphd_legend-dot"),o=$(t).find(".graph-charts");return i.add(E(r,"label"),"<").add(N(o),"<").fromTo(a,{scale:.5,opacity:0},{scale:1,opacity:1},"<"),i};function p(t,e){let n=typeof t;return typeof e!="string"||e.trim()===""?t:e==="true"&&n==="boolean"?!0:e==="false"&&n==="boolean"?!1:isNaN(e)&&n==="string"?e:!isNaN(e)&&n==="number"?+e:t}$("[tr-marquee-element='component']").each(function(){let t=$(this),e=t.find("[tr-marquee-element='panel']"),n=t.find("[tr-marquee-element='triggerhover']"),i=t.find("[tr-marquee-element='triggerclick']"),r=p(100,t.attr("tr-marquee-speed")),a=p(!1,t.attr("tr-marquee-vertical")),o=p(!1,t.attr("tr-marquee-reverse")),g=p(!1,t.attr("tr-marquee-scrolldirection")),m=p(!1,t.attr("tr-marquee-scrollscrub")),c=-100,u=1,v=!1;o&&(c=100);let d=gsap.timeline({repeat:-1,onReverseComplete:()=>d.progress(1)});a?(r=e.first().height()/r,d.fromTo(e,{yPercent:0},{yPercent:c,ease:"none",duration:r})):(r=e.first().width()/r,d.fromTo(e,{xPercent:0},{xPercent:c,ease:"none",duration:r}));let T={value:1};ScrollTrigger.create({trigger:"body",start:"top top",end:"bottom bottom",onUpdate:s=>{if(!v&&(g&&u!==s.direction&&(u=s.direction,d.timeScale(s.direction)),m)){let l=s.getVelocity()*.006;l=gsap.utils.clamp(-60,60,l),gsap.timeline({onUpdate:()=>d.timeScale(T.value)}).fromTo(T,{value:l},{value:u,duration:.5})}}});function f(s){v=s;let l={value:1},h=gsap.timeline({onUpdate:()=>d.timeScale(l.value)});s?(h.fromTo(l,{value:u},{value:0,duration:.5}),i.addClass("is-paused")):(h.fromTo(l,{value:0},{value:u,duration:.5}),i.removeClass("is-paused"))}window.matchMedia("(pointer: fine)").matches&&(n.on("mouseenter",()=>f(!0)),n.on("mouseleave",()=>f(!1))),i.on("click",function(){$(this).hasClass("is-paused")?f(!1):f(!0)})});$(".graphd").each(function(){let t=$(this),e=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:t,start:"top bottom",onEnter:()=>{e.play()}}});e.add(b($(this),t))});$(".graphd").each(function(){b($(this),$(this))});})();