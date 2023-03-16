interface iCheckBox {
  name: string;
  checked: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<iCheckBox> = ({ checked, label, onChange, name }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        className="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span></span>
      <label>{label}</label>
    </div>
  );
};

export default CheckBox;
