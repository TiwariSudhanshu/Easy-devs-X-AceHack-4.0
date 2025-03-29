const TextAreaField = ({ label, name, placeholder, value, onChange, className = "" }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label htmlFor={name} className="text-slate-900  font-medium">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border-2 rounded-lg py-2 px-4  border-slate-950 bg-transparent text-slate-900  focus:outline-none focus:ring-2 focus:ring-slate-500"
                rows={4}
            />
        </div>
    );
};

export default TextAreaField;