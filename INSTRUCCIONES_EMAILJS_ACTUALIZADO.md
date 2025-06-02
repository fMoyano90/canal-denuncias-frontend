# INSTRUCCIONES ACTUALIZADAS EMAILJS - FORMULARIOS CACCIUTTOLO

## Template HTML para Contacto (Actualizado con Ciudad de Residencia)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nuevo Contacto - {{motivo}}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #2c5f2d; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2c5f2d; }
        .value { background-color: white; padding: 8px; border-left: 4px solid #2c5f2d; margin-top: 5px; }
        .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏢 Nuevo Contacto - Cacciuttolo</h1>
        <p>Motivo: {{motivo}}</p>
    </div>
    
    <div class="content">
        <h2>Datos de Contacto</h2>
        <div class="field">
            <div class="label">👤 Nombre:</div>
            <div class="value">{{name}}</div>
        </div>
        <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">{{email}}</div>
        </div>
        <div class="field">
            <div class="label">📞 Teléfono:</div>
            <div class="value">{{phone}}</div>
        </div>
        {{#company}}
        <div class="field">
            <div class="label">🏢 Empresa:</div>
            <div class="value">{{company}}</div>
        </div>
        {{/company}}
        
        <h2>Información Específica</h2>
        <div class="field">
            <div class="label">📝 Mensaje:</div>
            <div class="value" style="white-space: pre-line;">{{message}}</div>
        </div>
        
        {{#attachment_name}}
        <div class="field">
            <div class="label">📎 Archivo Adjunto:</div>
            <div class="value">{{attachment_name}}</div>
        </div>
        {{/attachment_name}}
    </div>
    
    <div class="footer">
        <p>Este email fue generado automáticamente desde el formulario de contacto de Cacciuttolo</p>
        <p>Fecha: {{date}} | Sistema de Contacto Web</p>
    </div>
</body>
</html>
```

## Configuración de Emails de Destino por Tipo

### Variables de configuración en EmailJS:

```typescript
const EMAIL_CONFIG = {
  trabajo: "reclutamiento@cacciuttolo.cl",
  proveedor: "proveedor@cacciuttolo.cl", 
  cotizacion: "cotizacion@cacciuttolo.cl",
  otro: "otros@cacciuttolo.cl",
  denuncias: "denuncias@cacciuttolo.cl"
};
```

## Template para Denuncias (sin cambios)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nueva Denuncia - Ticket {{ticket_code}}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #d73527; color: white; padding: 20px; text-align: center; }
        .ticket { background-color: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #d73527; }
        .value { background-color: white; padding: 8px; border-left: 4px solid #d73527; margin-top: 5px; }
        .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⚠️ Nueva Denuncia - Canal Cacciuttolo</h1>
        <p>Categoría: {{category}}</p>
    </div>
    
    <div class="ticket">
        <h2>🎫 TICKET DE SEGUIMIENTO</h2>
        <h3 style="font-size: 24px; color: #d73527;">{{ticket_code}}</h3>
        <p>Guarde este código para consultar el estado de su denuncia</p>
    </div>
    
    <div class="content">
        <h2>Datos del Denunciante</h2>
        <div class="field">
            <div class="label">👤 Nombre:</div>
            <div class="value">{{name}}</div>
        </div>
        <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value">{{email}}</div>
        </div>
        <div class="field">
            <div class="label">📞 Teléfono:</div>
            <div class="value">{{phone}}</div>
        </div>
        {{#company}}
        <div class="field">
            <div class="label">🏢 Empresa:</div>
            <div class="value">{{company}}</div>
        </div>
        {{/company}}
        
        <h2>Detalles de la Denuncia</h2>
        <div class="field">
            <div class="label">📝 Descripción:</div>
            <div class="value" style="white-space: pre-line;">{{description}}</div>
        </div>
        
        {{#attachment_name}}
        <div class="field">
            <div class="label">📎 Archivo de Respaldo:</div>
            <div class="value">{{attachment_name}}</div>
        </div>
        {{/attachment_name}}
    </div>
    
    <div class="footer">
        <p>Este email fue generado automáticamente desde el Canal de Denuncias de Cacciuttolo</p>
        <p>Fecha: {{date}} | Ticket: {{ticket_code}}</p>
    </div>
</body>
</html>
```

## Cambios Realizados

### ✅ Nuevo Campo Agregado:
- **Ciudad de Residencia**: Campo obligatorio en la sección "Trabajo"
- Se incluye automáticamente en el email con formato:
  ```
  CARGO POSTULACIÓN: [cargo]
  CIUDAD DE RESIDENCIA: [ciudad]
  PRETENSIONES DE RENTA: [pretensión]
  ```

### 📧 El mensaje final para trabajos ahora incluye:
1. Cargo de postulación
2. **Ciudad de residencia** (NUEVO)
3. Pretensiones de renta
4. Curriculum adjunto (si se sube)

### 🔧 Validación:
- Campo obligatorio con validación HTML5
- Se limpia automáticamente al resetear el formulario
- Se incluye en todas las validaciones del formulario

¡El formulario está listo para usar con el nuevo campo de ciudad de residencia! 