# Bob's Corn API

## 🌟 Overview
A modern, clean API application following domain-driven design principles and best practices.

## 🏗️ Architecture Overview

```
API/
├── BobCorn.Domain/             # Enterprise/domain entities & business rules
├── BobCorn.Application/        # Business logic & use cases
├── BobCorn.Infrastructure/     # External concerns (database, file systems, etc.)
├── BobCorn.API/                # User interface & API endpoints
```

### Layer Details

#### 🎯 Domain Layer
- Contains enterprise/business logic
- Entities
- Value Objects
- Domain Events
- Interfaces
- Business Rules
- No dependencies on other layers

#### 🔄 Application Layer
- Contains application logic
- Implements use cases
- DTOs
- Interfaces
- Service implementations
- Dependencies: Domain layer

#### 🛠️ Infrastructure Layer
- Implementation of interfaces from Domain/Application layers
- Database contexts
- Repositories implementations
- External service implementations
- Dependencies: Domain and Application layers

#### 🌐 Api Layer
- API Controllers
- API Models
- Middleware
- Dependencies: Application layer

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK or later
- Visual Studio 2022 or VS Code
- SQL Server (optional - API uses InMemory database by default)

### Installation

1. Clone the repository
```bash
git clone https://github.com/OliverCorsino/bob-corn.git
cd src/API
```

2. Build the solution
```bash
dotnet build
```

3. Run the application
```bash
cd BobCorn.API
dotnet run
```

## 📝 Project Structure

```
API/
├── BobCorn.Domain/
│   ├── Entities/
│   │   └── 
│   └── Interfaces/
│       └── IProductRepository.cs
│
├── BobCorn.Application/
│   ├── DTOs/
│   │   └── ProductDto.cs
│   ├── Interfaces/
│   │   └── IProductService.cs
│   └── Services/
│       └── ProductService.cs
│
├── BobCorn.Infrastructure/
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   └── Repositories/
│       └── ProductRepository.cs
│
├── BobCorn.API/
│   ├── Controllers/
│   │   └── ProductsController.cs
│   └── Program.cs
```

## 🛠️ Technology Stack

- **.NET 8.0**: Modern, high-performance framework
- **Dapper**: ORM for data access
- **Swagger/OpenAPI**: API documentation
- **InMemory Database**: For testing and development

## 🎯 Features

- ✅ Clean Architecture implementation
- ✅ Domain-Driven Design principles
- ✅ SOLID principles
- ✅ InMemory database for testing
- ✅ Swagger documentation
- ✅ API versioning
- ✅ Dependency Injection
- ✅ Async/await best practices

## 🙏 Acknowledgments

- Jenil Sojitra Clean Architecture Documentation
- Microsoft .NET Documentation
- Dapper Documentation
