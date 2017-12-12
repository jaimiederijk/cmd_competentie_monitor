var htmlElements = {
  body: document.querySelector('body'),
	chapterTitles: document.querySelectorAll("h2"),
  content: document.querySelector('#content')
}

var app = {
  createContents : function () {

    var contents = document.createElement("ul");
    contents.setAttribute('class', "sticky");

    for (var i = 0; i < htmlElements.chapterTitles.length; i++) {
      var listItem = document.createElement("li");
      var link = document.createElement("a");

      var text = document.createTextNode(htmlElements.chapterTitles[i].innerHTML);

      link.appendChild(text);

      link.setAttribute('href', "#" + htmlElements.chapterTitles[i].getAttribute('id') );

      listItem.appendChild(link);

      contents.appendChild(listItem);
    }

    htmlElements.content.appendChild(contents);
  }
}

app.createContents();
