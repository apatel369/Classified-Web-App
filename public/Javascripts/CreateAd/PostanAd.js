function openPage(evt, Ads)
{
    var i, postaddcontent, tabs
    postaddcontent = document.getElementsByClassName("postadd-content");
    for (i = 0; i < postaddcontent.length; i++)
    {
        postaddcontent[i].style.display = "none";
    }
    tabs = document.getElementsByClassName("tabs");
    for (i = 0; i < tabs.length; i++)
    {
        tabs[i].className = tabs[i].className.replace("active", "");
    }
    document.getElementById(Ads).style.display = "block";
    evt.currentTarget.className += "active";
}
function ReviewClose()
{
    var modal = document.getElementById('Review');
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}