var formexample = require('./formexample.js');
var termsFormHandler = require('./termsformhandler.js');
var ejs = require('ejs');

var htmlElements = {
  body: document.querySelector('body'),
  form: document.querySelector('.userInput'),
	subsubjectradiobutton: document.querySelectorAll(".newformform input[name='subsubjectboolean']"),
  fieldButtons : document.querySelectorAll(".newformform fieldset button"),
  firstInput: document.querySelectorAll(".newformform fieldset input, fieldset textarea"),
  fields: document.querySelectorAll(".newformform fieldset")
}
// the data object for the competentie
var state = {
  type:"form",
  formName: "",

  sections: [

  ]

}


// state of
var formState = {
  index:0,
  prevIndex:0
}

var sectionState = {

}

var createFormElements = {
  termsTemplate: function (subsubject, index) {

    var template = ejs.render (
      `

        <label for="onderwerp">Wat zijn de indicatoren die onder <%= subsubject %> vallen ?</label>
        <textarea id="terms" type="textarea" name="terms"></textarea><span>*required</span><br/>
        <button type="button">ok</button>

      `,{subsubject: subsubject}

    );
    //debugger
    var fieldset = document.createElement("fieldset");
    fieldset.className = "hidden";
    fieldset.setAttribute("id", "newform" + index);
    fieldset.innerHTML = template;
    htmlElements.form.appendChild(fieldset);
  }
};

var listeners = {
  radioBtnChange : function () {
    var prev = null;
    for (var i = 0; i < htmlElements.subsubjectradiobutton.length; i++) {
      htmlElements.subsubjectradiobutton[i].addEventListener('change', function(){
        // (prev)? console.log(prev.value):null;
        if(this !== prev) {
            prev = this;
        }
        if (this.value == "false") {
            formState.index++;
        }
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
        var key="";
        var value="";
        var input="input";
        formState.index++;

        if(!event.target.parentElement.querySelector("input")) {
          input="textarea";
        }
        value = event.target.parentElement.querySelector(input).value
        key = event.target.parentElement.querySelector(input).name

        helperFuntions.processForm(key, value);
        helperFuntions.displayActiveField();
      })
    }
  }

};

var helperFuntions = {
  displayActiveField : function () {
    //debugger
    htmlElements.fields[formState.index].classList.remove("hidden");
    htmlElements.fields[formState.prevIndex].classList.add("hidden");
    formState.prevIndex=formState.index;
    // for (var i = 0; i < htmlElements.fields.length; i++) {
    //   if (i==formState.index) {
    //     htmlElements.fields[i].classList.remove("hidden");
    //     if (i!=0 || i != htmlElements.fields.length-1) {
    //       htmlElements.fields[i-1].classList.add("hidden");
    //     }
    //
    //   }
    //
    // }

  },
  processForm : function (key, answer) {
    var combinedState = state;
    // debugger
    // formName
    if (key == "formname") {
      state.formName = answer;
    }

    //add subsubjects
    if (key == "subsubjects") {
      var arr = answer.split(/[\n\r]/g);
      sectionState.subSubjects = [];

      for (var i = 0; i < arr.length; i++) {
        sectionState.subSubjects.push(
          {
            subSubjectsName: arr[i]
          }
        );
        createFormElements.termsTemplate(arr[i],i+5)
      }
      htmlElements.fields = document.querySelectorAll(".newformform fieldset")
    }
    if (key == "terms") {

    }

    //add subject
    if (key == "subject") {
      sectionState.subject = answer;
      combinedState.sections.push(sectionState);
    }


    formexample.createForm(combinedState);
  }
}

var newformhandler = function () {
  listeners.radioBtnChange();
  listeners.submitField();
  listeners.fieldsetInputChange();


}

module.exports = newformhandler;
