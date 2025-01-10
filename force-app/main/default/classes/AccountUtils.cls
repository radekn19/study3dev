public class AccountUtils {

    public static List<Account> accountsByState(String billingState){
        List<Account> accountList = [SELECT Id, Name FROM Account WHERE BillingState = :billingState];
        return accountList;   
    }

}