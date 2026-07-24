export default function ConfirmModal({

    message,

    onCancel,

    onConfirm,

    loading

}) {

    return (

        <div className="modal-overlay">

            <div className="confirm-modal">

                <h2 className="modal-title">
                   
                    Confirm Action

                </h2>

                <p className="modal-message">

                    {message}

                </p>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >

                        Cancel

                    </button>

                    <button

    className="confirm-btn"

    onClick={onConfirm}

    disabled={loading}

>

    {

        loading

            ? "Loading..."

            : "Confirm"

    }

</button>

        

                </div>

            </div>

        </div>

    );

}