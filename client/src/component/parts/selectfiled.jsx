const SelectField = ({ label, name, options = [], value, onChange, className = "" }) => {
    return (
        <div className={`flex flex-col gap-0 ${className}`}>
            <label htmlFor={name} className="text-white font-medium">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`border-2 rounded-lg mt-2 py-2 px-2 border-slate-950 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-slate-500 ${className}`}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value} className="text-white bg-black">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
