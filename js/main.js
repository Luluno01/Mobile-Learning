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
