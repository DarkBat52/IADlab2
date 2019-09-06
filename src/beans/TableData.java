package beans;

import java.io.Serializable;
import java.util.ArrayList;

public class TableData implements Serializable {
    ArrayList<TableRow> data = new ArrayList<TableRow>();

    public ArrayList<TableRow> getData(){
        return data;
    }

    public void setData(ArrayList<TableRow> data){
        this.data = data;
    }

    public String toXML(){
        StringBuilder str = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        str.append("<TABLEDATA>\n");
        for (TableRow tr: data)
            str.append(tr.toXML());
        str.append("</TABLEDATA>\n");
        return str.toString();
    }

}
