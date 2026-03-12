import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductsPage } from './products.page';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 mock products', () => {
    expect(component.products.length).toBe(6);
  });

  it('should render a row for each product', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-item.product-item'));
    expect(items.length).toBe(component.products.length);
  });

  it('each row should include a right chevron icon in the end slot', () => {
    const icons = fixture.debugElement.queryAll(By.css('ion-item.product-item ion-icon[slot="end"][name="chevron-forward-outline"]'));
    expect(icons.length).toBe(component.products.length);
  });

  it('should render product name and price text', () => {
    const first = component.products[0];
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain(first.name);
    expect(text).toMatch(/\$\s?\d/);
  });
});
