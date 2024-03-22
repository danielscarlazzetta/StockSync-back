<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



instalacion de typeorm
npm install --save @nestjs/typeorm typeorm

class validator install
npm install --save class-validator


json para crear usuario:
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correo": "juan@example.com",
  "numTel": "+56912345678",
  "direccion": "Calle Principal",
  "numero_direccion": 123
}

instalar mysql2
npm install --save @nestjs/typeorm typeorm mysql2






|- company/
|  |- company.module.ts         // Módulo de empresas
|  |- company.service.ts        // Servicio de empresas
|  |- company.controller.ts     // Controlador de empresas
|  |- company.entity.ts         // Entidad de empresa
|  |- dto/                      // DTOs para las empresas
|     |- create-company.dto.ts // DTO para crear empresa
|- plan/
|  |- plan.module.ts            // Módulo de planes
|  |- plan.service.ts           // Servicio de planes
|  |- plan.controller.ts        // Controlador de planes
|  |- plan.entity.ts            // Entidad de plan
|  |- dto/                      // DTOs para los planes
|     |- select-plan.dto.ts 


Selección de Plan:

Ofrece a los usuarios la opción de seleccionar un plan entre los disponibles (básico, medio, pro).
Almacena la selección del plan en la sesión o en la base de datos temporalmente.
Registro de Usuario (Propietario de la Empresa):

Después de seleccionar el plan, permite al usuario registrarse como el propietario de la empresa.
Permite al usuario definir su rol dentro de la empresa (por ejemplo, administrador).
Almacena la información del usuario registrado en la base de datos, marcándolo como el propietario de la empresa y asignándole el rol correspondiente.
Creación de la Empresa:

Después de que el propietario de la empresa se haya registrado, permite que cree una nueva empresa.
Almacena la información de la empresa en la base de datos y asocia al propietario con la empresa creada.
Creación de Usuarios Adicionales:

Si el plan seleccionado permite más de un usuario, permite al propietario de la empresa agregar usuarios adicionales.
Para planes medios y pro, permite al propietario de la empresa agregar usuarios adicionales y asignarles roles específicos dentro de la empresa.
Asignación de Roles a los Usuarios:

Después de agregar usuarios adicionales, permite al propietario de la empresa asignar roles específicos a cada usuario dentro de la empresa.
Finalización del Registro:

Una vez completado el proceso de registro y se han creado todos los usuarios y empresas necesarios, redirige al usuario a la página de inicio de sesión o a la página de inicio de la aplicación.