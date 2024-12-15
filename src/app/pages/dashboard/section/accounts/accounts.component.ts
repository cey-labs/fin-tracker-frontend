import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  accounts: Account[] = [];
  currentUserId = '';
  displayedColumns: string[] = ['name', 'type', 'balance', 'currency', 'description', 'actions'];

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.loadAccounts();
      }
    });
  }

  async loadAccounts() {
    this.accounts = await this.accountService.getAccountsByUserId(this.currentUserId);
  }

  openCreateAccountDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
      width: '500px',
      data: {
        isEditing: false,
        userId: this.currentUserId
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAccounts();
      }
    });
  }

  editAccount(account: Account) {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
      width: '500px',
      data: {
        isEditing: true,
        account: account,
        userId: this.currentUserId
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAccounts();
      }
    });
  }

  async deleteAccount(id: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      await this.accountService.deleteAccount(id);
      await this.loadAccounts();
    }
  }
}
