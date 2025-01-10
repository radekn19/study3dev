trigger El_AccountValidation on Account (before insert) {

    List<Account> acc = new List<Account>(); 
    System.debug('Check SLA');

    for(Account a : Trigger.New) {
        if(a.SLA__c == 'Gold'){
            a.SLASerialNumber__c = '1234';
        }
        else {
            a.SLASerialNumber__c = '666';
        }
        acc.add(a);
    }
}