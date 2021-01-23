window.addEventListener("scroll",()=>{
  window.scrollTo(0,0)
})
window.addEventListener('appinstalled', (e) => {
  $.notify("Sucessfully installed!!!","Success")
});
$(document).ready(() => {
  var html = localStorage.getItem("html") ? localStorage.getItem("html") : localStorage.setItem("html",``)
  var css = localStorage.getItem("css") ? localStorage.getItem("css") : localStorage.setItem("css",``)
  var js = localStorage.getItem("js") ? localStorage.getItem("js") : localStorage.setItem("js",``)
  var AutoCompletationMode = localStorage.getItem("autocomplete") ||localStorage.setItem("autocomplete","true")
  var isBabel = localStorage.getItem("isBabel") || localStorage.setItem("isBabel","type='module'")
  var useSass = localStorage.getItem("useSass") || localStorage.setItem("useSass",``)
  var useBabel = localStorage.getItem("useBabel") ?localStorage.getItem("useBabel") : localStorage.setItem("useBabel",``)
  var useAngular = localStorage.getItem("useangular") ?localStorage.getItem("useangular") : localStorage.setItem("useangular",``)
  $("#info").sortable()
  $("#settingsDialog").dialog({
      autoOpen: false,
      minWidth:window.innerWidth/1.5,
      minHeight: window.innerHeight/2,
      width: window.innerWidth/1.5,
      modal: true,
      height: window.innerHeight/2,
      show: {
        effect: "shake",
        duration: 700
      },
      hide: {
        effect: "blind",
        duration: 100
      }
    })
  $("#settingsMenu").click(()=>{
    $("#settingsDialog").dialog("open")
  })
  $("#header").sortable()
  keyboardJS.bind("ctrl +r",(e)=>{
    e.preventDefault()
  })
  keyboardJS.bind("ctrl + shift +f",(e)=>{
    format()
  })
  keyboardJS.bind("shift + alt + f",(e)=>{
    format()
  })
  keyboardJS.bind("alt + f",(e)=>{
    e.preventDefault()
    format()
  })
  keyboardJS.bind("ctrl + s", (e) => {
    e.preventDefault()
    localStorage.setItem("html", editorh.getValue())
    localStorage.setItem("css", editorc.getValue())
    localStorage.setItem("js", editorj.getValue())
    $.notify("Successfully saved", "success");
  })
  $("#editorj").hide()
  $("#editorc").hide()
  ace.require("ace/ext/language_tools");
  let editorh = ace.edit("editorh")
  editorh.session.setMode("ace/mode/html")
  editorh.setTheme("ace/theme/twilight")
  let editorc = ace.edit("editorc")
  editorc.session.setMode("ace/mode/css")
  editorc.setTheme("ace/theme/twilight")
  let editorj = ace.edit("editorj")
  editorj.session.setMode("ace/mode/javascript")
  editorj.setTheme("ace/theme/twilight")
  $("#autoCompletation").click(()=>{
    $("#autoCompletation").toggleClass("red")
    if(localStorage.getItem("autocomplete") == "false"){
      $.notify("Enabled autoCompletation","success")
      localStorage.setItem("autocomplete","true")
      $("#autoCompletation").addClass("green")
      editorh.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editorj.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editorc.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
    }else if(localStorage.getItem("autocomplete") == "true"){
      $.notify("Disabled autoCompletation","error")
      localStorage.setItem("autocomplete","false")
      $("#autoCompletation").addClass("red")
      editorh.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
      editorj.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
      editorc.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
    }else{
      $.notify("Disabled autoCompletation","error")
      localStorage.setItem("autocomplete","false")
      $("#autoCompletation").addClass("red")
      editorh.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
      editorj.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
      editorc.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
    }
  })
  if(localStorage.getItem("autocomplete") != undefined){
    if(localStorage.getItem("autocomplete") == "true" || localStorage.getItem("autocomplete") == undefined){
     localStorage.setItem("autocomplete","true")
      $("#autoCompletation").addClass("green")
      editorh.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editorj.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editorc.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
    }else if(localStorage.getItem("autocomplete") == "false"){
      localStorage.setItem("autocomplete","false")
      $("#autoCompletation").css("background","red")
      editorh.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
      editorj.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
      editorc.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
      });
  }
  }else{
    $("#autoCompletation").css("background","green")
      editorh.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editorj.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
      editorc.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
  }
  editorh.setReadOnly(false)
  editorc.setReadOnly(false)
  editorj.setReadOnly(false)
  editorh.focus()
  let mode = "html"
  if (localStorage.getItem("html").trim() != "" || localStorage.getItem("html") != undefined) {
    editorh.setValue(localStorage.getItem("html"), -1)
  }
  if (localStorage.getItem("css").trim() != "" || localStorage.getItem("css") != undefined) {
    editorc.setValue(localStorage.getItem("css"), -1)
  }
  if (localStorage.getItem("js").trim() != "" || localStorage.getItem("js") != undefined) {
    editorj.setValue(localStorage.getItem("js"), -1)
  }
  var html = localStorage.getItem("html") ? localStorage.getItem("html") : localStorage.setItem("html", "")
  var css = localStorage.getItem("css") ? localStorage.getItem("css") : localStorage.setItem("css", "")
  var js = localStorage.getItem("js") ? localStorage.getItem("js") : localStorage.setItem("js", "")
  $("#html").click(() => {
    mode = "html"
    $("#editorh").show()
    $("#editorj").hide()
    $("#editorc").hide()
    editorh.setValue(localStorage.getItem("html"), -1)
    editorh.focus()
  })
  $("#css").click(() => {
    mode = "css"
    $("#editorc").show()
    $("#editorh").hide()
    $("#editorj").hide()
    editorc.setValue(localStorage.getItem("css"), -1)
    editorc.focus()
  })
  $("#js").click(() => {
    mode = "js"
    $("#editorc").hide()
    $("#editorh").hide()
    $("#editorj").show()
    editorj.setValue(localStorage.getItem("js"), -1)
    editorj.focus()
  })
  //FORMATTING CODE
  function format(){
    if(mode = "html"){
      let codetf = html_beautify(editorh.getValue())
      editorh.setValue(codetf,-1)
    }else if(mode = "css"){
      let codetf = css_beautify(editorc.getValue())
      editorc.setValue(codetf,-1)
    }else if(mode = "js"){
      let codetf = js_beautify(editorj.getValue())
      editorj.setValue(codetf,-1)
    }else{
      $.notify("Unknown Error : No file is opened..","error")
    }
    $.notify("formatted","success")
  }
  //Saving system
  setInterval(() => {
    localStorage.setItem("html", editorh.getValue())
    localStorage.setItem("css", editorc.getValue())
    localStorage.setItem("js", editorj.getValue())

  }, 1)
  let runButton = document.createElement("button")
  runButton.className = "material-icons btn right grey darken-2 waves-effect"
  runButton.innerText = "play_arrow"
  runButton.onclick = ()=>{
    window.open("https://cedi.cret.repl.co/run")
  }
  runButton.title = "Run this project"
  $("#info").append(runButton)
  let formatButton = document.createElement("button")
  formatButton.className = "material-icons btn right grey darken-1 waves-effect"
  formatButton.innerText = "line_style"
  formatButton.onclick = ()=>{
    format()
  }
  formatButton.title = "format The active file"
  $("#info").append(formatButton)
  let buildButton = document.createElement("button")
  buildButton.className = "material-icons btn right grey darken-1 waves-effect"
  buildButton.title = "Export or download as html or others"
  buildButton.innerText = "build"
  buildButton.onclick = ()=>{
    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.txt");
  }
  $("#info").sortable()
  $("#info").append(buildButton)
  if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
  $("#useSass").click(()=>{
    if(localStorage.getItem("useSass") == ""){
    $("#css").text("style.sass [SASS Preprocessor]")
    localStorage.setItem("useSass",`<script src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.9.12/sass.sync.min.js" ansyc defer crossorigin='anonymous'></script>`)
    editorc.session.setMode("ace/mode/sass")
    $.notify("Installed SASS sucessfully","success")
    }else if(localStorage.getItem("useSass") == `<script ansyc crossorigin defer src="https://cdn.jsdelivr.net/npm/less@3.9.0/dist/less.min.js" ></script>`){
      $("#css").text("style.sass [SASS Preprocessor]")
    localStorage.setItem("useSass",`<script src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.9.12/sass.sync.min.js" ansyc defer crossorigin='anonymous'></script>`)
    editorc.session.setMode("ace/mode/sass")
      $.notify("Uninstalled SASS Successfully!","error")
      $.notify("Installed Less sucessfully!","success")
    }else{
      $("#css").text("style.css")
      editorc.session.setMode("ace/mode/css")
      localStorage.setItem("useSass",``)
      $.notify("Uninstalled SASS","error")
    }
  })
  $("#useLess").click(()=>{
    if(localStorage.getItem("useSass") == ""){
    $("#css").text("style.less [Less Preprocessor]")
    localStorage.setItem("useSass",`<script ansyc crossorigin defer src="https://cdn.jsdelivr.net/npm/less@3.9.0/dist/less.min.js" ></script>`)
    editorc.session.setMode("ace/mode/less")
    $.notify("Installed Less sucessfully","success")
    }else if(localStorage.getItem("useSass") == `<script src="https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.9.12/sass.sync.min.js" ansyc defer crossorigin='anonymous'></script>`){
      $("#css").text("style.less [Less Preprocessor]")
      editorc.session.setMode("ace/mode/less")
      localStorage.setItem("useSass",`<script ansyc crossorigin defer src="https://cdn.jsdelivr.net/npm/less@3.9.0/dist/less.min.js" ></script>`)
      $.notify("Uninstalled SASS","error")
      $.notify("Installed Less sucessfully","success")
    }else{
      $("#css").text("style.css")
      localStorage.setItem("useSass",``)
      editorc.session.setMode("ace/mode/css")
      $.notify("UnInstalled Less sucessfully","error")
    }
  })
  if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
  $("#useBabel").on("click",()=>{
      if(localStorage.getItem("isBabel") == undefined || localStorage.getItem("isBabel") == "type='module'"){
      $("#js").text("main.jsx [React]")
      localStorage.setItem("useBabel",`<script defer crossorigin="anonymous" src="https://unpkg.com/react@17/umd/react.production.min.js" ansyc></script>
    <script ansyc crossorigin="anonymous" defer src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js" defer ansyc></script>`)
    localStorage.setItem("isBabel","type='text/jsx'")
    editorj.session.setMode("ace/mode/jsx")
    $.notify("React Installed and enabled","success")
      }else if(localStorage.getItem("isBabel") == "type='text/javascript'"){
      $("#js").text("main.jsx [React]")
      $("#html").text("index.html")
      $("#css").text("style.css")
      localStorage.setItem("useBabel",`<script defer crossorigin="anonymous" src="https://unpkg.com/react@17/umd/react.production.min.js" ansyc></script>
    <script ansyc crossorigin="anonymous" defer src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js" defer ansyc></script>`)
    localStorage.setItem("isBabel","type='text/jsx'")
    editorj.session.setMode("ace/mode/jsx")
    $.notify("React Installed and enabled","success")
    if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
    }else if(localStorage.getItem("isBabel") == "type='text/javascript'"){
      $("#js").text("main.jsx [React]")
      $("#html").text("index.html")
      $("#css").text("style.css")
      localStorage.setItem("useBabel",`<script defer crossorigin="anonymous" src="https://unpkg.com/react@17/umd/react.production.min.js" ansyc></script>
    <script ansyc crossorigin="anonymous" defer src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js" defer ansyc></script>`)
    localStorage.setItem("isBabel","type='text/jsx'")
    editorj.session.setMode("ace/mode/jsx")
    $.notify("React Installed and enabled","success")
    $.notify("Uninstalled Angular while installing React","error")
    
        }else{
        $("#js").text("main.js")
        localStorage.setItem("isBabel","type='module'")
        localStorage.setItem("useBabel",``)
        editorj.session.setMode("ace/mode/javascript")
        $.notify("React Uninstalled Sucessfully","error")
        if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
      }
    })
    if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
    if(localStorage.getItem("isBabel") == "type='module'"){
      $("#js").text("main.js")
      $("#css").text("style.css")
      $("#html").text("index.html")
      
      if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
    }else if(localStorage.getItem("isBabel") == "type='text/jsx'"){
      $("#js").text("main.jsx [ReactJS]")
      editorj.session.setMode("ace/mode/jsx")
      $("#css").text("style.css")
      $("#html").text("index.html")
      if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
    }else if(localStorage.getItem("isBabel") == "type='text/javascript'"){
      $("#js").text("main.component.js [AngularJS]")
      if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
    }
    $("#useAngular").click(()=>{
      if(localStorage.getItem("isBabel") == "type='module'"){
        $("#js").text("main.component.js [AngularJS]")
        localStorage.setItem("useBabel",`<script src="https://unpkg.com/@babel/standalone/babel.min.js" defer ansyc></script><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js" crossorigin='anonymous' ansyc defer></script>`)
        localStorage.setItem("isBabel","type='text/javascript'")
        $.notify("Installed AngularJS Sucessfully","success")
        if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
      }else if(localStorage.getItem("isBabel") == "type='text/jsx'"){
        $("#js").text("main.component.js [AngularJS]")
        localStorage.setItem("useBabel",`<script src="https://unpkg.com/@babel/standalone/babel.min.js" defer ansyc></script><script crossorigin='anonymous' src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js" ansyc defer></script>`)
        localStorage.setItem("isBabel","type='text/javascript'")
        $.notify("Installed AngularJS Sucessfully","success")
        $.notify("React Uninstalled Sucessfully","error")
        if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
      }else{
        $("#js").text("main.js")
        $("#css").text("style.css")
        $("#html").text("index.html")
        localStorage.setItem("useBabel",``)
        localStorage.setItem("isBabel","type='module'")
        $.notify("Uninstalled AngularJS","error")
        if(localStorage.getItem("useSass") !=""){
    $("#css").text("style.sass [SASS Preprocessor]")
  }
      }
    })
})
function preventBehavior(e) {
  e.preventDefault();
};
document.addEventListener("touchmove", preventBehavior, { passive: false });
window.oncontextmenu = (e) => e.preventDefault()
let show = 'block'
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = showw;

  addBtn.addEventListener('click', (e) => {
    addBtn.style.display = 'none';
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
setTimeout(()=>{
  show = 'none'
  addBtn.style.display = "none"
},1500)