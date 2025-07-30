import React from 'react';
// import { ProcessedMetrics } from '../types'; // TODO: Implementar ProcessedMetrics

interface MetricsDisplayProps {
  metrics: ProcessedMetrics | null; // TODO: Implementar ProcessedMetrics
  onSendToWebhook: () => void;
  isSending: boolean;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ 
  metrics, 
  onSendToWebhook, 
  isSending 
}) => {
  if (!metrics) return null;

  return (
    <div className="metrics-container">
      <div className="metrics-header">
        <h3>📊 Métricas Processadas</h3>
        <div className="domain-badge">{metrics.domain}</div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📄</div>
          <div className="metric-content">
            <h4>Páginas Indexáveis</h4>
            <div className="metric-value">{metrics.indexable_pages}</div>
            <div className="metric-description">
              Páginas que podem ser indexadas pelos motores de busca
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🖼️</div>
          <div className="metric-content">
            <h4>Imagens sem Alt Text</h4>
            <div className="metric-value">{metrics.images_without_alt}</div>
            <div className="metric-description">
              Imagens que precisam de texto alternativo
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <h4>Autoridade Média</h4>
            <div className="metric-value">{metrics.average_page_authority}</div>
            <div className="metric-description">
              Autoridade média das páginas do domínio
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🔗</div>
          <div className="metric-content">
            <h4>Total de Backlinks</h4>
            <div className="metric-value">{metrics.total_backlinks}</div>
            <div className="metric-description">
              Total de links externos apontando para o domínio
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-actions">
        <button 
          className="send-button"
          onClick={onSendToWebhook}
          disabled={isSending}
        >
          {isSending ? (
            <>
              <span className="loading-spinner"></span>
              Enviando...
            </>
          ) : (
            <>
              📤 Enviar para Webhook
            </>
          )}
        </button>
      </div>

      <div className="metrics-json">
        <details>
          <summary>Ver dados JSON</summary>
          <pre className="json-display">
            {JSON.stringify(metrics, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default MetricsDisplay; 