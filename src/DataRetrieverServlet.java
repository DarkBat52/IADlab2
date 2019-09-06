import beans.DataControl;
import beans.TableData;
import beans.TableRow;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class DataRetrieverServlet extends HttpServlet {

    @Override
    //Handle POST request
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }

    @Override
    //Handle GET requests
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        resp.setContentType("application/xml");

        if (req.getParameter("req").equals("get_data")) {

            DataControl dc = new DataControl(getServletContext(), req.getSession());
            if (dc.getAttribute("tableData") == null) return;
            TableData toPrint = (TableData) dc.getAttribute("tableData");
//*
            if (req.getParameter("R") != null){
                float R = Float.parseFloat(req.getParameter("R"));
                TableData res = new TableData();
                for (TableRow tr: toPrint.getData()){
                    res.getData().add(new TableRow(tr.x,tr.y,R,((CoordPlane)dc.getAttribute("cp")).isInArea(tr.x,tr.y,R)));
                }
                //writer.println(res.toXML());
                toPrint = res;
            }
//*/
            writer.println(toPrint.toXML());

        } else if (req.getParameter("req").equals("get_plane")){
            writer.println(((CoordPlane)new DataControl(getServletContext(),req.getSession()).getAttribute("cp")).toXML());
        }

    }
}
