var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if(xmlhttp.readyState == 4){
    alert(xmlhttp.readyState);
}};

alert('hello');
xmlhttp.open("GET","http://www.nieuwsblad.be/article/detail.aspx?articleid=DMF20120331_016",true);

