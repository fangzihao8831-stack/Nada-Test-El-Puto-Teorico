# Funcionalidades Futuras - Nadatest

Este documento describe funcionalidades avanzadas planificadas para fases posteriores del proyecto.

---

## 1. Consulta de Notas DGT

### Descripcion
Permitir a los usuarios consultar sus resultados de examenes oficiales de la DGT directamente desde Nadatest.

### Flujo de Usuario
1. Usuario accede a seccion "Mis Notas DGT"
2. Se autentica con Cl@ve o Certificado Digital
3. Sistema consulta el portal de la DGT
4. Muestra resultados: fecha, tipo examen, resultado, fallos

### Retos Tecnicos
- **No existe API publica de la DGT** - Requiere web scraping o integracion no oficial
- **Autenticacion**: Necesita Cl@ve PIN, Cl@ve Permanente o Certificado Digital
- **Sesiones**: Las sesiones de Cl@ve expiran rapidamente
- **Cambios en el portal**: La DGT puede cambiar su web sin previo aviso

### Opciones de Implementacion

#### Opcion A: Scraping con Puppeteer/Playwright
```
Usuario -> Nadatest -> Headless Browser -> Portal DGT -> Scraping -> Usuario
```
- Pros: Control total, sin dependencias externas
- Contras: Fragil, puede romper con cambios en DGT, zona gris legal

#### Opcion B: Extension de navegador
```
Usuario -> Extension -> Portal DGT -> Extrae datos -> Envia a Nadatest
```
- Pros: Usuario controla sus datos, mas transparente
- Contras: Requiere instalacion, solo funciona en desktop

#### Opcion C: Integracion manual
```
Usuario -> Descarga PDF de DGT -> Sube a Nadatest -> OCR/Parser -> Datos
```
- Pros: Simple, legal, sin mantenimiento
- Contras: Friccion para usuario, no automatico

### Recomendacion
Empezar con **Opcion C** (subida manual de PDF) por ser la mas segura legalmente. Evaluar opciones automatizadas cuando haya volumen de usuarios.

---

## 2. Servicio de Inscripcion DGT

### Descripcion
Ofrecer a usuarios la posibilidad de inscribirse en convocatorias de examen DGT a traves de Nadatest, cobrando una comision por el servicio.

### Modelo de Negocio
- **Tasa DGT**: ~94.05 EUR (precio oficial 2024)
- **Comision Nadatest**: 5-10 EUR por gestion
- **Total usuario**: ~100-105 EUR

### Flujo de Usuario
1. Usuario solicita inscripcion desde Nadatest
2. Paga tasa DGT + comision via Stripe/PayPal
3. Nadatest gestiona la inscripcion (manual o automatizada)
4. Usuario recibe confirmacion y fecha de examen
5. Recordatorios automaticos antes del examen

### Servicios Incluidos
- Gestion completa de inscripcion
- Seleccion de fecha/centro preferido
- Recordatorios por email/SMS
- Soporte si hay problemas
- Reagendamiento (si la DGT lo permite)

### Retos Tecnicos
- **Autenticacion DGT**: Requiere datos del usuario o autorizacion
- **Disponibilidad**: Las plazas se agotan rapido
- **Pagos**: Manejar el dinero de tasas oficiales
- **Responsabilidad**: Si falla la inscripcion, hay que devolver dinero

### Requisitos Legales

#### RGPD (Proteccion de Datos)
- Consentimiento explicito para manejar datos personales
- Politica de privacidad detallada
- Derecho a eliminacion de datos
- No almacenar credenciales de Cl@ve

#### Intermediacion de Pagos
- Nadatest NO debe retener fondos de tasas DGT
- Usar pasarela de pago certificada (Stripe, PayPal)
- Separar claramente: tasa oficial vs comision
- Facturas/recibos para ambos conceptos

#### PCI-DSS (si se manejan tarjetas)
- Usar Stripe Elements o similar (nunca tocar datos de tarjeta)
- HTTPS obligatorio
- No almacenar CVV/numero completo

#### Terminos de Servicio
- Clarificar que Nadatest es intermediario, no la DGT
- Politica de reembolsos clara
- Limitacion de responsabilidad

### Implementacion Sugerida

#### Fase 1: Manual asistido
- Usuario paga en Nadatest
- Equipo humano realiza inscripcion manualmente
- Confirmacion por email

#### Fase 2: Semi-automatizado
- Formulario captura todos los datos necesarios
- Scripts asisten al equipo humano
- Notificaciones automaticas

#### Fase 3: Automatizado (si es viable)
- Integracion directa con portal DGT
- Proceso completamente automatico
- Solo intervencion humana en errores

---

## 3. Funcionalidades Adicionales Futuras

### 3.1 App Movil Nativa
- React Native o Flutter
- Modo offline para tests
- Notificaciones push
- Sincronizacion con cuenta web

### 3.2 Simulador de Examen Practico
- Videos 360 de situaciones reales
- Preguntas sobre que harias
- Preparacion para examen practico

### 3.3 Comunidad
- Foro de dudas
- Ranking de usuarios
- Logros y badges
- Grupos de estudio

### 3.4 Integracion con Autoescuelas
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
- CDN para imagenes (Cloudinary ya incluido)
- Cache de preguntas frecuentes
- Base de datos read replicas si hay mucho trafico

### Costes Estimados (por 10,000 usuarios activos/mes)
- Supabase Pro: ~25 EUR/mes
- Vercel Pro: ~20 EUR/mes
- Cloudinary: ~50 EUR/mes
- OpenAI (generacion): ~100 EUR inicial, luego minimo
- **Total**: ~100 EUR/mes operativo

### Metricas a Monitorizar
- Tasa de aprobados de usuarios
- Tiempo medio de estudio
- Tests completados por usuario
- Conversion free -> premium (si aplica)
- NPS (satisfaccion)

---

## 5. Roadmap Sugerido

### Fase 1: MVP (Actual)
- Tests con preguntas
- Modo examen y estudio
- Autenticacion basica
- Materiales de estudio

### Fase 2: Mejoras (3-6 meses)
- Mas tests y preguntas
- Estadisticas avanzadas
- Mejoras UX basadas en feedback

### Fase 3: Monetizacion (6-12 meses)
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
