export interface WebhookResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface MetricsData {
  domain: string;
  indexable_pages: number;
  images_without_alt: number;
  average_page_authority: number;
  total_backlinks: number;
}


// TODO: Configurar URL do webhook n8n
// 1. Acesse sua instância do n8n
// 2. Crie um webhook node
// 3. Faça o necessário para que o webhook seja chamado quando o botão "Exportar" for clicado
// 4. Teste o envio das métricas
// 5. Crie o botão "Exportar" no arquivo App.tsx

class WebhookService {
  private webhookUrl: string;

  constructor(webhookUrl: string = 'https://webhook.site/your-webhook-id-here') {
    this.webhookUrl = webhookUrl;
  }

  async sendMetrics(data: MetricsData): Promise<WebhookResponse> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      return {
        success: true,
        message: 'Dados enviados com sucesso!',
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao enviar dados',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  setWebhookUrl(url: string): void {
    this.webhookUrl = url;
  }

  getWebhookUrl(): string {
    return this.webhookUrl;
  }
}


export default WebhookService; 