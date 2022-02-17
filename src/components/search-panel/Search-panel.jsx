// styles
import "./Search-panel.css";

const SearchPanel = ({ term, onValueChange }) => {
	return (
		<input
			type="text"
			className="form-control search-input"
			placeholder="Найти сотрудника"
			name="term"
			value={term}
			onChange={(e) => onValueChange(e)}
		/>
	);
};

export default SearchPanel;
