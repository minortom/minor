import processing.pdf.PGraphicsPDF;

int hoeveelheid = 1; 
int widthscherm = 600;
int heightscherm = 600;
void setup() {
 size(widthscherm, heightscherm, PDF, "C:\\Users\\T\\Documents\\test5.pdf");
  for(int i = 0; i < hoeveelheid; i++) {
      drawRectangle(i);
    } 
      
  }

void drawRectangle(int vierkant) {
  for (int i = 0; i <= (hoeveelheid/2); i++) {
      int grootte = ((heightscherm / hoeveelheid));
      println(grootte);
      noStroke();
      int randomH = int(random(360));
      int randomH2 = randomH+90;
      int randomH3 = randomH2+30;
      int randomH4 = randomH3+60;
      int randomS = int(random(100));
      int randomB = int(random(100));
      int randomB2 = int(random(randomB, 100));
      int randomB3 = int(random(randomB2, 100));
      int randomB4 = int(random(randomB3, 100));
      int ja = (i*grootte);
      int wat = vierkant*grootte;
      float ran2 = random(0.12, 0.13);
      float ren2 = random(0.75, 0.76);
      float ran3 = random(0.25, 0.253);
      float ren3 = random(0.55, 0.56);
      float ran4 = random(0.4, 0.41);
      float ren4 = random(0.35, 0.36);
      println(ran2);
      colorMode(HSB, 360, 100, 100);
      color c1 = color(randomH, randomS, randomB4);
      int temp = int(random(randomB, 100));
      color c2 = color(randomH2, randomS, randomB3);
      color c3 = color(randomH3, randomS, randomB2);
      color c4 = color(randomH4, randomS, randomB);
      fill(c1);
      float theta = PI*0 / width; 
      rect(ja, (wat), grootte, grootte);
      rotate(theta);
      fill(c2);
      float theta2 = PI*(random(-3,3)) / width; 
      rect(ja+(grootte*0.12),wat+(grootte*ran2), (grootte*ren2), (grootte*ren2));
      rotate(theta2);
      fill(c3);
      float theta3 = PI*(random(-1,3)) / width; 
      rect(ja+(grootte*0.20), wat+(grootte*ran3), (grootte*ren3), (grootte*ren3));
      rotate(theta3);
      fill(c4);
      float theta4 = PI*(random(-3,2)) / width; 
      rect(ja+(grootte*0.30), wat+(grootte*ran4), (grootte*ren4), (grootte*ren4));
      rotate(theta4);
  }

  }
  
 
  

