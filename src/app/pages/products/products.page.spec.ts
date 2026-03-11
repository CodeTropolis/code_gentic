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

  it('should render a list of products', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-list.products-list ion-item.row'));
    expect(items.length).toBeGreaterThan(0);
  });

  it('should render the correct row count', () => {
    const items = fixture.debugElement.queryAll(By.css('ion-list.products-list ion-item.row'));
    expect(items.length).toBe(component.products.length);
  });

  it('each row should include a chevron icon in the end slot', () => {
    const icons = fixture.debugElement.queryAll(By.css('ion-item.row ion-icon[slot="end"][name="chevron-forward-outline"]'));
    expect(icons.length).toBe(component.products.length);
  });

  it('should render product name and price text', () => {
    const first = component.products[0];
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain(first.name);
    expect(text).toContain(first.price);
  });
});
