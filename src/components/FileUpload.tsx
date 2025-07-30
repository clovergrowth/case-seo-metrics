import React from 'react';
// import { FileUploadState } from '../types'; // TODO: Implementar FileUploadState

interface FileUploadProps {
  state: FileUploadState; // TODO: Implementar FileUploadState
  onJsonUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCsvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ state, onJsonUpload, onCsvUpload }) => {
  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <h3>📄 Upload de Arquivos</h3>
        
        <div className="upload-card">
          <div className="upload-item">
            <label htmlFor="json-upload" className="upload-label">
              <div className="upload-icon">📊</div>
              <span>Arquivo JSON</span>
            </label>
            {/* <input
              id="json-upload"
              type="file"
              accept="application/json"
              onChange={onJsonUpload}
              className="file-input"
            /> */}
            {state.jsonFile && (
              <div className="file-info">
                <span className="file-name">✓ {state.jsonFile.name}</span>
                <span className="file-size">
                  ({(state.jsonFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}
          </div>

          <div className="upload-item">
            <label htmlFor="csv-upload" className="upload-label">
              <div className="upload-icon">📋</div>
              <span>Arquivo CSV</span>
            </label>
            {/* <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={onCsvUpload}
              className="file-input"
            /> */}
            {state.csvFile && (
              <div className="file-info">
                <span className="file-name">✓ {state.csvFile.name}</span>
                <span className="file-size">
                  ({(state.csvFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="upload-status">
          {state.jsonData && (
            <div className="status-item success">
              <span>✓ JSON carregado: {state.jsonData.domain}</span>
              <span className="status-detail">
                {state.jsonData.pages.length} páginas encontradas
              </span>
            </div>
          )}
          {state.csvData.length > 0 && (
            <div className="status-item success">
              <span>✓ CSV carregado</span>
              <span className="status-detail">
                {state.csvData.length} linhas processadas
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 