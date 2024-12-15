import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Account } from '../../../../core/models/account';
import { AccountService } from '../../../../core/services/account.service';
import { AuthService } from '../../../../core/services/auth-service/auth.service';

import { CreateAccountDialogComponent } from '../../../../core/components/create-account-dialog/create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'balance', 'currency', 'description', 'actions'];
  accounts: Account[] = [];
  accountForm: FormGroup;
  isEditing = false;
  currentUserId = '';

  accountTypes = [
    { value: 'savings', label: 'Savings' },
    { value: 'checking', label: 'Checking' },
    { value: 'credit', label: 'Credit' },
    { value: 'investment', label: 'Investment' }
  ];

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
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
        this.loadAccounts();
      }
    });
  }

  async loadAccounts() {
    console.log(this.currentUserId);
    this.accounts = await this.accountService.getAccountsByUserId(this.currentUserId);
    console.log(this.accounts);
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
      await this.loadAccounts();
    }
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

  openCreateAccountDialog(): void {
    this.dialog.open(CreateAccountDialogComponent, {
      width: '300px',
      data: { /* pass data to the dialog here if needed */ },
      disableClose: true
    });
  }
}
