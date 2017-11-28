var formexample = require('./formexample.js');

var htmlElements = {
  body: document.querySelector('body'),
	subsubjectradiobutton: document.querySelectorAll(".newformform input[name='subsubjectboolean']"),
  fieldButtons : document.querySelectorAll(".newformform fieldset button"),
  firstInput: document.querySelectorAll(".newformform fieldset input, fieldset textarea"),
  fields: document.querySelectorAll(".newformform fieldset")
}

var state = {
  type:"form",
  name: "new form",


}

var formState = {
  index:0,
}

var listeners = {
  radioBtnChange : function () {
    var prev = null;
    for (var i = 0; i < htmlElements.subsubjectradiobutton.length; i++) {
      htmlElements.subsubjectradiobutton[i].addEventListener('change', function(){
        // (prev)? console.log(prev.value):null;
        if(this !== prev) {
            prev = this;
        }
        console.log(this.value);
      })
    }
  },
  fieldsetInputChange : function () {
    for (var i = 0; i < htmlElements.firstInput.length; i++) {
      htmlElements.firstInput[i].addEventListener('change',function(){
        this.parentElement.querySelector("button").disabled=false;

      })
    }
  },
  submitField : function () {
    for (var i = 0; i < htmlElements.fieldButtons.length; i++) {
      htmlElements.fieldButtons[i].disabled = true;
      htmlElements.fieldButtons[i].addEventListener('click', function() {
        formState.index++;
        helperFuntions.displayActiveField();
      })
    }
  }

};

var helperFuntions = {
  displayActiveField : function () {
    for (var i = 0; i < htmlElements.fields.length; i++) {
      if (i==formState.index) {
        htmlElements.fields[i].classList.remove("hidden");
        if (i!=0 || i != htmlElements.fields.length-1) {
          htmlElements.fields[i-1].classList.add("hidden");
        }

      }

    }

  }
}

var newformhandler = function () {
  listeners.radioBtnChange();
  listeners.submitField();
  listeners.fieldsetInputChange();
  debugger
  formexample();
}

module.exports = newformhandler;
