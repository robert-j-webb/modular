"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/signup.js
  var hsform;
  var steps = [
    ["firstname", "lastname", "email", "modular_product_name"],
    ["0-2/name", "0-2/size", "0-2/industry"]
  ];
  var customErrorMessages = {
    "First name": "Please fill your first name.",
    "Last name": "Please fill your last name.",
    Email: "Please fill your email.",
    "Company name": "Please fill your company name.",
    Industry: "Please select your industry."
    // Add more custom error messages as needed
  };
  var stepsTexts = ["Next", "Submit"];
  var controlBtn = "#formBtn";
  var fields;
  var currentSteps;
  var x = 0;
  function tagFields() {
    document.querySelectorAll(".hs-form-field :is(input, select)").forEach((element) => {
      steps.forEach((step, i) => {
        step.forEach((field) => {
          if (element.name === field) {
            element.closest(".hs-form-field").setAttribute("data-step", i);
          }
        });
      });
    });
  }
  hbspt.forms.create({
    region: "na1",
    portalId: "24141518",
    formId: "456272d6-bcc6-477d-95bc-5efde20524fe",
    target: "#form-container",
    onFormReady: function(form) {
      hsform = form;
      initMultiStep();
      $(controlBtn).on("click", function() {
        if (validation()) {
          if (isOnlyMojo()) {
            submitForm();
          } else if (x === steps.length - 1) {
            submitForm();
          } else {
            updateStep();
          }
        } else {
          return;
        }
      });
      $("input, select, :checkbox, :radio").not("[type=email]").on("input focus change", function() {
        const submitBtn = $(controlBtn);
        if (isOnlyMojo()) {
          if (x > 0) {
            initMultiStep();
          }
          submitBtn.text(stepsTexts[1]);
        } else if (x !== steps.length - 1) {
          submitBtn.text(stepsTexts[0]);
        }
        removeErrorMessages($(this));
      });
      $(".hs-form-checkbox").on("click", function() {
        if ($(this).find("input[type=checkbox]").is(":checked")) {
          $(this).find("label").addClass("active");
        } else {
          $(this).find("label").removeClass("active");
        }
      });
      $(".hs-form-radio").on("change", function() {
        let radioGroup = $(this).find("input[type=radio]").attr("name");
        let radioButtons = $('input[name="' + radioGroup.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));
        radioButtons.closest("label").removeClass("active");
        if ($(this).find("input[type=radio]").is(":checked")) {
          $(this).find("label").addClass("active");
        }
      });
      $("select").niceSelect();
      $(".nice-select li").on("click", function() {
        $(".nice-select .current").css("color", "#020c13");
      });
    },
    onFormSubmitted: function() {
      $(controlBtn).hide();
    }
  });
  function initMultiStep() {
    x = 0;
    fields = $(".hs-form-field");
    tagFields();
    fields.hide();
    $(".sign-up_step-inner").animate({ opacity: 1 }, 300);
    currentSteps = fields.filter(`[data-step=${x}]`);
    currentSteps.fadeIn("slow");
  }
  function updateStep() {
    const submitBtn = $(controlBtn);
    x += 1;
    currentSteps = fields.filter(`[data-step=${x}]`);
    if (x === steps.length - 1) {
      submitBtn.text(stepsTexts[1]);
    } else {
      submitBtn.text(stepsTexts[0]);
    }
    currentSteps.fadeIn("slow");
    const input = currentSteps.find("input").eq(0);
    const inputTop = input.offset().top;
    const windowHeight = $(window).height();
    const scrollTo = inputTop - windowHeight / 2;
    $("html, body").animate({ scrollTop: scrollTo }, 500);
    input.focus();
  }
  function submitForm() {
    removeErrorMessages();
    hsform.find("input[type=submit]").trigger("click");
  }
  function validateInput(input) {
    let isValid = true;
    const value = $(input).val();
    const inputParentElement = $(input).closest(".input");
    const labelText = inputParentElement.siblings("label").find("span").eq(0).text();
    const errorMessage = customErrorMessages[labelText] || `Error for ${labelText}`;
    if (value === "" || value == null) {
      createErrorMessage(errorMessage, input);
      isValid = false;
    }
    return isValid;
  }
  function validateCheckboxRadio(elements) {
    if (!elements.length)
      return true;
    const atLeastOneChecked = elements.is(":checked");
    const firstGroupItem = elements.first();
    const closestWrapper = firstGroupItem.closest(".inputs-list");
    if (!atLeastOneChecked) {
      createErrorMessage("Please select at least one option.", closestWrapper);
      return false;
    }
    return true;
  }
  var validationCalled = /* @__PURE__ */ new Set();
  function isOnlyMojo() {
    const isMojoOnlyChecked = $('.hs-input[type="checkbox"]').filter(":checked").length === 1 && $('.hs-input[type="checkbox"]:checked[value="mojo"]').length === 1;
    return isMojoOnlyChecked;
  }
  function createErrorMessage(labelText, element) {
    const inputParentElement = $(element).closest(".input");
    if (inputParentElement.next().hasClass("hs-error-msgs")) {
      return;
    }
    const labelElement = $("<label>", {
      class: "hs-error-msg hs-main-font-element",
      text: labelText
    });
    const ulElement = $("<ul>", {
      class: "no-list hs-error-msgs inputs-list custom-error-msg",
      role: "alert"
    });
    const liElement = $("<li>");
    liElement.append(labelElement);
    ulElement.append(liElement);
    inputParentElement.after(ulElement);
    if (element.tagName === "INPUT") {
      $(element).addClass("invalid error custom-error-class");
    }
  }
  function removeErrorMessages(element) {
    const $errorContainer = element ? $(element).closest(".hs-form-field") : $(document.body);
    const $errorMessages = $errorContainer.find(".custom-error-msg");
    const $errorClass = $errorContainer.find(".custom-error-class");
    $errorMessages.remove();
    $errorClass.removeClass("invalid error custom-error-class");
  }
  function validation() {
    let inputValidate = true;
    removeErrorMessages();
    const inputs = currentSteps.find(":input:visible,select").not("[type=email]");
    inputs.each(function() {
      inputValidate = validateInput(this) && inputValidate;
    });
    let hsemail = $("input[type=email]");
    hsemail.get(0).focus();
    hsemail.get(0).blur();
    const checkboxes = currentSteps.find(":checkbox:visible");
    const radios = currentSteps.find(":radio:visible");
    inputValidate = validateCheckboxRadio(checkboxes, "checkbox") && inputValidate;
    inputValidate = validateCheckboxRadio(radios, "radio") && inputValidate;
    validationCalled.add(x);
    return inputValidate;
  }
})();
//# sourceMappingURL=signup.js.map
