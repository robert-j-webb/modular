"use strict";(()=>{function a(){$(".hs-form-checkbox").on("click",function(){$(this).find("input[type=checkbox]").is(":checked")?$(this).find("label").addClass("active"):$(this).find("label").removeClass("active")})}function c(){$(".hs-form-radio").on("change",function(){let e=$(this).find("input[type=radio]").attr("name");$('input[name="'+e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")).closest("label").removeClass("active"),$(this).find("input[type=radio]").is(":checked")&&$(this).find("label").addClass("active")})}function l(){$("select").niceSelect(),$(".nice-select li").on("click",function(){$(".nice-select .current").css("color","#020c13")})}var o=()=>{a(),c(),l()};console.log(formID);hbspt.forms.create({region:"na1",portalId:"24141518",formId:formID,target:"#form-container",onFormReady:function(e){o();let t=new URLSearchParams(window.location.search).get("email");if(t){let n=document.querySelector('input[name="email"]');n&&(n.value=t)}}});})();