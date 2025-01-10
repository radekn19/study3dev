/**
 * Reduces one or more LDS errors into a structured array of error objects.
 * Each object includes message, statusCode, and additional details if available.
 * @param {FetchResponse|FetchResponse[]} errors - One or more errors to process
 * @return {Object[]} An array of error objects
 */
export function reduceErrors2(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return errors
        // Remove null/undefined items
        .filter((error) => !!error)
        // Extract detailed error information
        .map((error) => {
            const reducedError = {};

            // UI API read errors (array of messages)
            if (Array.isArray(error.body)) {
                reducedError.messages = error.body.map((e) => e.message);
            }
            // Page level errors
            else if (error?.body?.pageErrors?.length > 0) {
                reducedError.messages = error.body.pageErrors.map((e) => e.message);
                reducedError.codes = error.body.pageErrors.map((e) => e.statusCode);
            }
            // Field level errors
            else if (error?.body?.fieldErrors && Object.keys(error.body.fieldErrors).length > 0) {
                reducedError.messages = [];
                reducedError.fields = [];
                Object.entries(error.body.fieldErrors).forEach(([field, errorArray]) => {
                    reducedError.fields.push(field);
                    reducedError.messages.push(...errorArray.map((e) => e.message));
                });
            }
            // UI API DML page-level errors
            else if (error?.body?.output?.errors?.length > 0) {
                reducedError.messages = error.body.output.errors.map((e) => e.message);
                reducedError.codes = error.body.output.errors.map((e) => e.errorCode);
            }
            // UI API DML field-level errors
            else if (error?.body?.output?.fieldErrors && Object.keys(error.body.output.fieldErrors).length > 0) {
                reducedError.messages = [];
                reducedError.fields = [];
                Object.entries(error.body.output.fieldErrors).forEach(([field, errorArray]) => {
                    reducedError.fields.push(field);
                    reducedError.messages.push(...errorArray.map((e) => e.message));
                });
            }
            // Network or Apex errors
            else if (error.body && typeof error.body.message === 'string') {
                reducedError.message = error.body.message;
                reducedError.statusCode = error.status;
            }
            // JavaScript errors
            else if (typeof error.message === 'string') {
                reducedError.message = error.message;
            }
            // HTTP status text (fallback)
            else if (error.statusText) {
                reducedError.message = error.statusText;
                reducedError.statusCode = error.status;
            }
            // Fallback for unrecognized error formats
            else {
                reducedError.message = 'An unknown error occurred.';
            }

            // Attach stack trace if available
            if (error.stack) {
                reducedError.stack = error.stack;
            }

            return reducedError;
        })
        // Flatten the array of error objects
        .reduce((allErrors, currentError) => {
            // Combine arrays of messages or fields if they exist
            if (currentError.messages) {
                allErrors.messages = (allErrors.messages || []).concat(currentError.messages);
            }
            if (currentError.fields) {
                allErrors.fields = (allErrors.fields || []).concat(currentError.fields);
            }
            if (currentError.codes) {
                allErrors.codes = (allErrors.codes || []).concat(currentError.codes);
            }
            // Add top-level properties if they exist
            if (currentError.message && !allErrors.messages) {
                allErrors.messages = [currentError.message];
            }
            if (currentError.stack) {
                allErrors.stack = currentError.stack;
            }
            return allErrors;
        }, {});
}