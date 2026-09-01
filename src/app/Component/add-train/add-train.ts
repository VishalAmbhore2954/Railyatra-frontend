import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tain } from '../../Services/tain';

@Component({
  selector: 'app-add-train',
  imports: [ReactiveFormsModule],
  templateUrl: './add-train.html',
  styleUrl: './add-train.css',
})
export class AddTrain implements OnInit{
  train = {
    trainnumber: '',
    trainname: '',
    traintype: ''
  };


  trainForm: any;

  constructor(
    private fb: FormBuilder,
    private trainService: Tain
  ) {}

  ngOnInit(): void {
    this.initTrainForm();
  }

  initTrainForm(){
    this.trainForm = this.fb.group({

      trainnumber: ['', Validators.required],

      trainname: ['', Validators.required],

      traintype: ['', Validators.required]

    });
  }

  addTrain() {

    // Check validation
    if (this.trainForm.invalid) {

      alert('Please fill all fields');

      return;

    }


    // Get form data
    const data = this.trainForm.value;

    console.log('Train Details:', data);


    // Call API
    this.trainService.postTrain(data).subscribe({

      next: (response) => {

        console.log('Response:', response);

        alert('Train added successfully');

        this.resetForm();

      },

      error: (error) => {

        console.log('Error:', error);

        alert('Something went wrong');

      }

    });

  }

  resetForm() {
    this.trainForm.reset();
  }
}
