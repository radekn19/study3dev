public with sharing class CallError {
    

    @AuraEnabled
    public static void throwApexException() {
    throw new DmlException('This is a simulated DMLException');
    }

    @AuraEnabled
    public static List<Contact> queryWithError() {
    String query = 'SELECT Name, FROM Contact'; // Malformed query
    return Database.query(query);
}
}