import beans.DataControl;
import beans.TableData;
import beans.TableRow;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AreaCheckServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        if (req.getParameter("X") == null || req.getParameter("Y") == null ||
                req.getParameter("R") == null) return;
        //Get form data
        float x = Float.parseFloat(req.getParameter("X"));
        float y = Float.parseFloat(req.getParameter("Y"));
        float r = Float.parseFloat(req.getParameter("R"));

        String reqType = req.getParameter("req");
        boolean async;
        async = reqType.equals("async_check");

        DataControl dc = new DataControl(getServletContext(), req.getSession());

        //Compute result
        boolean res = ((CoordPlane)dc.getAttribute("cp")).isInArea(x,y,r);

        TableRow tr = new TableRow(x, y, r, res);
        TableData td;
        //Get servlet context


        //If bean doesn't exist, create empty one
        if((td = (TableData) dc.getAttribute("tableData")) == null)
            td = new TableData();

        td.getData().add(0,tr);
        dc.setAttribute("tableData", td);

        resp.setContentType("text/html; charset=UTF-8");

        PrintWriter writer = resp.getWriter();

        if(async) {
            resp.setContentType("application/xml");
            writer.println(tr.toXML(true));
        }
        else{


            writer = resp.getWriter();
            writer.println("<html lang=\"ru\">");
            writer.println("<head><title>Response</title> <link rel=\"stylesheet\" href=\"stylesheet.css\"> </head>");
            writer.println("<body>");
            writer.println("<header class=\"section\">Черезов Игорь Юрьевич P3200 вариант 78135</header><br>");

            //Display table
            writer.println("<div class=\"section first\"> <table><tr class=\"TableHeading\"><td>Атрибут</td><td>Значение</td></tr>");
            writer.println("<tr><td>X</td><td>" + x + "</td></tr>");
            writer.println("<tr><td>Y</td><td>" + y + "</td></tr>");
            writer.println("<tr><td>R</td><td>" + r + "</td></tr>");

            writer.println("</table></div>");


            //Display result
            writer.println("<div class=\"section cursive\">Result: " + res + "</div>");

            //Display link back
            writer.println("<div class=\"section\"> <a href=\"Main#TH\"> Вернуться назад</a> </div>");
            writer.println("</body>");
            writer.println("</html>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
