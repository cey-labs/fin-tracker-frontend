import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Account } from '../../../../core/models/account';
import { AccountService } from '../../../../core/services/account.service';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule,
    FormsModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, MatCardModule, MatSelectModule, MatIconModule]
})
export class CreateAccountDialogComponent {
  accountForm: FormGroup;
  isEditing = false;
  currentUserId = '';
  accounts: Account[] = [];

  accountTypes = [
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' },
    { value: 'credit', label: 'Credit' },
    { value: 'investment', label: 'Investment' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private authService: AuthService,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required],
      description: [''],
      userId: [this.currentUserId]
    });
  }

  ngOnInit() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
      }
    });
  }

  async onSubmit() {
    if (this.accountForm.valid) {
      const accountData = {
        ...this.accountForm.value,
        userId: this.currentUserId
      };

      if (this.isEditing) {
        const id = accountData.id;
        delete accountData.id;
        await this.accountService.updateAccount(id, accountData);
      } else {
        await this.accountService.createAccount(accountData);
      }

      this.resetForm();
      this.dialogRef.close();
    }
  }

  async loadAccounts() {
    console.log(this.currentUserId);
    this.accounts = await this.accountService.getAccountsByUserId(this.currentUserId);
    console.log(this.accounts);
  }

  editAccount(account: Account) {
    this.isEditing = true;
    this.accountForm.patchValue(account);
  }

  async deleteAccount(id: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      await this.accountService.deleteAccount(id);
      await this.loadAccounts();
    }
  }

  resetForm() {
    this.isEditing = false;
    this.accountForm.reset({
      currency: 'USD'
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

