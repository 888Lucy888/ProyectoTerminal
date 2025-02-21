# Proyecto Terminal - RAG IIoT

## Miguel Alejandro Vizcaíno González
## Celia Lucia Castañeda Arizaga

El proyecto consiste en una plataforma web para la visualización y análisis de métricas industriales, que permitirá consultar datos en lenguaje natural (RAG) y obtener insights en tiempo real. Los dispositivos IIoT enviarán información a la nube, donde será procesada y almacenada en una base de datos relacional y se utilizará una base vectorial para consultas de lenguaje natural mediante embeddings. La interfaz web mostrará gráficos interactivos y permitirá realizar preguntas a un modelo de lenguaje que impliquen un razonamiento más elaborado.

## Tecnologías Utilizadas

| **Componente**            | **Tecnología**                            |
|---------------------------|-------------------------------------------|
| **Frontend**              | React + Zustand/Redux + ECharts/Recharts |
| **Backend API**          | FastAPI (Python)                         |
| **Ingesta de Datos**      | API Gateway + AWS Lambda                 |
| **Base de Datos**         | PostgreSQL (Amazon RDS)                  |
| **Base de Datos Vectorial** | Qdrant en VPS                           |
| **IA / NLP**              | GPT-4 Turbo o Llama 3 en VPS             |
| **Infraestructura**       | AWS Lightsail, Lambda, API Gateway       |
| **Autenticación**         | AWS Cognito                               |
