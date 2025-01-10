public with sharing class ErrorLoggerController {

    @AuraEnabled
    public static void logError(String errorMessage, String context, String stackTrace) {
        String test;
        try {
            Error_Log_c__c errorLog = new Error_Log_c__c();
            errorLog.Error_Message_c__c = errorMessage;
            errorLog.Context_c__c = context;
            errorLog.Stack_Trace_c__c = stackTrace;
            errorLog.Timestamp_c__c = System.now();
            insert errorLog; 
        } catch (Exception ex) {
            System.debug('Failed to log error: ' + ex.getMessage());
        }
    }
}