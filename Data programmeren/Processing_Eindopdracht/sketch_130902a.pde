// Constants
int Y_AXIS = 1;
int X_AXIS = 2;
color b1, b2, c1, c2;

PImage bg;
void setup(){
  
  
  int width = 650;
  int height = 560;
  size(width, height);
  bg = loadImage("bg.jpg");
  }
  void draw() {
  background(bg);
   float[] list2;
  String lines[] = loadStrings("http://www.databeleving.nl/processing/knmi.txt");
  loadTitle("Minimum en maximum temperaturen in augustus 2013 (Eindhoven)");
  int gemiddeldeLeeftijd = 0;

  for (int i = 12; i < lines.length; i++) {
   float[] list = float(split(lines[i], ','));
    strokeWeight(10);
    strokeCap(SQUARE);
    c1 = color(255, 0, 0);
    c2 = color(0, 102, 153);
    setGradient(int(list[2])+50, ((15*i)-(50*2)), int(list[3]), (5), c2, c1, X_AXIS);
    thinLines(int(list[2])+50,((15*i)-(49*2)), int(list[3]));
  }
  for (int i = 12; i < lines.length; i++) {
   String[] list = split(lines[i], ',');
    char letter = list[1].charAt(6);
    char letter2 = list[1].charAt(7);
    loadDates(letter, 30, ((15*i)-(45*2)), "");
    loadDates(letter2, 40, ((15*i)-(45*2)), "");
    
  }
 
}
  void thinLines(int x, int y, int w) {
    stroke(153);
    strokeWeight(1);
    println(w);
     line(100, y, x-5, y);
  }
  
  void loadDates(char datum, int x, int y, String woord) {
    PFont font;
    font = loadFont("Lato-Black-48.vlw");
    textFont(font, 20);
    fill(0, 91, 153, 100);
    text(datum + woord, x, y);
  }
  void loadTitle(String title) {
    PFont font;
    font = loadFont("Lato-Black-48.vlw");
    textFont(font, 18);
    fill(0, 102, 153, 100);
    text(title, 30, 50);
  }
  
  void setGradient(int x, int y, float w, float h, color c1, color c2, int axis ) {

  noFill();

  if (axis == X_AXIS) {  // Left to right gradient
    for (int i = x; i <= x+w; i++) {
      float inter = map(i, x, x+w, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
 
