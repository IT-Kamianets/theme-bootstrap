import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// Правильні імпорти
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/Product.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class FormPage implements OnInit {
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
        // Конвертуємо id в число, бо з URL воно приходить як рядок
        const found = PRODUCTS.find(p => p.id === Number(id));
        if (found) {
          this.selectedProduct = found;
        }
      }
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Використовуємо title замість name
      alert(`Order for ${this.selectedProduct ? this.selectedProduct.title : 'items'} placed!`);
      this.checkoutForm.reset();
      this.selectedProduct = null;
      this.router.navigate(['/table']);
    }
  }
}