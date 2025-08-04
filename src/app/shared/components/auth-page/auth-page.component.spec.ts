import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AuthPageComponent, FormsModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to admin on correct password', () => {
    component.password = 'test12345';
    component.validatePassword();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should show error on incorrect password', () => {
    component.password = 'wrongpassword';
    component.validatePassword();

    expect(component.errorMessage).toBe('Netočna lozinka. Pokušajte ponovno.');
    expect(component.password).toBe('');
  });

  it('should validate password on Enter key press', () => {
    spyOn(component, 'validatePassword');
    const event = new KeyboardEvent('keypress', { key: 'Enter' });

    component.onKeyPress(event);

    expect(component.validatePassword).toHaveBeenCalled();
  });
});
