var ejs = require('ejs');

var form = {
  createForm :function (formstate) {
    // debugger
    var template = ejs.render(`
      <h2><%= state.formName %></h2>
      <form class="userInput" action="" method="post">
        <% for (var i = 0; i < state.sections.length; i++) { %>
          <fieldset id="formexample">
            <legend><%= state.sections[i].subject %></legend>
            <% if (state.sections[i].subSubjects) { %>
              <% for (var t = 0; t < state.sections[i].subSubjects.length; t++) { %>
                <label for=""><%= state.sections[i].subSubjects[t].subSubjectsName %></label>

              <% } %>
            <% } %>
          </fieldset>

        <% } %>

      </form> `,{state: formstate}
    );

    document.getElementById('formexample').innerHTML = template;
  }
}

module.exports = form;
