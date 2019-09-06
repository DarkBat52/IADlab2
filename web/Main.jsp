<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="beans.TableRow" %>
<%@ page import="beans.DataControl" %>
<%@ page import="beans.TableData" %>

<!DOCTYPE html>
<html lang="ru">
<head>
    <link rel="stylesheet" href="stylesheet.css">
    <meta charset="UTF-8">
    <title>Laboratory work 2</title>
    <script src="validator.js"></script>
    <title>Title</title>
</head>

<body>
<table align="center" id = "mainTable">
    <tr>
        <th cosplan = 1 class="section" >
            Черезов Игорь Юрьевич, P3200, вариант 78135
        </th>
    </tr>
    <tr>
        <th width = "50%" id="header2"> Координатная плоскость </th>
    </tr>
    <tr>
        <td align = "center">
            <canvas id = myCanvas width = "400" height = "400">
                Your browser doesn't support this element
            </canvas>
            <script src="canvas.js"></script>
        </td>
    </tr>
    <tr>
        <td align = "center" class="section">
            Введите следующие значения
        </td>
    </tr>
    <tr>
        <td>
           <form id="mainForm" method = "GET"  onsubmit="return CheckData()" action="controllerservlet" target="_self">
                <table>

                    <tr colspan="1">
                        <td align="center">
                            Введите X:
                        </td>

                        <td>
                            <input  type="text" name="X" id="X" placeholder="-5 ... 5" required maxlength="6">
                        </td>

                    </tr>
                    <tr>
                        <td align="center" class = "chooser">
                            Выберите Y:
                        </td>
                        <td class = "chooser">
                            <input type="radio" name="Y" value="-3" id="mY3" onchange="YChanged()"> -3<br>
                            <input type="radio" name="Y" value="-2" id="mY2" onchange="YChanged()"> -2<br>
                            <input type="radio" name="Y" value="-1" id="mY1" onchange="YChanged()"> -1<br>
                            <input type="radio" name="Y" value="0" id="Y0" onchange="YChanged()" checked> 0<br>
                            <input type="radio" name="Y" value="1" id="Y1" onchange="YChanged()"> 1<br>
                            <input type="radio" name="Y" value="2" id="Y2" onchange="YChanged()"> 2<br>
                            <input type="radio" name="Y" value="3" id="Y3" onchange="YChanged()"> 3<br>
                            <input type="radio" name="Y" value="4" id="Y4" onchange="YChanged()"> 4<br>
                            <input type="radio" name="Y" value="5" id="Y5" onchange="YChanged()"> 5<br>

                            <input type="hidden" name="Yh" id="Yhidden">
                        </td>

                    </tr>
                    <tr align="center">
                        <td></td>
                        <td id="xValid" class="errormsg"></td>

                    </tr>
                    <tr>
                        <td align="center" class="chooser">
                            Выберите R:
                        </td>
                        <td class="chooser">

                            <label class="container">
                                <span class="checkmark"> </span>
                                <input type="checkbox" name="R1" value="1" id="R1" onchange="Rchanged()">
                                1.0
                                <br>
                            </label>
                            <input type="checkbox" name="R1_5" value="1.5" id="R1_5" onchange="Rchanged()"> 1.5<br>
                            <input type="checkbox" name="R2" value="2" id="R2" onchange="Rchanged()"> 2.0<br>
                            <input type="checkbox" name="R2_5" value="2.5" id="R2_5" onchange="Rchanged()"> 2.5<br>
                            <input type="checkbox" name="R3" value="3" id="R3" onchange="Rchanged()"> 3.0<br>
                            <input type="hidden" id="R" name="R">
                        </td>

                    </tr>
                    <tr>
                        <td></td >
                        <td id="rValid" class="errormsg"></td>
                    </tr>
                </table>
    <tr>
        <td align="center">
            <input type="hidden" id="req" name="req" value="check">
            <input type="submit" value="Проверить">
        </td>
    </tr>


    </form>
    </td>
    </tr>

    <script src="AJAX.js"></script>
    <script>
        getPlane();
    </script>

    <tr>
        <td>
            <table id="resTable">

                <tr class="TableHeader" cosplan="4" id="header3">
                    <td>
                        X
                    </td>
                    <td>
                        Y
                    </td>
                    <td>
                        R
                    </td>
                    <td>
                        Res
                    </td>

                </tr>
                <!— Table Data-->

                <tbody id="TD">
                <%DataControl dc = new DataControl(getServletConfig().getServletContext(), request.getSession());
                    TableData tableData = (TableData)dc.getAttribute("tableData");
                %>
                <%  if (tableData != null)
                    for(TableRow tr: tableData.getData()){%>
                <tr class="Row"><td><%=tr.x%></td><td><%=tr.y%></td><td><%=tr.r%></td><td><%=tr.res%></td></tr>
                <%}%>

                </tbody>

                <!--<?php

                                if(isset($_COOKIE["TableData"])) {
                                    $index = 0;
                                    $line = $_COOKIE["TableData"];
                                    function nextStr(){
                                        global $line;
                                        global $index;
                                        $res = "";
                                        do {
                                            if (strlen($line)>$index)
                $ch = $line[$index++];
                else $ch = ' ';
                if ($ch != " ")
                $res = $res.$ch;

                } while ($ch != ' ');
                return $res;
                }

                $s=nextStr();

                while($s!="" && $s!=" "){
                echo '<tr class="line">';
                for ($i=0;$i<4;$i++){
                echo '<td>'.$s.'</td>';
                $s=nextStr();
                }
                echo '</tr>';
                }
                }

                ?>-->
            </table>

        </td>
    </tr>
    <tr> <td>

    </td>
    </tr>
</table>
</body>
</html>