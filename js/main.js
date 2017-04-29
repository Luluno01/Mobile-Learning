var level_page =
{
  highschool: "collegeTmp.html",
  college: "collegeTmp.html"
}

function levelSelect(level)
{
  if(window.parent.userstate.logged_in)
  {
    window.parent.user_current_level = level;
    window.parent.changeMainFnFrame(level_page[level]);
    return level;
  }
  else
  {
    console.log("Permission Denied: Require login.");
    window.parent.Ml.toast(STRING.TIPS.TIPS_LOGIN_FIRST);
    return false;
  }
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
