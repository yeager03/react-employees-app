import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
// styles
import "./App.css";
// components
import AppInfo from "../app-info/App-info";
import SearchPanel from "../search-panel/Search-panel";
import AppFilter from "../app-filter/App-filter";
import EmployeesList from "../employees-list/Employees-list";
import EmployeesAddForm from "../employees-add-form/Employees-add-form";
import EmployeesChangeForm from "../employees-change-form/Employees-change-form";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{
					name: "Alex S.",
					salary: 800,
					increase: false,
					rise: false,
					id: uuidv4(),
				},
				{
					name: "Bob B",
					salary: 1000,
					increase: false,
					rise: false,
					id: uuidv4(),
				},
				{
					name: "Carl C.",
					salary: 500,
					increase: false,
					rise: false,
					id: uuidv4(),
				},
			],
			// add item
			name: "",
			salary: "",
			// button to increase and rise
			increase: false,
			rise: false,
			// search panel
			term: "",
			// filter panel
			filter: "all",
			// change item panel
			changedName: "",
			changedSalary: "",
		};
	}

	// delete list item
	deleteItem = (id) => {
		this.setState(({ data }) => {
			const index = data.findIndex((elem) => elem.id === id),
				newData = [...data.slice(0, index), ...data.slice(index + 1)]; // we are returning new array without deleted element
			return {
				data: newData,
			};
		});
	};

	// form input changes
	onValueChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	// add new list item
	addItem = (e) => {
		e.preventDefault();

		this.setState(({ data, name, salary }) => {
			if (name === "" || salary === "") {
				return;
			}

			// new object
			const user = {
					name: name,
					salary: salary,
					increase: false,
					rise: false,
					id: uuidv4(),
				},
				// new arr, with old data + new object
				newData = [...data, user];
			return {
				data: newData,
			};
		});
		this.resetInput("name", "salary");
	};

	// clear all inputs from forms
	resetInput = (...states) => {
		states.forEach((state) => {
			this.setState({
				[state]: "",
			});
		});
	};

	// onToggleProp: Rise list item, Increase list item
	onToggleProp = (id, prop) => {
		this.setState(({ data }) => {
			const index = data.findIndex((elem) => elem.id === id),
				oldObj = data[index], // old object
				newData = [...data]; // new arr

			newData[index] = { ...oldObj, [prop]: !oldObj[prop] }; // in new Array we will put our new object

			return {
				data: newData,
			};
		});
	};

	// search panel
	searchEmp = (items, term) => {
		if (term.trim() === "") {
			return items;
		}

		return items.filter((item) => {
			return item.name.indexOf(term) > -1;
		});
	};

	// choose filter
	chooseFilter = (filter) => {
		this.setState({ filter });
	};

	// filter data
	filterData = (items, filter) => {
		switch (filter) {
			case "rise":
				return items.filter((item) => item.rise);
			case "moreThan1000":
				return items.filter((item) => item.salary >= 1000);
			default:
				// "all"
				return items;
		}
	};

	// change salary
	changeItem = (e) => {
		e.preventDefault();

		const { data, changedName, changedSalary } = this.state,
			index = data.findIndex((item) => item.name === changedName);

		if (index <= -1) {
			alert("Такой сотрудник не найден!");
			return;
		}

		this.setState(() => {
			const oldObj = data[index],
				newData = [...data];

			newData[index] = { ...oldObj, salary: changedSalary };
			return {
				data: newData,
			};
		});

		this.resetInput("changedName", "changedSalary");
	};

	render() {
		const {
			data,
			name,
			salary,
			increase,
			rise,
			term,
			filter,
			changedName,
			changedSalary,
		} = this.state;

		const filteredData = this.filterData(data, filter);
		const visibleData = this.searchEmp(filteredData, term);

		// count employees and count increased employees
		const employees = visibleData.length;
		const increased = visibleData.filter(
			(item) => item.increase === true
		).length;

		return (
			<div className="app">
				<AppInfo employees={employees} increased={increased} />

				<div className="search-panel">
					<SearchPanel term={term} onValueChange={this.onValueChange} />
					<AppFilter
						filter={filter}
						chooseFilter={(e) =>
							this.chooseFilter(e.currentTarget.getAttribute("data-filter"))
						}
					/>
				</div>
				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					increase={increase}
					rise={rise}
				/>
				<EmployeesAddForm
					onValueChange={this.onValueChange}
					name={name}
					salary={salary}
					addItem={(e) => this.addItem(e)}
				/>
				<EmployeesChangeForm
					onValueChange={this.onValueChange}
					changedName={changedName}
					changedSalary={changedSalary}
					changeItem={(e) => this.changeItem(e)}
				/>
			</div>
		);
	}
}

export default App;
