/*
called by index.html
*/

$(document).ready(function()
{
  if(!Ml)
  {
    console.log("Fatal Error: No such object 'Ml'.");
  }
  else
  {
    Ml.frame = (function()
    {
      var frame = {};
      $("#frames").children().each(function(index, obj)
      {
        frame[obj.id] = new Frame(obj.id);
      });

      return frame;
    })();
  }
});
