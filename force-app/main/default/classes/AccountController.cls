public with sharing class AccountController {
//Test
    public static List<Account> getAllActiveAccounts() {
      return [SELECT Id,Name,Active__c FROM Account WHERE Active__c = 'Yes'];
    }

    public static List<Account> getAllNotActiveAccounts() {
      return [SELECT Id,Name,Active__c FROM Account WHERE Active__c = 'NO'];
    }
}
