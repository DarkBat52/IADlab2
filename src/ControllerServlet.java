import beans.DataControl;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet{

    RequestDispatcher rd = null;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        DataControl dc = new DataControl(config.getServletContext(), "context");
        dc.setAttribute("cp", new CoordPlane(-1,-1,0.5,2,1,0.5));
    }


    @Override
    //Handle Post request
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }

    @Override
    //Handle Get requests
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String r = req.getParameter("req");
        if (r == null) r = "";
        if (r.equals("check") || r.equals("async_check")) rd =  req.getRequestDispatcher("/areacheck");
        else if (r.equals("get_data") || r.equals("get_plane")) rd = req.getRequestDispatcher("/retrieve_data");
        else rd = req.getRequestDispatcher("/Main");
        rd.forward(req,resp);
    }
}
