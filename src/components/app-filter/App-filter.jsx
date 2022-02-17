// styles
import "./App-filter.css";

const AppFilter = ({ chooseFilter, filter }) => {
	const buttonsData = [
		{ dataFilter: "all", label: "Все сотрудники" },
		{ dataFilter: "rise", label: "На повышение" },
		{ dataFilter: "moreThan1000", label: "3/П больше 1000$" },
	];

	const toggleClass = (choosenFilter, activeClass, notActiveClass) =>
		filter === choosenFilter ? activeClass : notActiveClass;

	return (
		<div className="btn-group">
			{buttonsData.map(({ dataFilter, label }) => (
				<button
					type="button"
					data-filter={dataFilter}
					className={toggleClass(
						dataFilter,
						"btn btn-light",
						"btn btn-outline-light"
					)}
					onClick={chooseFilter}
					key={dataFilter}
				>
					{label}
				</button>
			))}
		</div>
	);
};

export default AppFilter;
