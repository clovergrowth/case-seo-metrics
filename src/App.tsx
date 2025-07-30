import React, { useState } from 'react';
import Papa from 'papaparse';
import FileUpload from './components/FileUpload';
import MetricsDisplay from './components/MetricsDisplay';
import WebhookService from './services/webhookService';
import type { JsonData, CsvRow, ProcessedMetrics, FileUploadState } from './types';

function App() {
  const [fileState, setFileState] = useState<FileUploadState>({
    jsonFile: null,
    csvFile: null,
    jsonData: null,
    csvData: [],
  });
  const [metrics, setMetrics] = useState<ProcessedMetrics | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // TODO: Configurar URL do webhook n8n no WebhookService
  const webhookService = new WebhookService();

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Implementar processamento do arquivo JSON
    // O desenvolvedor júnior deve implementar:
    // 1. Ler o arquivo usando FileReader
    // 2. Fazer parse do JSON
    // 3. Validar a estrutura dos dados
    // 4. Armazenar os dados no estado
    
    console.log('Arquivo JSON selecionado:', file.name);
    showNotification('error', 'Processamento do JSON não implementado. Implemente a lógica no método handleJsonUpload().');
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Implementar processamento do arquivo CSV
    // O desenvolvedor júnior deve implementar:
    // 1. Usar Papa.parse para processar o CSV
    // 2. Configurar as opções de parsing (header, skipEmptyLines)
    // 3. Tratar os resultados no callback 'complete'
    // 4. Tratar erros no callback 'error'
    // 5. Armazenar os dados no estado
    
    console.log('Arquivo CSV selecionado:', file.name);
    showNotification('error', 'Processamento do CSV não implementado. Implemente a lógica no método handleCsvUpload().');
  };

  const processMetrics = () => {
    if (!fileState.jsonFile || !fileState.csvFile) {
      showNotification('error', 'Por favor, carregue ambos os arquivos JSON e CSV');
      return;
    }

    // TODO: Implementar lógica de processamento das métricas
    // O desenvolvedor júnior deve implementar:
    // 1. Processar dados do JSON (domínios, páginas, autoridade, backlinks)
    // 2. Processar dados do CSV (indexabilidade, alt text)
    // 3. Calcular métricas baseadas nos dados processados
    // 4. Criar objeto ProcessedMetrics com os resultados
    
    console.log('JSON File:', fileState.jsonFile);
    console.log('CSV File:', fileState.csvFile);
    
    showNotification('error', 'Processamento de métricas não implementado. Implemente a lógica no método processMetrics().');
  };

  const sendToWebhook = async () => {
    if (!metrics) return;

    setIsSending(true);
    try {
      const response = await webhookService.sendMetrics(metrics);
      
      if (response.success) {
        showNotification('success', response.message);
      } else {
        showNotification('error', `Erro: ${response.error}`);
      }
    } catch (error) {
      showNotification('error', 'Erro ao enviar dados para o webhook');
    } finally {
      setIsSending(false);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const canProcess = fileState.jsonFile && fileState.csvFile;

  return (
    <div className="app">
      <div className="app-header">
        <div className="header-content">
          <h1>🚀 SEO Metrics Uploader</h1>
          <p>Processe e envie métricas de SEO para análise</p>
        </div>
      </div>

      <div className="app-container">
        <FileUpload
          state={fileState}
          onJsonUpload={handleJsonUpload}
          onCsvUpload={handleCsvUpload}
        />

        <div className="action-section">
          <button 
            className="process-button"
            onClick={processMetrics}
            disabled={!canProcess}
          >
            🔄 Processar Métricas
          </button>
          
          {!canProcess && (
            <div className="warning-message">
              ⚠️ Carregue os arquivos JSON e CSV para processar as métricas
            </div>
          )}
        </div>

        <MetricsDisplay
          metrics={metrics}
          onSendToWebhook={sendToWebhook}
          isSending={isSending}
        />


      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' ? '✅' : '❌'}
          </span>
          <span className="notification-message">{notification.message}</span>
          <button 
            className="notification-close"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App;