public class testException1 {
    
    public static void method1(){
        try{
		testException2.exsception01();
        }
        catch(MathException e){
            System.debug(e.getTypeName() + ' was thrown in testException1! ' + e.getMessage());
        }
    }
    
}