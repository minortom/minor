import processing.pdf.PGraphicsPDF;
void setup() {
size(400,400, PDF,"C:\\Users\\T\\Documents\\test.pdf");
}
void draw(){
  fill(255);
  ellipse(60, 46, 75, 75);  
  fill(0);
  triangle(20, 50, 100, 50, 55, 150);
  println("Finished.");
  exit();
}
