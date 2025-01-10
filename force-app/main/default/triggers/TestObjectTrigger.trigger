trigger TestObjectTrigger on TestObject__c (before insert) {
    List<TestObject__c> toToUpsert = new List<TestObject__c>(); 
    for (TestObject__c to:Trigger.new){
        if(to.Active__c == true){
            List<TestObject__c> toToAcc = [select id, Active__c from TestObject__c where Account__c = :to.Account__c and Active__c = true];
            
            if(toToAcc.size()>0){
                for(TestObject__c toToFalse: toToAcc){
                        toToFalse.Active__c=false;
                        toToUpsert.add(toToFalse);
                }
           }
        }
    }
    
    if(toToUpsert.size()>0){
        update toToUpsert;
    }
}