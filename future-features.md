# Funcionalidades Futuras - Nadatest

Este documento describe funcionalidades avanzadas planificadas para fases posteriores del proyecto.

---

## Funcionalidades Completadas

### Consulta de Notas DGT
**Estado**: Implementada en `/notas-dgt`

La consulta de notas DGT está integrada en la aplicación con:
- Formulario de consulta por NIF (`components/dgt/consulta-nota-form.tsx`)
- Visualizacion de resultados (`components/dgt/resultado-nota.tsx`)
- Historial de consultas (`components/dgt/historial-notas.tsx`)
- API route en `/api/dgt/consulta-nota` para la integracion externa
- Validacion de NIF (`lib/dgt/validate-nif.ts`)

---

## 2. Servicio de Inscripción DGT

### Descripción
Ofrecer a usuarios la posibilidad de inscribirse en convocatorias de examen DGT a través de Nadatest, cobrando una comisión por el servicio.

### Modelo de Negocio
- **Tasa DGT**: ~94.05 EUR (precio oficial 2024)
- **Comisión Nadatest**: 5-10 EUR por gestión
- **Total usuario**: ~100-105 EUR

### Flujo de Usuario
1. Usuario solicita inscripción desde Nadatest
2. Paga tasa DGT + comisión vía Stripe/PayPal
3. Nadatest gestiona la inscripción (manual o automatizada)
4. Usuario recibe confirmación y fecha de examen
5. Recordatorios automáticos antes del examen

### Servicios Incluidos
- Gestión completa de inscripción
- Selección de fecha/centro preferido
- Recordatorios por email/SMS
- Soporte si hay problemas
- Reagendamiento (si la DGT lo permite)

### Retos Técnicos
- **Autenticación DGT**: Requiere datos del usuario o autorización
- **Disponibilidad**: Las plazas se agotan rápido
- **Pagos**: Manejar el dinero de tasas oficiales
- **Responsabilidad**: Si falla la inscripción, hay que devolver dinero

### Requisitos Legales

#### RGPD (Protección de Datos)
- Consentimiento explícito para manejar datos personales
- Política de privacidad detallada
- Derecho a eliminación de datos
- No almacenar credenciales de Cl@ve

#### Intermediación de Pagos
- Nadatest NO debe retener fondos de tasas DGT
- Usar pasarela de pago certificada (Stripe, PayPal)
- Separar claramente: tasa oficial vs comisión
- Facturas/recibos para ambos conceptos

#### PCI-DSS (si se manejan tarjetas)
- Usar Stripe Elements o similar (nunca tocar datos de tarjeta)
- HTTPS obligatorio
- No almacenar CVV/número completo

#### Términos de Servicio
- Clarificar que Nadatest es intermediario, no la DGT
- Política de reembolsos clara
- Limitación de responsabilidad

### Implementación Sugerida

#### Fase 1: Manual asistido
- Usuario paga en Nadatest
- Equipo humano realiza inscripción manualmente
- Confirmación por email

#### Fase 2: Semi-automatizado
- Formulario captura todos los datos necesarios
- Scripts asisten al equipo humano
- Notificaciones automáticas

#### Fase 3: Automatizado (si es viable)
- Integración directa con portal DGT
- Proceso completamente automático
- Solo intervención humana en errores

---

## 3. Funcionalidades Adicionales Futuras

### 3.1 App Móvil Nativa
- React Native o Flutter
- Modo offline para tests
- Notificaciones push
- Sincronización con cuenta web

### 3.2 Simulador de Examen Práctico
- Videos 360 de situaciones reales
- Preguntas sobre qué harías
- Preparación para examen práctico

### 3.3 Comunidad
- Foro de dudas
- Ranking de usuarios
- Logros y badges
- Grupos de estudio

### 3.4 Integración con Autoescuelas
- Panel para autoescuelas
- Seguimiento de alumnos
- Licencias por volumen
- Marca blanca

### 3.5 Otros Permisos
- Permiso A (motos)
- Permiso C (camiones)
- Permiso D (autobuses)
- CAP (transporte profesional)

---

## 4. Consideraciones de Escalabilidad

### Infraestructura
- CDN para imágenes (Cloudinary ya incluido)
- Caché de preguntas frecuentes
- Base de datos read replicas si hay mucho tráfico

### Costes Estimados (por 10,000 usuarios activos/mes)
- Supabase Pro: ~25 EUR/mes
- Vercel Pro: ~20 EUR/mes
- Cloudinary: ~50 EUR/mes
- OpenAI (generación): ~100 EUR inicial, luego mínimo
- **Total**: ~100 EUR/mes operativo

### Métricas a Monitorizar
- Tasa de aprobados de usuarios
- Tiempo medio de estudio
- Tests completados por usuario
- Conversión free -> premium (si aplica)
- NPS (satisfacción)

---

## 5. Roadmap Sugerido

### Fase 1: MVP (Actual)
- Tests con preguntas
- Modo examen y estudio
- Autenticación básica
- Materiales de estudio

### Fase 2: Mejoras (3-6 meses)
- Más tests y preguntas
- Estadísticas avanzadas
- Mejoras UX basadas en feedback

### Fase 3: Monetización (6-12 meses)
- Servicio de inscripcion DGT
- Plan premium con funciones extra
- Integracion autoescuelas

### Fase 4: Expansion (12+ meses)
- App movil
- Otros permisos
- Internacionalizacion (otros paises EU)

---

## Notas Importantes

1. **Legalidad**: Consultar con abogado antes de implementar servicios que interactuen con la DGT
2. **Privacidad**: Nunca almacenar credenciales de Cl@ve o certificados digitales
3. **Responsabilidad**: Tener seguro de responsabilidad civil si se gestionan inscripciones
4. **Competencia**: Analizar que hacen otras plataformas (Todotest, Autoescuela.net)

---

*Documento de planificacion - Funcionalidades sujetas a viabilidad tecnica y legal*
