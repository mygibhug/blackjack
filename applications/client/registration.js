
function validate()
{
     var username = document.getElementById("userName").value;
     if (username.length < 5)
     {
          alert("Username needs to have 5 characters minimum")
          return false;
     }

     else
     {
          var email = document.getElementById("email").value;

          if (email.length < 10)
          {
               alert("Invalid Email Address");
               return false;
          }

          else
          {
               var password = document.getElementById("passWord").value;
               var password2 = document.getElementById("passWord2").value;
               var pResult = password.localeCompare(password2);

               if (pResult !== 0)
               {
                    alert("Check your passwords again");
                    return false;
               }

               else
               {
                    window.location = "Login.html"
                    return false;
               }
          }
     }
}
