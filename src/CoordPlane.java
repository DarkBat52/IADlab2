public class CoordPlane {
    Shape rect;
    Shape circle;
    Shape triangle;

    public CoordPlane(double rectX, double rectY, double circleRad, int circleQ, double trA, double trB){
        rect = new Shape(rectX, rectY);
        circle = new Shape(circleRad,circleQ);
        triangle = new Shape(trA, trB);
    }

    public boolean isInQuarter(double x, double y, int q){
        switch (q){
            case 1:
                return x>=0 && y>=0;
            case 2:
                return x<=0 && y>=0;
            case 3:
                return x<=0 && y <=0;
            case 4:
                return x>=0 && y<=0;
        }
        return false;
    }

    public int getQuarter(double x, double y){
        if (x >= 0 && y >= 0) return 1;
        if (x <= 0 && y >= 0) return 2;
        if (x <= 0 && y <= 0) return 3;
        return 4;
    }

    public boolean isInCircle(double x, double y){
        return x*x + y*y <= circle.a*circle.a && isInQuarter(x, y, (int) circle.b);
    }

    public boolean isInRectangle(double x, double y){
        return Math.abs(x) <= Math.abs(rect.a) && Math.abs(y) <= Math.abs(rect.b) && isInQuarter(x,y, getQuarter(rect.a, rect.b));
    }

    public boolean isInTriangle(double x, double y){
        //if b<0 then y should be >= -x*b/a + b, else y should be >= ...
        double mul = triangle.b<0?-1:1;
        return (y*mul <= (-x*triangle.b/triangle.a+triangle.b)*mul)&& isInQuarter(x,y, getQuarter(triangle.a/2,triangle.b/2));
    }

    public boolean isInArea(double x, double y, double r){
        return isInCircle(x/r,y/r) || isInRectangle(x/r,y/r) || isInTriangle(x/r,y/r);
    }

    public String toXML(){
        StringBuffer xml = new StringBuffer();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<PLANE>\n");
        xml.append("\t<RECTX>"+rect.a+"</RECTX>\n");
        xml.append("\t<RECTY>"+rect.b+"</RECTY>\n");
        xml.append("\t<CR>"+circle.a+"</CR>\n");
        xml.append("\t<CQ>"+(int)circle.b+"</CQ>\n");
        xml.append("\t<TRA>"+triangle.a+"</TRA>\n");
        xml.append("\t<TRB>"+triangle.b+"</TRB>\n");
        xml.append("</PLANE>\n");
        return xml.toString();
    }
}

//All shapes in the variants can be represented by 2 values
class Shape{
    double a;
    double b;

    Shape(double a, double b){
        this.a = a;
        this.b = b;
    }
}
