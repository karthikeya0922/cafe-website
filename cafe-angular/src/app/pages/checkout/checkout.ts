import { Component, DestroyRef, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService, OrderType } from '../../services/order.service';

/** Custom validator: rejects values that are only spaces. */
function notBlank(control: AbstractControl): ValidationErrors | null {
  return typeof control.value === 'string' && control.value.length > 0 && control.value.trim() === ''
    ? { blank: true }
    : null;
}

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  protected readonly cart = inject(CartService);
  private readonly orders = inject(OrderService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Reactive form: the form model is defined in the component class
  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), notBlank]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    orderType: ['dine-in' as OrderType, Validators.required],
    tableNumber: [null as number | null],
    address: [''],
    notes: ['', Validators.maxLength(200)],
  });

  constructor() {
    this.updateConditionalValidators(this.form.controls.orderType.value);

    // Table number is required for dine-in, address for delivery
    this.form.controls.orderType.valueChanges
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((type) => this.updateConditionalValidators(type));
  }

  private updateConditionalValidators(type: OrderType): void {
    const { tableNumber, address } = this.form.controls;

    tableNumber.setValidators(type === 'dine-in' ? [Validators.required, Validators.min(1), Validators.max(20)] : null);
    address.setValidators(type === 'delivery' ? [Validators.required, Validators.minLength(10), notBlank] : null);

    if (type !== 'dine-in') tableNumber.reset(null);
    if (type !== 'delivery') address.reset('');

    tableNumber.updateValueAndValidity();
    address.updateValueAndValidity();
  }

  /** True when a control is invalid and the user has interacted with it. */
  protected showError(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const order = this.orders.place(this.form.getRawValue(), this.cart.lines(), this.cart.total());
    this.cart.clear();
    this.router.navigate(['/orders', order.id]);
  }
}
