package beans;

import java.io.Serializable;

public class TableRow implements Serializable {
    public float x;
    public float y;
    public float r;
    public boolean res;

    public TableRow(float x, float y, float r, boolean res){
        this.x = x;
        this.y = y;
        this.r = r;
        this.res = res;
    }

    public String toXML(boolean includeHeader){
        String str = "";
        if (includeHeader)
            str+= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        str+= "<TABLE_ROW>\n";
        str+= "\t<X>"+x+"</X>\n";
        str+= "\t<Y>"+y+"</Y>\n";
        str+= "\t<R>"+r+"</R>\n";
        str+= "\t<RES>"+res+"</RES>\n";
        str+= "</TABLE_ROW>\n";
        return str;
    }

    public String toXML(){
        return toXML(false);
    }

}