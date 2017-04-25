// Initialize collapse button
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();

document.title = TITLE.TITLE_LOGIN;
$("#title-bar").html(TITLE.TITLE_LOGIN);

var standby = 0;

var frame_event = document.createEvent("HTMLEvents");
frame_event.initEvent("framechange", false, false);

var current_frame;

var mainfn_frame =
{}

var fcnt = $("#frames").children().length;

window.onload = function()
{
  // toggleLoad();
  console.log("Total frames: " + fcnt);
  showFrame(0);
  updateUserview();
};

function toggleLoad(desc, speed)
{
  if($("#preloader").is(":hidden"))
  {
    $("#preloader > p").html(STRING.STRING1.LOADING_TIP_DEFAULT || desc);
    $("#preloader").fadeIn(speed || 500);
  }
  else
  {
    $("#preloader").fadeOut(speed || 500);
  }
}

function toggleAnim(selector, anim, callback) { //Not my code
    $(selector).removeClass(anim).addClass(anim).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass(anim);
    });
    if(typeof callback == "function")
    {
      callback();
    }
};

function initFrame()
{

}

function nextFrame()
{
  if(fcnt - current_frame == 1) return current_frame; //Last frame
  // $($("#frames").children()[current_frame]).fadeOut(300);
  // $($("#frames").children()[++current_frame]).fadeIn(300);
  $($("#frames").children()[++current_frame]).fadeIn(20);
  toggleAnim($("#frames").children()[current_frame], "frameIn", function(){$($("#frames").children()[current_frame - 1]).fadeOut(300);});
  setTitle();
  if(window.frames[current_frame].onShown) window.frames[current_frame].onShown(current_frame - 1);
  document.dispatchEvent(frame_event);
  return current_frame;
}

function showFrame(frm)
{
  var from = current_frame;

  if(typeof frm == "undefined" || frm == null) return -1;
  if(typeof frm == "number" && frm < fcnt)
  {
    if(frm == current_frame) return current_frame;
    $($("#frames").children()[frm]).fadeIn(20);
    toggleAnim($("#frames").children()[frm], "frameIn", function(){$($("#frames").children()[current_frame]).fadeOut(300);});
    // for(var i=0; i<fcnt; i++)
    // {
    //   if(i != frm) $($("#frames").children()[i]).fadeOut(300);
    // }
    // $($("#frames").children()[frm]).fadeIn(300);
    if(window.frames[frm].onShown) window.frames[frm].onShown(from);
    document.dispatchEvent(frame_event);
    current_frame = frm;
    setTitle();
    return frm;
  }
  if(typeof frm == "string")
  {
    console.log("attempt to show frame with id: " + frm);
    if($("#" + frm).length == 0 || $("#" + frm).parent()[0].id != "frames") return -1;
    // for(var i=0; i<fcnt; i++)
    // {
    //   if($($("#frames").children()[i])[0].id != frm) $($("#frames").children()[i]).fadeOut(300);
    //   else current_frame = i;
    // }
    for(var i=0; i<fcnt; i++)
    {
      if($($("#frames").children()[i])[0].id == frm)
      {
        console.log("target frame found: " + i);
        console.log("current_frame: " + current_frame);
        if($($("#frames").children()[i])[0].id == $($("#frames").children()[current_frame])[0].id) return current_frame;
        $($("#frames").children()[i]).fadeIn(20);
        toggleAnim($("#frames").children()[i], "frameIn", function(){$($("#frames").children()[current_frame]).fadeOut(300); console.log("attempt to hide " + current_frame);});
        current_frame = i;
        break;
      }
    }
    setTitle();
    // $("#" + frm).fadeIn(20);
    if(window.frames[current_frame].onShown) window.frames[current_frame].onShown(from);
    document.dispatchEvent(frame_event);
    return frm;
  }
  return -1;
}

function hideAllFrame()
{
  for(var i=0; i<fcnt; i++)
  {
    $($("#frames").children()[i]).fadeOut(300);
    current_frame = -1;
  }
  setTitle();
  return i;
}

function setTitle(title)
{
  var _title = (current_frame != -1) ? (title || TITLE[window.frames[current_frame].document.title]) : "Rua";
  document.title = _title;
  $("#title-bar").html(_title);
}

function changeMainFnFrame(target_src, desc)
{
  if($("#mainfn-frame").prop("src") == target_src) return false;
  toggleLoad(desc || STRING.STRING1.DEFAULT);
  $("#mainfn-frame").prop("src", target_src);
  standby--;
}

// window.onload = function()
// {
//   for(var i=0; i<fcnt; i++)
//   {
//     $("#frames").children()[i].contentWindow.current_frame = current_frame;
//   }
// }
