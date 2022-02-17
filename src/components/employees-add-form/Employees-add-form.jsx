import { Component } from "react";
// styles
import "./Employees-add-form.css";

class EmployeesAddForm extends Component {
	render() {
		const { name, salary, onValueChange, addItem } = this.props;

		const inputClassName = "form-control new-post-label";

		return (
			<div className="app-add-form">
				<h3>Добавьте нового сотрудника</h3>
				<form className="add-form d-flex" onSubmit={addItem}>
					<input
						type="text"
						className={inputClassName}
						placeholder="Как его зовут?"
						name="name"
						value={name}
						onChange={onValueChange}
						required
						minLength={3}
					/>
					<input
						type="number"
						className={inputClassName}
						placeholder="З/П в $?"
						name="salary"
						value={salary}
						onChange={onValueChange}
						required
					/>

					<button type="submit" className="btn btn-outline-light">
						Добавить
					</button>
				</form>
			</div>
		);
	}
}

export default EmployeesAddForm;
