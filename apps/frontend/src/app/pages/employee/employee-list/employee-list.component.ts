import { Component, OnInit } from '@angular/core'
import { EmployeeService } from '../../../services/employee.service'

@Component({
	selector: 'bress-squash-toernooi-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
	metadata: any = []
	constructor(private employeeService: EmployeeService) { }


	ngOnInit(): void {
	}

	async onCall(): Promise<void> {
		this.employeeService.getAll().subscribe((employees) => {
			this.metadata = employees
		})
	}

}
