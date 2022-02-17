import { Component } from "react";
// styles
import "./Employees-change-form.css";

class EmployeesChangeForm extends Component {
	render() {
		const { changedName, changedSalary, onValueChange, changeItem } =
			this.props;

		const inputClassName = "form-control new-post-label";

		return (
			<div className="app-add-form">
				<h3>Изменить зарплату сотрудника</h3>
				<form className="add-form d-flex" onSubmit={changeItem}>
					<input
						type="text"
						className={inputClassName}
						placeholder="Полное имя сотрудника?"
						name="changedName"
						value={changedName}
						onChange={onValueChange}
						required
						minLength={3}
					/>
					<input
						type="number"
						className={inputClassName}
						placeholder="изменить З/П в $?"
						name="changedSalary"
						value={changedSalary}
						onChange={onValueChange}
						required
					/>

					<button type="submit" className="btn btn-outline-light">
						Изменить
					</button>
				</form>
			</div>
		);
	}
}

export default EmployeesChangeForm;
