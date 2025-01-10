import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import throwApexException from '@salesforce/apex/CallError.throwApexException';
import queryWithError from '@salesforce/apex/CallError.queryWithError';
import { reduceErrors } from 'c/reduceError';
import { reduceErrors2 } from 'c/reduce2';

export default class CallError extends LightningElement {


    async handleApexException() {
        try {
            await throwApexException();
        } catch (error) {
            console.error('Apex Exception:', error);
            console.error('Reduced Apex Exception:', reduceErrors(error));
            console.error('Reduced2 Apex Exception:', reduceErrors2(error));

        }

    }

    async handleLdsException() {
        const recordInput = {
            apiName: 'Contact',
            fields: {
                // Simulating error by omitting required fields like LastName
                FirstName: 'John'
            }
        };
        try {
            await createRecord(recordInput);
        } catch (error) {
            console.error('LDS Exception:', error);
            console.error('Reduced LDS Exception:', reduceErrors(error));
            console.error('Reduced2 LDS Exception:', reduceErrors2(error));

            

        }
    }


    handleStandardErrors() {
        try {
            // ReferenceError
            console.log(undefinedVariable);
        } catch (error) {
            console.error('ReferenceError:', error);
            console.error('Reduced ReferenceError', reduceErrors(error));
            console.error('Reduced2 ReferenceError', reduceErrors2(error));


        }

        try {
            // TypeError
            const num = 123;
            num(); // Calling a number as a function
        } catch (error) {
            console.error('TypeError:', error);
            console.error('Reduced TypeError', reduceErrors(error));
            console.error('Reduced2 TypeError', reduceErrors2(error));

        }

        try {
            // RangeError
            new Array(-1); // Invalid array size
        } catch (error) {
            console.error('RangeError:', error);
            console.error('Reduced RangeError', reduceErrors(error));
            console.error('Reduced2 RangeError', reduceErrors2(error));

        }
    }


    async handleFetchError() {
        try {
            const response = await fetch('https://example.com/invalid-endpoint');
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } catch (error) {
            console.error('Fetch API Error:', error);
            console.error('Reduced Fetch API Error:', reduceErrors(error));
            console.error('Reduced2 Fetch API Error:', reduceErrors2(error));

        }
    }

    handleCustomEventError() {
        try {
            // Simulating an error in event dispatch
            const event = new CustomEvent('testevent', { detail: null });
            throw new Error('Simulated custom event error');
        } catch (error) {
            console.error('Custom Event Error:', error);
            console.error('Reduced Custom Event Error', reduceErrors(error));
            console.error('Reduced2 Custom Event Error', reduceErrors2(error));

        }
    }

    async handleNetworkError() {
        try {
            const response = await fetch('https://thisdoesnotexist.invalid');
        } catch (error) {
            console.error('Network Error:', error);
            console.error('Reduced Network Error:', reduceErrors(error));
            console.error('Reduced2 Network Error:', reduceErrors2(error));

        }
    }

    async handleQueryError() {
        try {
            await queryWithError();
        } catch (error) {
            console.error('SOQL Query Error:', error);
            console.error('Reduced SOQL Query Error:', reduceErrors(error));
            console.error('Reduced2 SOQL Query Error:', reduceErrors2(error));

        }
    }


}