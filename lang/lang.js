var language_event = document.createEvent("HTMLEvents");
language_event.initEvent("langapply", false, false);
function applyLang()
{
  if(STRING)
  {
    document.dispatchEvent(language_event);
    for(var section in STRING)
    {
      var key = Object.keys(STRING[section]);
      key.forEach(function(value)
      {
        $("." + value).html(STRING[section][value]);
      });
    }
  }
}
document.addEventListener("langapply", function(e)
{
  console.log("Language applyed for page: " + TITLE[document.title]);
}, false);
$(document).ready(applyLang);
