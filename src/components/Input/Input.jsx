import './Input.scss';

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
}) {
  return (
    <section className='input'>
      <label className='input__label'  htmlFor={name} >{label}</label>
      <input
        id={name}
        type={type}
        className={`input__field ${customClass ? customClass : ''}`}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ''}
        disabled={disabled}
        role={type === 'text' ? 'textbox' : undefined}
        data-testid={`input-${label}`}
      />
    </section>
  );
}

export default Input;
