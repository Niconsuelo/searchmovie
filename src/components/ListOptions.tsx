import "../styles/ListOptions.css";
import GenresOptions from "../models/GenresOptions";

interface OptionProps {
  options: GenresOptions[];
  selected: GenresOptions | null;
  onChangeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

const SelectComponent: React.FC<OptionProps> = ({
  options,
  selected,
  onChangeOption,
  name,
}) => {
  return (
    <div>
      <select
        className="select-nav-bar"
        value={selected ? selected.value : ""}
        onChange={onChangeOption}
      >
        <option value="" disabled>
          {name}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
