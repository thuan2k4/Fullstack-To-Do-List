
function Form({ children, onSubmit, onClose }) {
    return (
        <div className="modal-body">
            <form onSubmit={onSubmit}>
                {children}
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Hủy</button>
                    <button className="btn btn-primary" type="submit">Lưu</button>
                </div>
            </form>
        </div>
    )
}

export default Form