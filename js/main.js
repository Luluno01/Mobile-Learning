var level_page =
{
  highschool: "collegeTmp.html",
  college: "collegeTmp.html"
}

function levelSelect(level)
{
  window.parent.user_current_level = level;
  window.parent.changeMainFnFrame(level_page[level]);
  return level;
}

window.onload = function()
{
  if(window.parent != window) //In iframe
  {
    if(window.parent.indexFrameLoaded)
    {
      window.parent.hideLoad();
      window.parent.setTitle();
    }
    if(!window.parent.standby) window.parent.standby = 0;
    window.parent.standby++;
  }
};
