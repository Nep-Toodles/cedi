$(window).ready(()=>{
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
  let mode = "html"
  if(localStorage.getItem("html").trim != "" || localStorage.getItem("html") != undefined){
    editorh.setValue(localStorage.getItem("html"),-1)
  }
  if(localStorage.getItem("css").trim != "" || localStorage.getItem("css") != undefined){
    editorc.setValue(localStorage.getItem("css"),-1)
  }
  if(localStorage.getItem("js").trim != "" || localStorage.getItem("js") != undefined){
    editorj.setValue(localStorage.getItem("js"),-1)
  }
  var html = localStorage.getItem("html") ? localStorage.getItem("html") :localStorage.setItem("html","")
  var css = localStorage.getItem("css") ? localStorage.getItem("css") :localStorage.setItem("css","")
  var js = localStorage.getItem("js") ? localStorage.getItem("js") :localStorage.setItem("js","")
  $("#html").click(()=>{
    mode = "html"
    $("#editorh").show()
    $("#editorj").hide()
    $("#editorc").hide()
    editorh.setValue(localStorage.getItem("html"),-1)
  })
  $("#css").click(()=>{
    mode = "css"
    $("#editorc").show()
    $("#editorh").hide()
    $("#editorj").hide()
    editorc.setValue(localStorage.getItem("css"),-1)
  })
  $("#js").click(()=>{
    mode = "js"
    $("#editorc").hide()
    $("#editorh").hide()
    $("#editorj").show()
    editorh.setValue(localStorage.getItem("js"),-1)
  })
  //Saving system
  setInterval(()=>{
    localStorage.setItem("html",editorh.getValue())
    localStorage.setItem("css",editorc.getValue())
    localStorage.setItem("js",editorj.getValue())
    $("#info").html(`
    <span class='red-text'>Mode : `+mode+`</span>  | Event :`+document.activeElement.tagName+`|Total length : `+editorc.getValue().trim().length+editorh.getValue().trim().length+editorj.getValue().trim().length+` | <button onclick="window.open('https://cedi.cret.repl.co/run')" class="btn grey darken-2 btn-plain waves-effect waves-light right"><i class='material-icons'>play_circle_filled</i></button>
    `)
    },1)
})
function preventBehavior(e) {
    e.preventDefault(); 
};
document.addEventListener("touchmove", preventBehavior, {passive: false});
window.oncontextmenu = (e)=>e.preventDefault()