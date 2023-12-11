import './Styles/coordinateinput.css';

function CoordinateInput({ label, value, placeholder, onChange }){
    return (
      <div className="input-container">
      <label className='text-label'>
        {label}:
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      </div>  
    );
  }; 

  export default CoordinateInput