// using namespace Ml;
var Ml = {};

var fcnt;
var indexFrameLoaded = false;

$(document).ready(function()
{
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  fcnt = $("#frames").children().length;
  // Ml.toast = (window.NativeInterface && NativeInterface.toast) || Materialize.toast;
  if(window.NativeInterface)
  {
    $("#splash").hide(); // Use Android app splash
    // Java bridge method can't be invoked on a non-injected object
    Ml.toast = function(content)
    {
      NativeInterface.toast(content);
    };
    Ml.toastLong = function(content)
    {
      NativeInterface.toastLong(content);
    };
    Ml.exit = function()
    {
      NativeInterface.exit();
    }
  }
  else
  {
    $(".EXIT").remove(); // Remove useless button when in normal browser
    Ml.toast = function(content)
    {
      Materialize.toast(content, 2000);
    };
    Ml.toastLong = function(content)
    {
      Materialize.toast(content, 3500);
    };
  }

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  $("#slide-out a").bind("click", function()
  {
    $('.button-collapse').sideNav('hide');
  });
});

document.title = TITLE.TITLE_LOGIN;
$("#title-bar").html(TITLE.TITLE_LOGIN);

var standby = 0;

var frame_event = document.createEvent("HTMLEvents");
frame_event.initEvent("framechange", false, false);

var current_frame;

var mainfn_frame =
{};

window.onload = function()
{
  // toggleLoad();
  indexFrameLoaded = true;
  console.log("Total frames: " + fcnt);
  showFrame(0);
  updateUserview();
  $("#splash").fadeOut(500);
  setTimeout(function()
  {
    $("#splash").remove();
  }, 500);
};

function isSideNavOpened()
{
  return $("#sidenav-overlay").length == 1;
}

function toggleSideNav()
{
  if($("#slide-out").attr("style").indexOf("transform: translateX(0px);") != -1) // Side nav opened
  {
    $('.button-collapse').sideNav('hide');
  }
  else if(!isSideNavOpened())
  {
    $('.button-collapse').sideNav('show');
  }
}

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

function hideLoad(speed)
{
  if($("#preloader").is(":hidden"))
  {
    return false;
  }
  else
  {
    $("#preloader").fadeOut(speed || 500);
    return true;
  }
}

function showLoad(desc, speed)
{
  if($("#preloader").is(":hidden"))
  {
    $("#preloader > p").html(STRING.STRING1.LOADING_TIP_DEFAULT || desc);
    $("#preloader").fadeIn(speed || 500);
    return true;
  }
  else
  {
    return false;
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
    console.log("Attmpt to show frame with index: " + frm);
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
  if(typeof current_frame == "undefined")
  {
    console.log("Error: Cannot set title at this time. (current_frame is undefined)");
    return false;
  }
  var _title = (current_frame != -1) ? (title || TITLE[window.frames[current_frame].document.title]) : "Rua";
  document.title = _title;
  $("#title-bar").html(_title);
}

function changeMainFnFrame(target_src, desc)
{
  if($("#mainfn-frame").attr("src") == target_src) return false;
  toggleLoad(desc || STRING.STRING1.DEFAULT);
  setTimeout('$("#mainfn-frame").attr("src", "' + target_src + '");', 500);
  standby--;
  console.log("Main Function Frame has been navigated to " + target_src);
  return true;
}

function _changeMainFnFrame(target_src)
{
  if($("#mainfn-frame").attr("src") == target_src) return false;
  $("#mainfn-frame").attr("src", target_src);
  console.log("Main Function Frame has been navigated to " + target_src);
  return true;
}

// window.onload = function()
// {
//   for(var i=0; i<fcnt; i++)
//   {
//     $("#frames").children()[i].contentWindow.current_frame = current_frame;
//   }
// }
