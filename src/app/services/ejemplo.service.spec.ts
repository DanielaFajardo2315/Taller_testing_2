// Importar lo necesario
import { TestBed } from '@angular/core/testing'; //permite configurar el entorno de pruebas
import { EjemploService } from './ejemplo.service'; //lo que se va a testear

// Siempre se debe crear al menos un grupo de pruebas
describe('EjemploService', () => {
  let service: EjemploService;

  // Configurar el entorno de pruebas e inyectar lo que necesite
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });

  // Definir los casos individuales de prueba
  it('Debería sumar 2 números correctamente', ()=>{
    const resultado = service.suma(2,5);
    expect(resultado).toBe(7);
  })
});
