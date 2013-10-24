void setup() {
  int w = 500;
  int h = 500;
  size(w,h);
 
}

void draw() {
  color[][] set = new color[1][9];
  
  set[0][0] = color(255, 0, 0);
  set[0][1] = color(255, 233, 0);
  set[0][2] = color(0, 80, 255);
  
  set[0][3] = color(127, 0, 255);
  set[0][4] = color(255, 144, 0);
  set[0][5] = color(0, 212, 255);
  
  set[0][6] = color(245, 155, 255);
  set[0][7] = color(255, 212, 119);
  set[0][8] = color(163, 239, 255);
  
  for (int a = 0; a < 500;) {
      for (int c = 0; c < 9; c++) {
        makeLines(set[0][c], (20*c)+(18*a), 0,10, 500);
       
    }
     a = a + 10;
  }
}

void makeLines(color kleur, int x1, int y1, int x2, int y2) {
  fill(kleur);
  noStroke();
  rect(x1, y1, x2, y2);
  fill(kleur);
  rect(y1, x1, y2, x2);
  
  
}
