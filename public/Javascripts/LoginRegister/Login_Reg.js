function openPage(evt , optionName)
{
    var i;
    var tabcontent;
    var tablinks;
    var modal = document.getElementById('id01');

    if (optionName == 'Close') {
        modal.style.display = "none";

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    else
    {
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }

        document.getElementById(optionName).style.display = "block";
        evt.currentTarget.className += "active";
    }
  
    

    
}