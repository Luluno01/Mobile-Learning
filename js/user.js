var userstate = new Userstate();

function updateUserview()
{
  if(userstate.logged_in)
  {
    $("#user-view > a:nth-child(2)").html("<img class='circle' src='img/default_user.png'></img>");
    $("#user-view > a:nth-child(3) > span").removeClass("USER_NAME_GUEST");
    $("#user-view > a:nth-child(3) > span").html(userstate.username);
    $("#user-view > a:nth-child(4) > span").removeClass("BLANK");
    $("#user-view > a:nth-child(4) > span").html(userstate.useremail);
  }
  else
  {
    $("#user-view > a:nth-child(2)").html("<i class='fa fa-user-circle circle' style='font-size: 64px; color: #797979; background: #ffffff';></i>");
    $("#user-view > a:nth-child(3)").addClass("USER_NAME_GUEST");
    $("#user-view > a:nth-child(3)").html(STRING.USER_NAME_GUEST);
    $("#user-view > a:nth-child(4)").addClass("BLANK");
    $("#user-view > a:nth-child(4)").html(STRING.BLANK);
  }
}

function login()
{
  userstate.logged_in = true;
  userstate.username = "Admin";
  userstate.usermail = "admin@xmu.edu.cn";
  updateUserview();
  showFrame("mainfn-frame");
}
