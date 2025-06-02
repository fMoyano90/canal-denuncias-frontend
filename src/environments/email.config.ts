// Configuración EmailJS para Cacciuttolo
// INSTRUCCIONES PARA CONFIGURAR EmailJS:

// 1. Ve a https://www.emailjs.com/ y crea una cuenta
// 2. Crea un servicio de email (Gmail, Outlook, etc.)
// 3. Obtén tu Public Key desde la sección Account > General
// 4. Crea dos templates de email:

// TEMPLATE 1 - CONTACTO:
// Nombre: contacto_template
// Variables a usar en el template:
// - {{from_name}} - Nombre del remitente
// - {{from_email}} - Email del remitente  
// - {{phone}} - Teléfono
// - {{company}} - Empresa
// - {{message}} - Mensaje completo
// - {{motivo}} - Motivo del contacto
// - {{attachment}} - Archivo adjunto (base64) - máx. 50KB
// - {{attachment_name}} - Nombre del archivo
// - {{attachment_size}} - Tamaño del archivo

// TEMPLATE 2 - DENUNCIAS:
// Nombre: denuncia_template
// Variables a usar en el template:
// - {{ticket_code}} - Código único del ticket
// - {{from_name}} - Nombre del denunciante
// - {{from_email}} - Email del denunciante
// - {{phone}} - Teléfono
// - {{company}} - Empresa
// - {{category}} - Categoría de la denuncia
// - {{description}} - Descripción completa
// - {{submission_date}} - Fecha de envío
// - {{attachment}} - Archivo adjunto (base64) - máx. 50KB
// - {{attachment_name}} - Nombre del archivo
// - {{attachment_size}} - Tamaño del archivo

export const EmailConfig = {
  // Reemplaza con tus valores reales de EmailJS
  SERVICE_ID: 'service_frm_web', // e.g. 'service_1234567'
  CONTACT_TEMPLATE_ID: 'template_p8fmngd', // e.g. 'template_contacto'
  DENUNCIA_TEMPLATE_ID: 'template_ivw48eo', // e.g. 'template_denuncia'
  PUBLIC_KEY: 'EJAoCBzHiMZdBwyqi', // e.g. 'abcd1234567890'
  
  // Emails de destino por tipo de contacto
  RECLUTAMIENTO_EMAIL: 'reclutamiento@cacciuttolo.cl',
  PROVEEDOR_EMAIL: 'proveedor@cacciuttolo.cl',
  COTIZACION_EMAIL: 'cotizacion@cacciuttolo.cl',
  OTROS_EMAIL: 'otros@cacciuttolo.cl',
  
  // Email para denuncias
  DENUNCIA_EMAIL: 'denuncias@cacciuttolo.cl'
};

// Ejemplo de template HTML para CONTACTO:
/*
<h2 style="color: #01417F;">Nuevo mensaje de contacto - {{motivo}}</h2>
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
  <p><strong>De:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Teléfono:</strong> {{phone}}</p>
  <p><strong>Empresa:</strong> {{company}}</p>
  <p><strong>Motivo:</strong> {{motivo}}</p>
</div>

<h3>Mensaje:</h3>
<div style="background-color: #e7f3ff; padding: 15px; border-left: 4px solid #01417F; margin: 20px 0;">
  {{{message}}}
</div>

{{#attachment}}
<div style="background-color: #fff3cd; padding: 10px; border-radius: 5px;">
  <h4>📎 Archivo Adjunto:</h4>
  <p><strong>Nombre:</strong> {{attachment_name}}</p>
  <p><strong>Tamaño:</strong> {{attachment_size}}</p>
</div>
{{/attachment}}

<hr>
<p style="color: #666; font-size: 12px;">
  Este mensaje fue enviado desde el formulario de contacto del sitio web de Cacciuttolo.
</p>
*/

// Ejemplo de template HTML para DENUNCIAS:
/*
<h2 style="color: #dc3545;">🎫 Nueva Denuncia Recibida</h2>

<div style="background-color: #fff3cd; padding: 15px; border: 2px solid #ffc107; border-radius: 5px; margin: 20px 0;">
  <h3 style="margin: 0; color: #856404;">CÓDIGO DE TICKET: {{ticket_code}}</h3>
</div>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background-color: #f8f9fa;">
    <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Categoría:</strong></td>
    <td style="padding: 10px; border: 1px solid #dee2e6;">{{category}}</td>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #dee2e6;"><strong>Fecha:</strong></td>
    <td style="padding: 10px; border: 1px solid #dee2e6;">{{submission_date}}</td>
  </tr>
</table>

<h3>📋 Datos del Denunciante:</h3>
<div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
  <p><strong>Nombre:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Teléfono:</strong> {{phone}}</p>
  <p><strong>Empresa:</strong> {{company}}</p>
</div>

<h3>📝 Descripción:</h3>
<div style="background-color: #fff5f5; padding: 15px; border-left: 4px solid #dc3545; margin: 20px 0;">
  {{{description}}}
</div>

{{#attachment}}
<div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
  <h4>📎 Archivo Adjunto:</h4>
  <p><strong>Nombre:</strong> {{attachment_name}}</p>
  <p><strong>Tamaño:</strong> {{attachment_size}}</p>
</div>
{{/attachment}}

<hr>
<div style="background-color: #d1ecf1; padding: 15px; border-radius: 5px;">
  <h4 style="color: #0c5460;">⚠️ Instrucciones Importantes:</h4>
  <ul style="color: #0c5460;">
    <li>Código de seguimiento: <strong>{{ticket_code}}</strong></li>
    <li>Responder al denunciante usando el email proporcionado</li>
    <li>Mantener confidencialidad según la política de la empresa</li>
    <li>Documentar acciones tomadas para seguimiento</li>
  </ul>
</div>
*/ 