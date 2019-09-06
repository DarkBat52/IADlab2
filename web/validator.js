
var valid = true;

function CheckX(){
    var xValid = document.getElementById("xValid");
    var x = document.forms["mainForm"]["X"].value;
    valid = true;
    if (isNaN(x)||x<-5 || x>5){
        xValid.innerHTML = ("Incorrect input values");
        valid = false;

    }
    return valid;
}

function CheckY() {
    return true;
}

function CheckR(){
    valid = true;

    var R1 = document.getElementById("R1");
    var R1_5 = document.getElementById("R1_5");
    var R2 = document.getElementById("R2");
    var R2_5 = document.getElementById("R2_5");
    var R3 = document.getElementById("R3");
    

    var count = 0;

    if (R1.checked) count++;
    if (R1_5.checked) count++;
    if (R2.checked) count++;
    if (R2_5.checked) count++;
    if (R3.checked) count++;

    if (count == 0)  {
        valid = false;
        document.getElementById("rValid").innerHTML = ("Выберите хотя бы одно значение R");

    }

    return valid;
}
function CheckData(){
    return CheckY() && CheckX() && CheckR();
}

function YChanged(){
    document.getElementById("Yhidden").value = document.getElementsByName("Y").value;

}



function getR(){
    var R1 = document.getElementById("R1");
    var R1_5 = document.getElementById("R1_5");
    var R2 = document.getElementById("R2");
    var R2_5 = document.getElementById("R2_5");
    var R3 = document.getElementById("R3");

    if (R3.checked) return 3;
    else if (R2_5.checked) return 2.5;
    else if (R2.checked) return 2;
    else if (R1_5.checked) return 1.5;
    else if (R1.checked) return 1;
}

function Rchanged(){
    var R = document.getElementById("R");
    R.value = getR();
    if (!CheckR())  return;
    RedrawCanvas();
    reloadData();


}

