import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import logError from '@salesforce/apex/ErrorLoggerController.logError';

export default class LwcErrorHandler extends LightningElement {

    hasError = false;
    errorMessage = '';
    context = 'Unknown';

    // Catch errors from child components
    errorCallback(error, stack) {
        this.hasError = true;
        this.errorMessage = error.message;

        // Log error to database
        logError({ 
            errorMessage: error.message, 
            context: this.context, 
            stackTrace: stack 
        })
            .then(() => {
                this.showToast('Error logged successfully', 'success');
            })
            .catch((err) => {
                console.error('Error logging failed:', err);
            });

        // Optionally display error as a toast message
        this.showToast('An error occurred', 'error');
    }

    // Dismiss the error UI
    dismissError() {
        this.hasError = false;
        this.errorMessage = '';
    }

    // Utility to show toast messages
    showToast(title, variant) {
        const toastEvent = new ShowToastEvent({
            title,
            variant,
            message: this.errorMessage,
        });
        this.dispatchEvent(toastEvent);
    }
}