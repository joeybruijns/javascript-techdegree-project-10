import React from 'react';

export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors}/>
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

/**
 * Display error messages that might be returned by the API
 * @param {array} errors - A possible array of errors returned by the API
 * @returns {null} errorDisplay - The errorDisplay that is either null or an JSX.Element
 * @constructor
 */
function ErrorsDisplay({errors}) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}
