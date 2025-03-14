# Arquitectura para un Sistema IIoT con RAG Integrado

## Equipo
- **Miguel Alejandro Vizcaíno González**
- **Celia Lucía Castañeda Arizaga**

## Estructura General

### Frontend
Aplicación web en **React** con gráficos en **Recharts** o **Apache ECharts** (mejor para escalabilidad y rendimiento), con **Zustand** para manejo de estados. Se utilizará **carga diferida** para optimización de rendimiento.

- **Autenticación**: AWS Cognito para manejar usuarios de manera segura.

### API de Consultas
- **Framework**: FastAPI para manejar solicitudes en lenguaje natural.

### Modelo de Lenguaje
- **Opción 1 (Calidad máxima)**: OpenAI **GPT-4 Turbo**.
- **Opción 2 (Económica)**: Llama 3 en un **VPS** para reducir costos.
  - *Si se usa Llama 3, se podría necesitar fine-tuning para mejorar la calidad de respuestas*.

### Base de Datos
- **Relacional**: Amazon **RDS con PostgreSQL** (gestionado para reducir mantenimiento, con diseño de esquema adecuado e indexación para optimizar búsquedas).
- **Vectorial**: **Qdrant en un VPS** (más económico que OpenSearch).  
  - *Se recomienda monitorear el uso de recursos del VPS conforme aumente el tráfico*.

### Infraestructura
- **Amazon Lightsail** (para API y BD vectorial).
- **AWS Lambda** (para procesos event-driven).

### Ingesta de Datos IIoT
- **Recepción**: API HTTP con **Amazon API Gateway**.
- **Procesamiento**: **AWS Lambda** para almacenamiento en **PostgreSQL**.
  - *Optimizar tiempo de ejecución de Lambda (cold starts, invocaciones innecesarias).*

---

## Componentes Clave

### 📊 Almacenamiento de Métricas
- **Base de datos**: Amazon **RDS - PostgreSQL**.
- **Datos almacenados**: OEE, tiempos de paro, sensores, etc.
- **Costo estimado**: ~$15-20/mes en un plan básico de RDS.

### 🔍 Base de Datos Vectorial
- **Tecnología**: **Qdrant** en VPS.
- **Beneficios**: Open-source, eficiente en búsquedas de embeddings.
- **Costo estimado**: ~$5-10/mes en un VPS económico (Hetzner, Contabo).

### 🤖 Modelo de Lenguaje
- **Opción 1 (Máxima calidad)**: OpenAI **GPT-4 Turbo**.
- **Opción 2 (Económica)**: Llama 3 en un **VPS con 16GB RAM**.

### 🚀 API para Consultas y Orquestación
- **Backend API**: **FastAPI** en **Lightsail** para manejar consultas.
- **Procesamiento Serverless**: AWS Lambda para consultas event-driven de métricas.

### ☁️ Infraestructura Escalable
- **Amazon Lightsail** para API y base de datos vectorial.
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
2. **FastAPI** convierte la pregunta en un embedding y busca en **Qdrant**.

### 📊 Generación de Respuesta
1. Los datos relevantes se combinan con la pregunta y se envían a **GPT-4** o **Llama 3**.
2. El modelo genera una **respuesta enriquecida**.

### 📈 Visualización en Tiempo Real
1. El usuario recibe la respuesta en la app.
2. Puede ver métricas en **gráficos interactivos**.

---

## 📌 Tecnologías Utilizadas

| **Componente** | **Tecnología** |
|--------------|----------------|
| **Frontend** | React + Zustand/Redux + ECharts/Recharts |
| **Backend API** | FastAPI (Python) |
| **Ingesta de Datos** | API Gateway + AWS Lambda |
| **Base de Datos** | PostgreSQL (Amazon RDS) |
| **Base de Datos Vectorial** | Qdrant en VPS |
| **IA / NLP** | GPT-4 Turbo o Llama 3 en VPS |
| **Infraestructura** | AWS Lightsail, Lambda, API Gateway |
| **Autenticación** | AWS Cognito |

---

### 🚀 ¿Cómo Contribuir?
1. Clona este repositorio:
   ```sh
   git clone https://github.com/888Lucy888/ProyectoTerminal
