/**
 * Reduces one or more LDS errors into an array containing three arrays:
 * [exceptionTypes[], messages[], stackTraces[]].
 * Apex errors are processed with all three details, while others only contribute to messages[].
 * 
 * @param {FetchResponse|FetchResponse[]} errors
 * @return {Array} [exceptionTypes[], messages[], stackTraces[]]
 */
export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    // Initialize arrays for exceptionType, message, and stackTrace
    const exceptionTypes = [];
    const messages = [];
    const stackTraces = [];

    errors
        // Remove null/undefined items
        .filter((error) => !!error)
        // Process each error
        .forEach((error) => {
            // UI API read errors
            if (Array.isArray(error.body)) {
                error.body.forEach((e) => messages.push(e.message));
            }
            // Page level errors
            else if (
                error?.body?.pageErrors &&
                error.body.pageErrors.length > 0
            ) {
                error.body.pageErrors.forEach((e) => messages.push(e.message));
            }
            // Field level errors
            else if (
                error?.body?.fieldErrors &&
                Object.keys(error.body.fieldErrors).length > 0
            ) {
                Object.values(error.body.fieldErrors).forEach((errorArray) => {
                    errorArray.forEach((e) => messages.push(e.message));
                });
            }
            // UI API DML page level errors
            else if (
                error?.body?.output?.errors &&
                error.body.output.errors.length > 0
            ) {
                error.body.output.errors.forEach((e) =>
                    messages.push(e.message)
                );
            }
            // UI API DML field level errors
            else if (
                error?.body?.output?.fieldErrors &&
                Object.keys(error.body.output.fieldErrors).length > 0
            ) {
                Object.values(error.body.output.fieldErrors).forEach(
                    (errorArray) => {
                        errorArray.forEach((e) => messages.push(e.message));
                    }
                );
            }
            // Apex errors: Extract exceptionType, message, and stackTrace
            else if (error.body && typeof error.body.message === 'string') {
                const { exceptionType, message, stackTrace } = error.body;
                exceptionTypes.push(exceptionType || 'Unknown');
                messages.push(message);
                stackTraces.push(stackTrace || 'N/A');
            }
            // JS errors
            else if (typeof error.message === 'string') {
                messages.push(error.message);
            }
            // HTTP status text for unknown error shape
            else {
                messages.push(error.statusText || 'Unknown error');
            }
        });

    // Return an array with three values: [exceptionTypes[], messages[], stackTraces[]]
    return [exceptionTypes, messages, stackTraces];
}