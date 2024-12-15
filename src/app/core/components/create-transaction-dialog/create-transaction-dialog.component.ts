import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Transaction } from '../../models/transaction';
import { Account } from '../../models/account';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-create-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-transaction-dialog.component.html',
  styleUrls: ['./create-transaction-dialog.component.css']
})
export class CreateTransactionDialogComponent implements OnInit {
  transactionForm: FormGroup;

  transactionTypes = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'transfer', label: 'Transfer' }
  ];

  categories = [
    { value: 'salary', label: 'Salary' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'transport', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Healthcare' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private dialogRef: MatDialogRef<CreateTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      isEditing: boolean;
      transaction?: Transaction;
      accounts: Account[];
      userId: string;
    },
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      payee: [''],
      status: ['completed', Validators.required]
    });

    if (data.isEditing && data.transaction) {
      this.transactionForm.patchValue({
        ...data.transaction,
        date: new Date(data.transaction.date)
      });
    }
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.transactionForm.valid) {
      try {
        const transactionData = {
          ...this.transactionForm.value,
          userId: this.data.userId
        };

        if (this.data.isEditing && this.data.transaction) {
          await this.transactionService.updateTransaction(
            this.data.transaction.id!,
            transactionData
          );
        } else {
          await this.transactionService.createTransaction(transactionData);
        }
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
