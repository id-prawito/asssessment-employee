import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../auth.service';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from './assessment-dashboard.model';

const constant = {
  PAGE_SIZE : 8
}

@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrls: ['./assessment-dashboard.component.scss'],
})
export class AssessmentDashboardComponent implements OnInit {

  @Input() pageSize = constant.PAGE_SIZE;

  searchText: string = '';

  page = 0;
  items: any[] = [];
  pageData = {} as {
    start: number;
    end: number;
  }
  

  title = 'assessmentProject';
  maxDate: any;
  employeeData:EmployeeModel[] = [];
  

  formValue!: FormGroup;
  employeModelObject: EmployeeModel = new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private authServices: AuthServices, private router: Router) {}

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.futureDateDisable();
    this.getEmployeeData();

    this.initPagination();
  }

  initPagination() : void {
    this.paginate(this.page, this.pageSize);
  }

  public get size(): number {
    // console.log(this.employeeData.length);
    return this.employeeData.length;
  }

  public get totalPages(): number {
    console.log("page", this.pageSize)
    return Math.ceil(this.size / this.pageSize)
  }

  paginate(page:number, pageSize: number): void {
    const startPortion = page * pageSize;
    let endPortion = startPortion + pageSize;

    if (endPortion > this.size) {
      endPortion -= endPortion - this.size
    }

    this.saveCalculatedPortion(startPortion, endPortion);

    this.items = [this.employeeData.slice(startPortion, endPortion)];
  }

  private saveCalculatedPortion(start: number, end: number): void {
    this.pageData = {
      ...this.pageData,
      start,
      end
    }
  }

  futureDateDisable() {
    var date: any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    console.log(month);

    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }

    this.maxDate = year + '-' + month + '-' + todayDate;

    console.log(this.maxDate);
  }

  addEmployee() {
    // console.log(this.formValue.value);
    if (this.formValue.valid) {
      this.api.postEmployee(this.formValue.value).subscribe({
        next: (res) => {
          alert('Employee added successfuly');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getEmployeeData();
        },
        error: () => {
          alert('Error, nanti errornya di buat modal bagus nih');
        },
      });
    }
  }

  getEmployeeData() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  buttonEmployeeAdd(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  deleteEmployee(data: any) {
    if (confirm('Are you sure to delete ' + data.username)) {
      this.api.deleteEmployee(data.id).subscribe((res) => {
        alert('Employee Delete');
        this.getEmployeeData();
      });
    }
  }

  editEmployee(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeModelObject.id = data.id;
    this.formValue.controls['username'].setValue(data.username);
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['birthDate'].setValue(data.birthDate);
    this.formValue.controls['basicSalary'].setValue(data.basicSalary);
    this.formValue.controls['status'].setValue(data.status);
    this.formValue.controls['group'].setValue(data.group);
    this.formValue.controls['description'].setValue(data.description);
  }

  updateEmployeeDetails() {
    this.employeModelObject.username = this.formValue.value.username;
    this.employeModelObject.firstName = this.formValue.value.firstName;
    this.employeModelObject.lastName = this.formValue.value.lastName;
    this.employeModelObject.email = this.formValue.value.email;
    this.employeModelObject.birthDate = this.formValue.value.birthDate;
    this.employeModelObject.basicSalary = this.formValue.value.basicSalary;
    this.employeModelObject.status = this.formValue.value.status;
    this.employeModelObject.group = this.formValue.value.group;
    this.employeModelObject.description = this.formValue.value.description;
    this.api
      .updateEmployee(this.employeModelObject, this.employeModelObject.id)
      .subscribe((res) => {
        alert('Update Berhasil yeee, we did it');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployeeData();
      });
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText)
  }

  order: any = '';

  sortData() {
    if(this.order) {
      let newArr = this.employeeData.sort((a, b) => a.id - b.id);

      this.employeeData = newArr;
    } else {
      let newArr = this.employeeData.sort((a, b) => b.id - a.id);

      this.employeeData = newArr;
    }

    this.order = !this.order;
  }

  logOut() {
    this.authServices.logout();
    this.router.navigate(['login'])
  }

  detailData:any = [];

  detailEmployee(data: any){
    this.detailData = data;
    console.log(data)
  }

  startIndex = 0;
  endIndex = 8;

  pageBerapa=1;

  dataIndexBaru = 8;

  setEndIndex(number:any){
    this.endIndex = number;
    this.dataIndexBaru = number;
    this.startIndex=0;
  };

  getArrayfromNumber(length:any) {
    return new Array(Math.ceil(length/this.dataIndexBaru))
  }


  updateIndex(pageIndex: any){
    this.startIndex = pageIndex * this.dataIndexBaru;
    this.endIndex = this.startIndex + this.dataIndexBaru;
    this.pageBerapa = pageIndex + 1;
  }

  selectedCar: any;

  cars = [
      { id: 1, name: 'IT Departemeen' },
      { id: 2, name: 'UI UX' },
      { id: 3, name: 'Marketing' },
      { id: 4, name: 'Management' },
      { id: 5, name: 'Server' },
      { id: 6, name: 'Jaringan' },
      { id: 8, name: 'Keuangan' },
      { id: 9, name: 'Analys' },
      { id: 10, name: 'HRD' },
      
  ];

  column = [
    { id: 1, name: 'No' },
    // { id: 2, name: 'Username' },
    // { id: 3, name: 'FirstName' },
    { id: 4, name: 'LastName' },
    { id: 5, name: 'Email' },
    { id: 6, name: 'Status' },
    { id: 8, name: 'Basic Salary' },
    { id: 9, name: 'BirthDay' },
    { id: 10, name: 'Group' },
    { id: 11, name: 'Description' },
    { id: 12, name: 'Actions'}
    
];


}
