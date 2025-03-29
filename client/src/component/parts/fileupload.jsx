// -------------------- PACKAGE IMPORT FILES -------------------- //
import { useState } from "react";

const FileUpload = ({ label, name, onChange, className = "" }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className=" text-slate-900 font-medium">
                {label}
            </label>
            <div className="relative inline-block">
                <input
                    id={name}
                    name={name}
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">Choose File</button>
            </div>
            {preview && (
                <div className="mt-2">
                    <p className="text-sm  text-slate-900">Preview:</p>
                    <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-blue-500" />
                </div>
            )}
        </div>
    );
};

export default FileUpload;
