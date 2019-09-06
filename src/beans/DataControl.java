package beans;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;


/**
 * Encapsulates getting and setting attributes fromm session and context
 * to make it easier to switch from one to another to account for the
 * variative part of the lab work
 */
public class DataControl {
    private ServletContext ctx;
    private HttpSession session;


    public DataControl(ServletContext ctx, String Use){
        this.ctx = ctx;
        if (Use.equals("session"))
            ctx.setAttribute("use","session");
        else ctx.setAttribute("use","context");
    }



    public DataControl(ServletContext ctx, HttpSession session, String Use) {
        this.ctx = ctx;
        this.session = session;
        if (Use.equals("session"))
            ctx.setAttribute("use","session");
        else ctx.setAttribute("use","context");
    }

    public DataControl(ServletContext ctx, HttpSession session) {
        this.ctx = ctx;
        this.session = session;
    }

    public void setAttribute(String name, Object o){
        if ((session != null && ((String) ctx.getAttribute("use")).equals("session")) && !name.equals("cp")) session.setAttribute(name,o);
        else ctx.setAttribute(name, o);
    }
    public Object getAttribute(String name){
        if ((session != null && ((String) ctx.getAttribute("use")).equals("session")) && !name.equals("cp"))
            return session.getAttribute(name);
        else return ctx.getAttribute(name);
    }
}
