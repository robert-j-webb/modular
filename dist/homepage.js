"use strict";(()=>{var k=n=>{let o=t=>{if(t.nodeType===Node.TEXT_NODE){if(!t.parentNode.classList.contains("letter")){let r=t.textContent,c=document.createDocumentFragment();for(let s=0;s<r.length;s++){let l=document.createElement("span");l.className="letter",l.textContent=r[s],c.appendChild(l)}t.parentNode.replaceChild(c,t)}}else t.nodeType===Node.ELEMENT_NODE&&t.tagName!=="BR"&&Array.from(t.childNodes).forEach(o)};$(n).contents().each(function(){o(this)})},K=(n,o)=>{let t=gsap.timeline(),r=0;return $(n).each((c,s)=>{let l=$(s).find(".letter").not(".line-numbers-row .code-letter"),p=$(s).find(".word-highlight");if(l.each((x,g)=>{t.fromTo(g,{visibility:"hidden"},{visibility:"initial"},r*o,"<"),r++}),p.length){let x=p[0],g=window.getComputedStyle(x).getPropertyValue("background-color"),w=window.getComputedStyle(x).getPropertyValue("box-shadow"),T=(i,f)=>{let[A,I,B]=i.match(/\w\w/g).map(S=>parseInt(S,16));return`rgba(${A}, ${I}, ${B}, ${f})`},y=i=>{let f=i.replace(/^rgba?\(/,"").replace(/\)$/,"").split(",");return`rgba(${f[0]}, ${f[1]}, ${f[2]}, 0)`},v=i=>/^#(?:[0-9a-f]{3}){1,2}$/i.test(i),N=v(g)?T(g,0):y(g),E=w.replace(/rgba?\([^)]+\)/g,i=>v(i)?T(i,0):y(i));Array.from(p).forEach(i=>{i.style.backgroundColor=N,i.style.boxShadow=E}),t.to(p,{backgroundColor:g,boxShadow:w,duration:.35},"<")}}),t},m=(n,o)=>{let t;return o==="label"?t=.03:o==="heading"?t=.01:typeof o=="number"?t=o:t=.01,k(n),K(n,t)},z=n=>{let o=$(n).find("code"),t=o.find(".line-numbers-rows").eq(0).clone();return o.find(".line-numbers-rows").remove(),k(o),o.prepend(t),K(o,.01)};var j=(n,o)=>{let t=gsap.timeline(),r=o===0?"PY":"&#x1F525";return t.set(n,{text:r}),t},Z=n=>{$(n).each(function(){let o={val:0},t=$(this).text(),r=parseFloat(t),c=t%1>=.5&&t%1<1;if(!isNaN(r)){$(this).css("visibility","hidden");let s=()=>{let l;Math.abs(r-o.val)<=.01?l=r%1===0?r.toFixed(0):r.toFixed(2):o.val>=1?l=Math.floor(o.val).toFixed(0):l=o.val.toFixed(2),$(this).text(l)};TweenLite.to(o,1,{val:r,onUpdate:s,onStart:()=>$(this).css("visibility","visible")})}})},be=n=>{let o=gsap.timeline();return o.add(m(`.graph${n}_head .text-size-metadata`),"label").add(()=>Z(`.graph${n}_head .graph-number`),"<"),o},fe=(n,o)=>{let t=gsap.timeline();return $(n).each(function(r){let c=$(this).find(`.graph${o}_box`),s=$(this).find(`.graph${o}_label div`),l=$(this).find(`.graph${o}_row-num div`),p=gsap.timeline();p.from(c,{scaleX:0,duration:1}).add(()=>{Z(l)},"<").add(m(s,"label")),t.add(p,r*.2)}),t};var ee=(n,o,t)=>{let r=$(t),c=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:r,start:"70% bottom",onEnter:()=>{c.play()}}});return c.add(be(o)),c.add(fe(n,o),"<"),c};gsap.registerPlugin(ScrollTrigger);$(document).ready(function(){let o="#heroLabel",t="#heroHeading",r=".header_highlight-head",c="#heroButtons .button",s="#modularBox",l=".hero-box",p=".hero-box_inner",x=s+" "+p,g="#brandLogo",w=l+"[box-direction=left] "+p,T=l+"[box-direction=right] "+p,y=".hero-box_metadata-mask",v=".hero-dashboard_arrow",N=".hero-devices_border",E=".hero-paragraphs",i="#dashboard",f=i+" .hero-dashboard_inner",A=i+" .hero-dashboard_code",I=i+" .hero-dashboard_close circle",B=i+" .hero-dashboard_head-label",S="#file-type",te=i+" .hero-dashboard_tab",ae=i+" .hero-dashboard_tab-inner.python",oe=i+" .hero-dashboard_tab-inner.mojo",V=i+" .hero-dashboard_code-block.python",M=i+" .hero-dashboard_code-block.mojo",R=".hero-dashboard_graphs",Y=".hero-dashboard_graph-head",u=".hero-dashboard_graph-box",re=$(u).eq(0),ie=".hero-dashboard_graph-label",$e=".hero-dashboard_graph-number-label",Q=".hero-dashboard_graph-number",ne=".hero-dashboard_graph-legend",_=".hero-navigation_item",de=[$(t).html(),$(".hero-headings").find("div").eq(0).html(),$(".hero-headings").find("div").eq(1).html()],b=[$(_).eq(0).text(),$(_).eq(1).text(),$(_).eq(2).text()];function xe(){console.log("Devices");let e="hide";$(".hero-devices .hero-box_inner").each(function(){let a=$(this).find(".hero-box_icon"),h=a.not("."+e),d=h.index()>=a.length-1?0:h.index()+1;a.addClass(e),a.eq(d).removeClass(e)})}function se(e){$(t).html(de[e]),k(t),U(e)}function le(e){console.log("Fire"+e),$(E).find("p").stop(!0,!0).fadeOut().eq(e).fadeIn()}function U(e){let a=$(_);a.removeClass("active"),a.eq(e).addClass("active")}let q=e=>{$(e).trigger("click")};function ce(e,a){$(e).addClass(a)}let P=null,L=(e,a)=>{let h=d=>{d?$(t).width(d):$(t).removeAttr("style")};return P=gsap.timeline(),a=a||"90%",P.to(t,{opacity:0,y:"2em",duration:.5}).add(()=>{let d=gsap.timeline();return d.call(()=>{h(a),se(e),le(e)}),d}).to(t,{opacity:1,y:"0em",duration:.5}),P},G=(e,a)=>{let h=a,d=gsap.timeline();return a||(h="label"),d.set(e,{opacity:1}),d.add(m(e,h)),d},H=e=>{let a=gsap.timeline();return a.fromTo(e,{scaleY:0},{scaleY:1,duration:1.2},"<"),a},O=e=>{let a=gsap.timeline();return a.add(G($(e).find(ie).children()),"<+=0.3").set($(e).find(Q),{yPercent:10,opacity:0},"<+=0.3").to($(e).find(Q),{yPercent:0,opacity:1,duration:1.2},"<+=0.15").add(G($(e).find(ne).children()),"<+=0.3"),a},C=!1,X=()=>{let e=gsap.timeline();return e.addLabel("Start").call(()=>{C||(q(g),C=!0)}).call(()=>U(0)).add(m(t,"heading"),"<").call(()=>q(g)).from(c,{opacity:0,stagger:.1,duration:1.2},"<0.1").from(E,{opacity:0,duration:1.2}).fromTo($(s),{width:"19em",opacity:0},{width:"12.2em",opacity:1,duration:1},"Start").addLabel($(_).eq(0).text()).fromTo($(x),{opacity:0},{opacity:1},"Start+=0.3").call(()=>ce(x,"border")).add(m($(s).find(y).find("div"),.15),"-=1.15"),e.addLabel("heroBoxes").from(w,{opacity:0,x:"-12em",stagger:.15,duration:1.2},"heroBoxes").from(T,{opacity:0,x:"12em",stagger:.15,duration:1.2},"<"),e.addLabel("heroBoxesText").add(m($(w).closest(l).find(y).children(),"label"),"heroBoxesText").add(m($(T).closest(".hero-devices_box").find(y).children(),"label"),"<"),e.addLabel("arrowsAndBorder").call(()=>q(v)).to(v,{opacity:1,duration:0},"arrowsAndBorder"),e},he=()=>{let e=gsap.timeline();return e.addLabel("expandSquare").fromTo(s,{width:"12.2em",height:"12.2em"},{width:"90.4em",height:"37.2em",duration:1}).to([g,w,T,y,v,N],{opacity:0,duration:1.2},"expandSquare+=0.4"),e.fromTo([i,R],{opacity:0,display:"none"},{opacity:1,display:"flex",duration:1.2},"expandSquare+=0.4"),e},pe=()=>{let e=gsap.timeline();return e.addLabel("Reveal").add(X()).add(gsap.delayedCall(5,()=>{})),e},ge=()=>{let e=gsap.timeline();return e.addLabel("showGraph").addLabel("animateGraph1").to(f,{opacity:0,display:"none"},"<").add(G($(Y).children(),.05),"<").add(H($(u).eq(0)),"<").add(O($(u).eq(0)),">-0.4").addLabel("animateGraph2").add(H($(u).eq(1)),"<").add(O($(u).eq(1)),">-0.4").addLabel("animateGraph3").add(H($(u).eq(2)),"<").add(O($(u).eq(2)),">-0.4").add(gsap.delayedCall(6,()=>{})),e},me=()=>{let e=gsap.timeline();return e.addLabel("graph expand").to([$(u).not(":first-child"),$(u).children(),Y],{opacity:0,duration:.3}).to(re,{width:"100%",duration:1}).addLabel("show Dashboard").fromTo([f],{opacity:0,display:"none"},{opacity:1,display:"flex",duration:.5}).to(I,{opacity:1,stagger:.1,duration:1.2},"<-=0.3").add(m(B+" div","label"),"<").to([B,te],{opacity:1,duration:1.2,stagger:.2},"<").to(A,{opacity:1,duration:1.2},"<").addLabel("graph fade out").to(R,{opacity:0,display:"none",duration:.5}),e.addLabel("pythonCode").add(z(V),"<").add(j(S,0),"<"),e.addLabel("switchCodeTabs","+=2").to(ae,{opacity:0,duration:1.2/2},"switchCodeTabs").to(oe,{opacity:1,display:"flex",duration:1.2},"<").set(V,{display:"none"},"<").set(M,{display:"block"},"<"),e.add(z(M),"<").add(j(S,1),"<"),e},W={trigger:".section_headera",start:"top center",end:"bottom top",toggleActions:"play none none none"},ue=()=>{let e=gsap.timeline({delay:.5,ease:Power2.easeOut,scrollTrigger:W,paused:!0});return e.addLabel(b[0]+"-Start").add(pe(),"<").addLabel(b[0]+"-End").add(he()).addLabel(b[1]+"-Start").add(L(1)).add(ge(),"<").addLabel(b[1]+"-End").addLabel(b[2]+"-Start").add(L(2)).add(me(),"<").addLabel(b[2]+"-End"),$(_).off("click").on("click",function(a){a.stopPropagation(),a.preventDefault();let h=$(this).index(),d=b[h];h===0&&(L(0),C===!0&&q(g)),e.seek(d+"-Start").tweenFromTo(d+"-Start",d+"-End"),console.log("Click")}),e};ScrollTrigger.matchMedia({"(min-width: 768px)":function(){C=!1,ue().seek(b[1]+"-Start").addPause(b[1]+"-End")},"(max-width: 767px)":function(){let e=gsap.timeline({scrollTrigger:W});C=!1,e.add(X()),L(0)}});function J(e,a,h){let d,D=!1;function F(){window.matchMedia(a).matches?D||(D=!0,d=new Swiper(e,{slidesPerView:1,spaceBetween:24,speed:250,observer:!0,touchMoveStopPropagation:!1,preventInteractionOnTransition:!0,pagination:{el:".swiper-navigation",type:"bullets",clickable:!0,bulletActiveClass:"w-active",bulletClass:"w-slider-dot"},...h})):D&&(d&&d.destroy(!0,!0),D=!1)}return window.addEventListener("load",F),window.addEventListener("resize",F),F}let we=J(".hero-swiper","(max-width: 767px)",{on:{slideChange:function(){L(this.activeIndex)}}});J(".carda_slider","(max-width: 991px)",{}),$("#deployment-visual").each(function(){let e=$(this),a=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:e,start:"50% bottom",onEnter:()=>{a.play()}}}),h=$(this).find(".cardj_row1").add(".cardj_row2").find(".w-embed");a.fromTo(h,{scale:.8,opacity:0},{scale:1,opacity:1,stagger:.05}),a.fromTo($(this).find(".cardj_row2"),{opacity:0},{opacity:1},"<").add(m($(this).find(".text-size-tiny"),"label"))}),$(".cardd_visual.hardware").each(function(){let e=$(this),a=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:e,start:"50% bottom",onEnter:()=>{a.play()}}});a.fromTo($(this).find(".cardd_logo-box"),{scale:.8,opacity:0},{scale:1,opacity:1,stagger:.05}),a.fromTo($(this).find(".cardd_logo-line-2").add(".cardd_logo-line-1"),{opacity:0},{opacity:1})}),$(".discord_box").each(function(){let e=$(this),a=gsap.timeline({ease:Power2.easeOut,paused:!0,scrollTrigger:{trigger:e,start:"50% bottom",onEnter:()=>{a.play()}}});a.fromTo($(this).find(".discord_card"),1,{y:"1rem",opacity:0},{y:"0rem",opacity:1}).fromTo($(this).find(".discord_bg"),1,{y:"1rem",opacity:0},{y:"0rem",opacity:1},"<0.3").from($(this).find(".discord_avatar,.discord_message-text:first-child, .discord_message-time"),.5,{opacity:0,stagger:.15},"<").add(m($(this).find(".discord_message-text").eq(1),.03))}),$(".grapha_row").each(function(){ee($(this),"a",".grapha")})});$(window).on("load resize scroll",function(){$(".section_videohero").each(function(){ye($(this))?$(".navbar_wrapper").addClass("white"):$(".navbar_wrapper").removeClass("white")})});function ye(n){var o=$(n),t=$(window),r=t.scrollTop(),c=r+t.height(),s=o.offset().top,l=s+o.height();return s<c&&l>r}})();
