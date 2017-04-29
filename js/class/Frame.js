class Frame
{
  constructor(frame_id)
  {
    this.frame_id = frame_id;
    this.default_src = "main.html";
  }

  show()
  {
    showFrame(this.frame_id);
  }

  getSrc()
  {
    return $(this.frame_id).prop("src");
  }

  showDefault()
  {
    changeMainFnFrame(this.default_src);
  }
}
