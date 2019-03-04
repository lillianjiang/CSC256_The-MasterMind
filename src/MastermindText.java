import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Random;

public class MastermindText {
	String Kegs[] = {"R","B","G","Y","P","O"};
	static boolean win = false;
	public MastermindText() {
		
	}
	public static void main(String[] args) throws IOException {
		
		rules();
		MastermindText newgame = new MastermindText();
		
		String a[]=newgame.codemaker();
		for(int i = 0;i<a.length; i++) {
			//System.out.print(a[i]);
		}
		
		System.out.println("");
		BufferedReader myReader = new BufferedReader(new InputStreamReader(System.in));
	//	System.out.println("Please choose a difficulty level: Easy / Medium / Difficult");
	//	String Levels = myReader.readLine();
		
		
		for(int i = 0; i<15;i++) {
			System.out.println();
			System.out.println("ENTER YOUR " +(i+1)+"th GUESS");
			String guess = myReader.readLine();
			if(guess.length()<4 || guess.length()>4) {
				System.out.println("Invalid input.");
				System.out.println("ENTER YOUR " +(i+1)+"th GUESS");
				guess = myReader.readLine();
			}
			String answer=new String(check(guess,a));
			System.out.println(answer);
			
			if(answer.equals("BBBB"))
			{
				win = true;
				break;
			}
		}
		
		if(win)
			System.out.println("You win!");
		else
			System.out.println("You lose!");
		
		
		
//		if(Levels.equals("Easy")) {
//			newgame = new
//			
//		}
	
//		drawboard();
	
	}
		public static char[] check(String ck,String[] code) {
			char[] checkanswer = new char[4];
			String[] ccode=code.clone();
			char[] cck=ck.toCharArray();
			int black = 0;
			for(int i = 0;i < 4; i++) {
				if(ccode[i].charAt(0) == (cck[i])) {
					ccode[i]=" ";
					cck[i]='_';
					checkanswer[black]='B';
					black++;
				}
			}
			boolean notfound = true;
			int white = black;
			
			for(int j = 0; j<4;j++) {
				notfound = true;
				for(int m =0; m<4;m++) {
					if(ccode[m].charAt(0)==(cck[j])) {
						if(notfound) {
							white++;
							ccode[m]=" ";
							notfound=false;
							checkanswer[white]='W';
						}
						else {	
						}
							
				}
				
					
				}
			}
			
			return checkanswer;
			
		}
	
		public static void rules()  {
			System.out.println("Welcome to MasterMind.");
			System.out.println("You can choose four kegs from your pockets \"R\",\"B\",\"G\",\"Y\",\"P\",\"O\".");
			System.out.println("Your mission is to break the secret code "
					+ "made by RANDOM in 15 steps.");
			System.out.println("After you enter your guess, a message contained \"B/W\" will be displayed.");
			System.out.println("B = One of your kegs in the right position and has the right color as the secret code.");
			System.out.println("W = One of your kegs has the right color, but not the right position. ");
			System.out.println();
			System.out.println("For example:");
			System.out.println("Secret Code:RGBB");
			System.out.println("Player's guess: RBYY");
			System.out.println("Displayed: BW");
			
			System.out.println();
			System.out.println("Note: You only have 15 steps.");
			System.out.println("Now you can start the game.");
			System.out.println();
			
		}
		
//	 	public static void drawboard() {
//			for(int i = 0; i < 11 ; i++) {
//				System.out.print(" ");
//				for(int j = 0; j < 4; j++) {
//					System.out.print("|");
//					System.out.print("----");
//				
//			}
//				System.out.println("|");
//				System.out.print(11-i);
//				System.out.println(" ");
//				
//			}
//	 	}
//				String a[]=codemaker();
//				for(String x:secretcode) {
//					System.out.println(secre);
//				}
//			
//			}
//		}
		public String[] codemaker() {
			String[] secretcode = new String[4];
			Random rand= new Random();
			secretcode[0]=this.Kegs[rand.nextInt(6)];
			secretcode[1]=this.Kegs[rand.nextInt(6)];
			secretcode[2]=this.Kegs[rand.nextInt(6)];
			secretcode[3]=this.Kegs[rand.nextInt(6)];
			return secretcode;
		}


}