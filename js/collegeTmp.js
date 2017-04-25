window.onload = function()
{
  window.parent.toggleLoad();
  window.parent.setTitle();
  if(window.parent != window) //In iframe
  {
    if(!window.parent.standby) window.parent.standby = 0;
    window.parent.standby++;
  }
};
