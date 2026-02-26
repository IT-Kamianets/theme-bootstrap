import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// ÐŸÑ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ– Ñ–Ð¼Ð¿Ð¾Ñ€Ñ‚Ð¸
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormPageComponent implements OnInit {
  checkoutForm: FormGroup;
  selectedProduct: Product | null = null;

  formFields = [
    { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { key: 'address', label: 'Address', type: 'text', placeholder: '123 Main St' },
    { key: 'city', label: 'City', type: 'text', placeholder: 'New York' },
    { key: 'zip', label: 'Zip Code', type: 'text', placeholder: '10001' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        // ÐšÐ¾Ð½Ð²ÐµÑ€Ñ‚ÑƒÑ”Ð¼Ð¾ id Ð² Ñ‡Ð¸ÑÐ»Ð¾, Ð±Ð¾ Ð· URL Ð²Ð¾Ð½Ð¾ Ð¿Ñ€Ð¸Ñ…Ð¾Ð´Ð¸Ñ‚ÑŒ ÑÐº Ñ€ÑÐ´Ð¾Ðº
        const found = PRODUCTS.find(p => p.id === Number(id));
        if (found) {
          this.selectedProduct = found;
        }
      }
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Ð’Ð¸ÐºÐ¾Ñ€Ð¸ÑÑ‚Ð¾Ð²ÑƒÑ”Ð¼Ð¾ title Ð·Ð°Ð¼Ñ–ÑÑ‚ÑŒ name
      alert(`Order for ${this.selectedProduct ? this.selectedProduct.title : 'items'} placed!`);
      this.checkoutForm.reset();
      this.selectedProduct = null;
      this.router.navigate(['/table.component']);
    }
  }
}





