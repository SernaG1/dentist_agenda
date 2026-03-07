# DentistAgenda

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# User History

Agendamiento de cita

Como paciente de la clínica odontológica,
quiero agendar una cita desde la página web,
para reservar una fecha y hora de atención sin necesidad de llamar.

1 - Criterios de aceptación:

- El sistema debe mostrar un formulario de agendamiento.
- Todos los campos (nombre, fecha, hora y motivo) deben ser obligatorios.
- Al guardar la cita, el sistema debe mostrar un mensaje de confirmación.
- La cita debe quedar visible en la sección “Ver citas”.

2- Visualización de servicios odontológicos

Como visitante de la página web,
quiero ver los servicios odontológicos disponibles (diseño de sonrisa, blanqueamiento y ortodoncia),
para conocer los tratamientos que ofrece la clínica antes de agendar una cita.

Criterios de aceptación:
- La página principal debe mostrar tarjetas informativas de cada servicio.
- Cada tarjeta debe incluir imagen, descripción y un enlace.
- Al hacer clic en un servicio, el usuario debe navegar a una página con más información y un video explicativo.
- El diseño debe ser claro, atractivo y responsive.

3- Contacto rápido por WhatsApp

Como usuario interesado en los servicios,
quiero contactar rápidamente a la clínica mediante un botón de WhatsApp,
para resolver dudas sin salir del sitio web.

Criterios de aceptación:

- El botón de WhatsApp debe estar visible en todo momento.
- El botón debe abrir una conversación directa con la clínica.
- El mensaje inicial debe estar predefinido.
- El botón no debe interferir con la navegación del sitio.