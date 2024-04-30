"use strict";(()=>{gsap.registerPlugin(ScrollTrigger);$(document).ready(function(){let y=()=>{let e=$("#ootb_logo"),a=$("#bar-slow_1"),t=$("#bar-slow_2"),i=$("#bar-slow_3"),n=$("#max_logo"),s=$("#bar-fast_1"),c=$("#bar-fast_2"),l=$("#bar-fast_3"),d=$("#headers"),m=$("#numbers"),g=$("#grid"),o=.7,r=gsap.timeline({defaults:{ease:Power2.easeOut}});return r.to($(".headerb_stage-2"),{opacity:1}),r.fromTo([e,n,d,m],{opacity:0,xPercent:-15},{opacity:1,xPercent:0,duration:.5}),r.fromTo(g,{scaleY:0},{scaleY:1,duration:.5},"<"),r.addLabel("bars-start","<0.2"),r.fromTo(i,{scaleX:0},{scaleX:1,duration:o},"bars-start"),r.fromTo(t,{scaleX:0},{scaleX:.428,duration:o},"<"),r.fromTo(a,{scaleX:0},{scaleX:.295,duration:o},"<"),r.to(t,{scaleX:1,duration:o}),r.to(a,{scaleX:.695,duration:o},"<"),r.to(a,{scaleX:1,duration:o}),r.fromTo(l,{scaleX:0},{scaleX:1,duration:o},"bars-start"),r.fromTo(c,{scaleX:0},{scaleX:1,duration:o},"<"),r.fromTo(s,{scaleX:0},{scaleX:1,duration:o},"<"),r};gsap.timeline({}).add(y());let h=".perf2_model-mask",E,k;function N(e){return e.toLocaleString("en")}let C=(e,a)=>{$(e).each(function(){let t=$(this).text().trim().replace(/,/g,""),i=parseFloat(t)||0,n=parseFloat(a);if(console.log(n),!isNaN(n)&&i!==n){let s={val:i},c=1;console.log(c);let l=()=>{let d=N(parseFloat(s.val.toFixed(c)));$(this).text(d)};gsap.fromTo(s,{val:i},{val:n,duration:.7,ease:Power1.easeOut,onUpdate:l})}})},p=(e,a)=>{$(e).each(function(){gsap.to(e,{text:a,duration:.5,ease:Power1.easeOut})})};function b(e,a){let{activeIndex:t,slides:i}=e,n=i[t],s=l=>{let d=$(l).find(h),m=d.find("p").outerHeight();gsap.to(d,{height:m})},c=gsap.timeline({onComplete:()=>{a&&s(n)}});i.forEach(l=>{c.to($(l).find(h),{height:0,duration:.2},"<")})}function w(e){let a=e.swiper1.realIndex,t=$(e.swiper1.slides[a]),i=$("[stat-number]"),n=$("[model-name-full]"),s=$("[instance-name-full]"),c=$(".perf2_slider-2 .perf2_model-mask p"),l=[$("[data-instance-1-short]").text(),$("[data-instance-2-short]").text(),$("[data-instance-3-short]").text()],d=t.find("[data-model-full]").text(),m=[t.attr("data-instance-1-full"),t.attr("data-instance-2-full"),t.attr("data-instance-3-full")],g=[t.attr("data-performance-1-val"),t.attr("data-performance-2-val"),t.attr("data-performance-3-val")],o=e.swiper2.realIndex;c.each(function(){let r=$(this).index();p($(this),m[r])}),C(i,g[o]),p(n,d),p(s,l[o]+" "+m[o])}let u={swiper1:T(".perf2_slider-1",{}),swiper2:T(".perf2_slider-2")},f=0,x,v=new IntersectionObserver(e=>{e[0].isIntersecting&&(x=new Date,v.disconnect())},{root:null,threshold:.5});v.observe(document.querySelector(".perf2_slider-1")),window.addEventListener("beforeunload",()=>{let e=Math.round((new Date-x)/1e3);amplitude.track("timeSpentOnPerformance",{timeInSeconds:e}),amplitude.track("totalClicksOnPerformance",{count:f})});function T(e,a){return new Swiper(e,{slidesPerView:1,direction:"vertical",observer:!0,slideToClickedSlide:!0,init:!1,threshold:40,freeMode:{enabled:!0,sticky:!0},on:{init:function(){b(this,!0)}},mousewheel:{thresholdDelta:20},...a})}for(let e in u)if(u.hasOwnProperty(e)){let a=u[e],t;a.on("slideChange",function(){var n;let i=(n=this.slides[this.activeIndex])==null?void 0:n.innerText;clearTimeout(t),t=setTimeout(()=>{f=f+1,amplitude.track("performanceSelected",{modelOrInstance:i}),b(this,!0),w(u)},300)}),a.init()}let P=gsap.timeline({scrollTrigger:{trigger:$(".perf2r"),start:"center bottom",markers:!0,onEnter:()=>{u.swiper1.slideTo(5,800,w(u)),u.swiper2.slideTo(1,800)}}})});})();
