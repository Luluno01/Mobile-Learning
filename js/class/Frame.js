class Frame
{
  constructor(frame_id)
  {
    this.frame_id = frame_id;
    this.default_src = "main.html";
    this.frame_index = this.getFrameIndex();
  }

  getFrameIndex()
  {
    if(typeof this.frame_index == "undefined")
    {
      for(var i = 0; i < fcnt; i++)
      {
        if($("#frames").children()[i].id == this.frame_id)
        {
          return i;
        }
      }
      console.log("Error: Cannot find such iframe whose id is " + this.frame_id);
      console.log("fcnt: " + fcnt);
    }
    else
    {
      return this.frame_index;
    }
  }

  show()
  {
    showFrame(this.frame_index);
    return this;
  }

  getSrc()
  {
    return $(this.frame_id).attr("src");
  }

  showDefault()
  {
    if($("#mainfn-frame").attr("src") != this.default_src) // need loading
    {
      showLoad();
      var _this = this;
      setTimeout(function()
      {
        showFrame(_this.frame_index);
        _changeMainFnFrame(_this.default_src);
      }, 500);
    }
    else
    {
      showFrame(this.frame_index);
    }
    return this;
  }
}
