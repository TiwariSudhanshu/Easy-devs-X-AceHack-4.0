const Button = ({ label, onClick, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-blue-500  rounded-lg py-2 px-4 text-white mt-4 hover:opacity-80 transition ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;