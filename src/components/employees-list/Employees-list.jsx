// styles
import "./Employees-list.css";
// components
import EmployeesListItem from "../employees-list-item/Employees-list-item";

const EmployeesList = ({ data, onDelete, onToggleProp }) => {
	return (
		<ul className="app-list list-group">
			{data.length > 0 ? (
				data.map((item) => {
					const { id, ...otherProps } = item;
					return (
						<EmployeesListItem
							key={id}
							{...otherProps}
							onDelete={() => onDelete(id)}
							onToggleProp={(e) =>
								onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))
							}
						/>
					);
				})
			) : (
				<h2 className="text-center">Ничего не найдено...</h2>
			)}
		</ul>
	);
};

export default EmployeesList;
