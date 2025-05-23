
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render if modal is closed

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                {children} {/* Content inside modal */}
            </div>
        </div>
    );
};

export default Modal;