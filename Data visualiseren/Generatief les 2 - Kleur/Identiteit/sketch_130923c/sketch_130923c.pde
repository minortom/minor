String alfabet = "abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVW ";
String naam = "Tom Arnoldussen";
int lengtenaam = naam.length();
int widthcanvas = 800;
int heightcanvas = 500;

void setup() {
 colorMode(HSB, 360, 100, 100);
 background(41, 100, 100);
 size(widthcanvas, heightcanvas);
  for (int i = 0; i < lengtenaam; i++) {
    char letter = naam.charAt(i);
    int plaats = alfabet.indexOf(letter); 
   println(plaats); 
    maakStreep(i, plaats);
    }
     println(lengtenaam);
   }
   
 
   
void maakStreep(int getal, int plaats) {
  colorMode(HSB, 360, 100, 100);
  int deel = widthcanvas / lengtenaam;
  strokeWeight(plaats); 
  stroke(plaats, 100, random(100));
  line(getal*deel, 0, getal*deel, heightcanvas);
}
