const InputField = ({ label, name, type = "text", placeholder, value, onChange, className = "" }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="text-white font-medium">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border-2 rounded-lg py-2 px-4 border-blue-950 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
        </div>
    );
};

export default InputField;
