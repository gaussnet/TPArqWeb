# Trabajo Práctico Arquitectura Web
- Nombre del grupo: BancAPI
- Integrante: Juan Manuel Urdinola
- Descripción del negocio elegido: Se trata de un banco que pretende implementar una API para la gestión de clientes y sus cuentas (ABM) y transferencias entre cuentas. Los clientes pueden tener varias cuentas. Las cuentas pueden ser Caja de Ahorro (CA) o Cuenta Corriente (CC)

## Endpoints
- Obtiene todos los clientes:
```HTTP
GET /api/clientes
	RESPONSE:
		200 Operación exitosa
			[
				{
			    “id”:11876439 	,
					“Nombre”: “Pepe”,
					“Apellido”: “Garcia”
				},
				{
			    “id”:11876439 	,
					“Nombre”: “Pepe”,
					“Apellido”: “Garcia”
				}
			]
		404 Cliente no encontrado
```    

- Obtiene un cliente X específico:
```HTTP
GET /api/clientes/X
	RESPONSE:
		200 operación exitosa
			{
		    “id”:11876439,
		    “Nombre”: “Pepe”,
		    “Apellido”: “Garcia”
			}
		400 ID de cliente inválido
		404 Cliente no encontrado
```

- Crea un nuevo cliente:
```HTTP
POST /api/clientes
	{
    “id”:11876439,
		"Nombre": “Pepe”,
		“Apellido”: “Garcia”
	}

	RESPONSE
		200 Operación exitosa
		400 Datos inválidos
```

- Actualiza un cliente X existente:
```HTTP
PUT /api/clientes/X
	{
		"Nombre": “Pepe”,
		“Apellido”: “Garcia”
	}

	RESPONSE
		200 Operación exitosa
    400 ID de cliente inválido
		404 Cliente no encontrado
```

- Elimina un cliente X existente:
```HTTP
DELETE /api/clientes/X
	RESPONSE
		200 Operación exitosa
		400 ID de cliente inválido
		404 Cliente no encontrado
```

- Obtiene las cuentas de un cliente X:
```HTTP
GET /api/clientes/X/cuentas
	RESPONSE:
		200 Operación exitosa
			[
				{
				  “nroCuenta”: 5453453,
				  “tipo”: “CA,
				  “saldo”: 234,25
				},
				{
				  “nroCuenta”: 128754,
				  “tipo”: “CC,
				  “saldo”: 3456,45
				}
			]
		400 ID de cliente inválido
		404 Cliente no encontrado
		404 Cuenta no encontrada
```

- Obtiene la cuenta Y de un cliente X:
```HTTP
GET /api/clientes/X/cuentas/Y
	RESPONSE:
		200 Operación exitosa
			{
			  “nroCuenta”: 5453453,
			  “tipo”: “CA,
			  “saldo”: 234,25
			}
		400 ID de cliente inválido
		404 Cliente no encontrado
		400 ID de cuenta inválido
		404 Cuenta no encontrada
```
  
- Crea una cuenta nueva para el cliente X:
```HTTP
POST /api/clientes/X/cuentas			
	{
		“nroCuenta”: 5453453,
		“tipo”: “CA,
		“saldo”: 234,25
	}

	RESPONSE
		200 Operación exitosa
		400 ID de cliente inválido
		404 Cliente no encontrado
```

- Actualiza la cuenta Y del cliente X:
```HTTP
PUT /api/clientes/X/cuentas/Y
	{
		“tipo”: “CA,
		“saldo”: 234,25
	}

	RESPONSE
		200 Operación exitosa
		400 ID de cliente inválido
		404 Cliente no encontrado
		400 ID de cuenta inválido
		404 Cuenta no encontrada
```

- Elimina la cuenta Y del cliente X:
```HTTP
DELETE /api/clientes/X/cuentas/Y
	RESPONSE
		200 Operación exitosa
		400 ID de cliente inválido
		404 Cliente no encontrado
		400 ID de cuenta inválido
		404 Cuenta no encontrada	
```

- Realiza una transferencia desde la cuenta Y del cliente X a la cuenta especificada en el body:
```HTTP
POST /api/clientes/X/cuentas/Y/transferencias
	{
	  “destino”: 534535,
	  “monto”: 56345
	}
	RESPONSE
		200 Operación exitosa
		400 ID de cliente inválido
		404 Cliente no encontrado
		400 ID de cuenta inválido
		404 Cuenta no encontrada
```
