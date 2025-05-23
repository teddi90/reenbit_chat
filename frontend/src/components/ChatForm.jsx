import React, {useState} from 'react'
import {useChatStore} from "../store/useChatStore.js";

const ChatForm = ({onClose}) => {
    const {createChat}=useChatStore()
    const [selectedImg, setSelectedImg] = useState(null);
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName && !formData.lastName) {
            setError("First name and Last name are required");
        }

        createChat(formData);
        setFormData({
            firstName: "",
            lastName: "",
        });
        onClose();

    }
    return (
        <div className="form-wrapper">
            <h2 className="form-header">Create Chat</h2>
            <div className="form-avatar-container">
                <img
                    src={selectedImg || "/user-avatar.png"}
                    alt="Chat avatar"
                    className="form-avatar-img"
                />
                <label
                    htmlFor="avatar-upload"
                    className="form-avatar-label"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                    <input
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>
            <form onSubmit={handleSubmit}
                  className="form"
            >
                <div className="form-control">
                    <label htmlFor={"firstName"}
                           className="form-label">
                        First Name:
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="form-input"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor={"firstName"}
                           className="form-label">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-input"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="form-btn">Create</button>

            </form>
        </div>
    )
}
export default ChatForm
