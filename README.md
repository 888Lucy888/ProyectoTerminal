# Arquitectura para un Sistema IIoT con RAG Integrado

## Equipo

- **Miguel Alejandro Vizcaíno González**
- **Celia Lucía Castañeda Arizaga**

## Estructura General

### Frontend

Aplicación web en **React** con gráficos en **Recharts**.

- **Autenticación**: AWS Cognito para manejar usuarios de manera segura.

### API de Consultas

- **Framework**: FastAPI para manejar solicitudes en lenguaje natural.

### Modelo de Lenguaje

- OpenAI **GPT-4 Turbo**.

### Base de Datos

- **Relacional**: Amazon **RDS con PostgreSQL** (gestionado para reducir mantenimiento, con diseño de esquema adecuado e indexación para optimizar búsquedas).

### Infraestructura

- **Amazon Lightsail** para API.
- **AWS Lambda** para procesos event-driven.

### Ingesta de Datos IIoT

- **Recepción**: API HTTP con **Amazon API Gateway**.
- **Procesamiento**: **AWS Lambda** para almacenamiento en **PostgreSQL**.

---

## Componentes Clave

### 📊 Almacenamiento de Métricas

- **Base de datos**: Amazon **RDS - PostgreSQL**.
- **Datos almacenados**: OEE, tiempos de paro, sensores, etc.
- **Costo estimado**: \~\$15-20/mes en un plan básico de RDS.

### 🤖 Modelo de Lenguaje

- **LLM**: OpenAI **GPT-4 Turbo**.

### 🚀 API para Consultas y Orquestación

- **Backend API**: **FastAPI** en **Lightsail** para manejar consultas.
- **Procesamiento Serverless**: AWS Lambda para consultas event-driven de métricas.

### ☁️ Infraestructura Escalable

- **Amazon Lightsail** para API.
- **AWS Lambda** para procesamiento sin servidor.
- **API Gateway** para comunicación segura con dispositivos IIoT.

---

## 🔄 Flujo de Trabajo

### 📡 Captura de Datos IIoT

1. Los dispositivos envían datos por **API HTTP**.
2. **AWS API Gateway** recibe y redirige los datos.
3. **AWS Lambda** los almacena en **PostgreSQL**.

### 🗣 Consulta en Lenguaje Natural

1. El usuario pregunta en la app web (Ej. *“¿Cuál fue el tiempo de inactividad ayer?”*).
2. **FastAPI** convierte la pregunta en un query de SQL y consulta los datos en **Amazon RDS**.

### 📊 Generación de Respuesta

1. Los datos obtenidos a través de SQL se combinan con la pregunta y se envían a **GPT-4**.
2. El modelo genera una **respuesta enriquecida**.

### 📈 Visualización en Tiempo Real

1. El usuario recibe la respuesta en la app.
2. Puede ver métricas en **gráficos interactivos**.

---

## 📌 Tecnologías Utilizadas

| **Componente**       | **Tecnología**                     |
| -------------------- | ---------------------------------- |
| **Frontend**         | React + /Recharts                  |
| **Backend API**      | FastAPI (Python)                   |
| **Ingesta de Datos** | API Gateway + AWS Lambda           |
| **Base de Datos**    | PostgreSQL (Amazon RDS)            |
| **IA / NLP**         | GPT-4 Turbo                        |
| **Infraestructura**  | AWS Lightsail, Lambda, API Gateway |
| **Autenticación**    | AWS Cognito                        |

