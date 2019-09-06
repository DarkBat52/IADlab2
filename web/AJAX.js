//asynchronous update for table and points on canvas
function reloadData(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","controllerservlet", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){

        if (this.status == 200 && this.readyState == 4 ){
            redrawPoints(xhr.responseXML);
        }
    };
    xhr.send("req=get_data&R="+document.getElementById("R").value);
}

function redrawPoints(xml){

    if (xml == null) return;
    RedrawCanvas();
    var tr = xml.getElementsByTagName("TABLE_ROW");
    for (var i = tr.length-1; i >=0; i--){
        drawPoint(tr[i].getElementsByTagName("X")[0].childNodes[0].nodeValue,
            tr[i].getElementsByTagName("Y")[0].childNodes[0].nodeValue,
            tr[i].getElementsByTagName("RES")[0].childNodes[0].nodeValue);
    }
}