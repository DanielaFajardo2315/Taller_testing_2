import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
// configurar el cliente HTTP
import { provideHttpClient } from "@angular/common/http";
// herramientas para SIMULAR las solicitudes HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

describe('LoginService', () => {
    // definir nuestros mock → simulación relacionada con peticiones a un Api
    let httpMock : HttpTestingController;
    let service : LoginService;
    const credencialMock = {
        email: 'pablito@example.com',
        password: '123'
    }
    const tokenMock = 'adsfgvbvsdcdfgmmhgfsgdvbhgmh,mlkzvdlkfd'
    
    beforeEach(() => {
        // La configuración inicial del entorno de pruebas
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);
    })

    // Definir los casos de prueba
    // Caso 1: Simular la petición POST para iniciar sesión
    it('Simular la petición POST para iniciar sesión', ()=>{
        const apiUrl = 'http://localhost:9000/iniciarSesion';
        const responseMock = {"mensaje": "Inicio de sesión exitoso"};
        
        service.login(credencialMock.email, credencialMock.password).subscribe(
            (res) => {
                expect(res).toEqual(responseMock)
            }
        )
        
        // simulación de petición s un back
        const req = httpMock.expectOne(apiUrl); //esa simulación se espera que sea igual a la url dada
        expect(req.request.method).toBe('POST');
        req.flush(responseMock);
    });
    
    // Caso 2: Simular la obteneción del token
    it('Obtener token', () => {
        localStorage.setItem('token', tokenMock);
        expect(service.getToken()).toBe(tokenMock); //debe traer exactamente el mismo token que se guarda en el localStorage
    });
    // Caso 3: Simular si está loggeado
    it('Verificar si está logueado', () => {
        localStorage.setItem('token', tokenMock);
        expect(service.isLoggedIn()).toBeTrue(); //retorna el token
    });
    // Caso 4: Simular si se cierra sesión
    it('Verificar si se cierra sesión', () => {
        localStorage.setItem('token', tokenMock);
        service.logout(); //primero cerrar sesión
        expect(localStorage.getItem('token')).toBeNull(); //validar el cierre de sesión exitoso
    });
});