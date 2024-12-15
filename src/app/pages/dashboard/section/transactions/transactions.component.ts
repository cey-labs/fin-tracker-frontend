import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Transaction } from '../../../../core/models/transaction';
import { Account } from '../../../../core/models/account';
import { TransactionService } from '../../../../core/services/transaction.service';
import { AccountService } from '../../../../core/services/account.service';
import { AuthService } from '../../../../core/services/auth-service/auth.service';
import { CreateTransactionDialogComponent } from '../../../../core/components/create-transaction-dialog/create-transaction-dialog.component';

@Component({
  selector: 'app-transactions',
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  accounts: Account[] = [];
  currentUserId = '';
  displayedColumns: string[] = ['date', 'type', 'amount', 'category', 'account', 'description', 'status', 'actions'];

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.loadAccounts();
        this.loadTransactions();
      }
    });
  }

  async loadAccounts() {
    this.accounts = await this.accountService.getAccountsByUserId(this.currentUserId);
  }

  async loadTransactions() {
    this.transactions = await this.transactionService.getTransactionsByUserId(this.currentUserId);
  }

  openCreateTransactionDialog(): void {
    const dialogRef = this.dialog.open(CreateTransactionDialogComponent, {
      width: '500px',
      data: {
        isEditing: false,
        accounts: this.accounts,
        userId: this.currentUserId
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTransactions();
      }
    });
  }

  editTransaction(transaction: Transaction) {
    const dialogRef = this.dialog.open(CreateTransactionDialogComponent, {
      width: '500px',
      data: {
        isEditing: true,
        transaction: transaction,
        accounts: this.accounts,
        userId: this.currentUserId
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTransactions();
      }
    });
  }

  async deleteTransaction(id: string) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await this.transactionService.deleteTransaction(id);
      await this.loadTransactions();
    }
  }

  getAccountName(accountId: string): string {
    const account = this.accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  }

  formatAmount(amount: number, type: string): string {
    return type === 'expense' ? `-${amount.toFixed(2)}` : amount.toFixed(2);
  }
}
