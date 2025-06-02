import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EmailConfig } from '../../environments/email.config';

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  motivo?: string;
}

export interface DenunciaForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  category: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
    // Inicializar EmailJS
    emailjs.init(EmailConfig.PUBLIC_KEY);
  }

  // Obtener email de destino según el motivo del contacto
  private getContactDestinationEmail(motivo: string): string {
    switch (motivo) {
      case 'Trabajo':
        return EmailConfig.RECLUTAMIENTO_EMAIL;
      case 'Proveedor':
        return EmailConfig.PROVEEDOR_EMAIL;
      case 'Cotizacion':
        return EmailConfig.COTIZACION_EMAIL;
      case 'Otro':
        return EmailConfig.OTROS_EMAIL;
      default:
        return EmailConfig.OTROS_EMAIL;
    }
  }

  // Generar código único de ticket
  generateTicketCode(): string {
    const prefix = 'CCT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  // Enviar formulario de contacto
  async sendContactForm(formData: ContactForm, file?: File): Promise<any> {
    try {
      // Determinar email de destino según el motivo
      const destinationEmail = this.getContactDestinationEmail(formData.motivo || 'Otro');
      
      const templateParams: any = {
        to_email: destinationEmail,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No especificado',
        company: formData.company || 'No especificado',
        message: formData.message,
        motivo: formData.motivo || 'Otro',
        subject: `Nuevo contacto - ${formData.motivo || 'Otro'} - ${formData.name}`
      };

      // Si hay archivo adjunto, convertir a base64
      if (file) {
        const base64 = await this.fileToBase64(file);
        templateParams.attachment = base64;
        templateParams.attachment_name = file.name;
        templateParams.attachment_size = this.formatFileSize(file.size);
      }

      const response = await emailjs.send(
        EmailConfig.SERVICE_ID,
        EmailConfig.CONTACT_TEMPLATE_ID,
        templateParams
      );

      return {
        success: true,
        message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
        response
      };

    } catch (error) {
      console.error('Error al enviar email de contacto:', error);
      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor intenta nuevamente.',
        error
      };
    }
  }

  // Enviar denuncia
  async sendDenuncia(formData: DenunciaForm, file?: File): Promise<any> {
    try {
      const ticketCode = this.generateTicketCode();
      
      const templateParams: any = {
        to_email: EmailConfig.DENUNCIA_EMAIL,
        ticket_code: ticketCode,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No especificado',
        company: formData.company || 'No especificado',
        category: formData.category,
        description: formData.description,
        subject: `Nueva denuncia - Ticket: ${ticketCode}`,
        submission_date: new Date().toLocaleString('es-CL')
      };

      // Si hay archivo adjunto, convertir a base64
      if (file) {
        const base64 = await this.fileToBase64(file);
        templateParams.attachment = base64;
        templateParams.attachment_name = file.name;
        templateParams.attachment_size = this.formatFileSize(file.size);
      }

      const response = await emailjs.send(
        EmailConfig.SERVICE_ID,
        EmailConfig.DENUNCIA_TEMPLATE_ID,
        templateParams
      );

      return {
        success: true,
        ticketCode,
        message: `Denuncia enviada exitosamente. Tu código de ticket es: ${ticketCode}. Guarda este código para consultar el estado de tu denuncia.`,
        response
      };

    } catch (error) {
      console.error('Error al enviar denuncia:', error);
      return {
        success: false,
        message: 'Error al enviar la denuncia. Por favor intenta nuevamente.',
        error
      };
    }
  }

  // Convertir archivo a base64
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Formatear tamaño de archivo
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Validar archivo
  validateFile(file: File): { isValid: boolean; message?: string } {
    const maxSize = 50 * 1024; // 50KB
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (file.size > maxSize) {
      return {
        isValid: false,
        message: 'El archivo no debe superar los 50KB'
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        message: 'Tipo de archivo no permitido. Solo se permiten: imágenes (JPG, PNG, GIF), PDF, documentos Word y archivos de texto'
      };
    }

    return { isValid: true };
  }
} 