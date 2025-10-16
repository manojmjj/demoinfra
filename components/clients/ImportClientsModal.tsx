import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Modal from '../shared/Modal';
import { Client } from '../../types';

interface ImportClientsModalProps {
  file: File;
  onClose: () => void;
  onImport: (clients: Omit<Client, 'id' | 'lastActivity'>[]) => void;
}

// Define the fields we expect in our CRM
const CRM_FIELDS: (keyof Omit<Client, 'id' | 'lastActivity'>)[] = [
  'name', 'company', 'email', 'phone', 'area', 'status', 'address', 'city', 'state'
];

const ImportClientsModal: React.FC<ImportClientsModalProps> = ({ file, onClose, onImport }) => {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileData = e.target?.result;
        if (!fileData) {
            throw new Error("Could not read file data.");
        }
        const workbook = XLSX.read(fileData, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (jsonData.length < 2) {
          throw new Error("File is empty or contains only headers.");
        }

        const fileHeaders = (jsonData[0] as any[]).map(String);
        const fileDataRows = jsonData.slice(1).map(row => {
            const rowData: { [key: string]: any } = {};
            fileHeaders.forEach((header, index) => {
                rowData[header] = row[index];
            });
            return rowData;
        });

        setHeaders(fileHeaders);
        setData(fileDataRows);
        
        // Auto-mapping logic
        const initialMapping: { [key: string]: string } = {};
        CRM_FIELDS.forEach(crmField => {
          const foundHeader = fileHeaders.find(header => 
            header.toLowerCase().replace(/[\s_]/g, '') === crmField.toLowerCase().replace(/[\s_]/g, '')
          ) || 'none';
          initialMapping[crmField] = foundHeader;
        });
        setMapping(initialMapping);

      } catch (err) {
        console.error(err);
        setError("Failed to parse the file. Please ensure it's a valid .xlsx, .xls, or .csv file.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        setError("Error reading the file.");
        setIsLoading(false);
    }

    reader.readAsArrayBuffer(file);
  }, [file]);

  const handleMappingChange = (crmField: string, fileHeader: string) => {
    setMapping(prev => ({ ...prev, [crmField]: fileHeader }));
  };

  const handleImportClick = () => {
    const newClients: Omit<Client, 'id' | 'lastActivity'>[] = [];
    const requiredFields = ['name', 'company', 'email'];
    let importError = null;

    for (const row of data) {
      const newClient: { [key: string]: any } = {};
      for (const crmField of CRM_FIELDS) {
        const mappedHeader = mapping[crmField];
        if (mappedHeader && mappedHeader !== 'none') {
          newClient[crmField] = row[mappedHeader];
        }
      }

      // Basic validation
      for (const field of requiredFields) {
          if (!newClient[field]) {
              importError = `Import failed. A row is missing a value for the required field: '${field}'. Please check your data and mapping.`;
              break;
          }
      }
      if (importError) break;

      newClients.push(newClient as Omit<Client, 'id' | 'lastActivity'>);
    }
    
    if (importError) {
        alert(importError);
    } else {
        onImport(newClients);
    }
  };

  const renderContent = () => {
    if (isLoading) return <p className="text-center p-8">Processing file...</p>;
    if (error) return <p className="text-center text-red-500 p-8">{error}</p>;

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200">Map Columns to CRM Fields</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">Match the columns from your file to the corresponding fields in the CRM. Required fields are marked with <span className="text-red-500">*</span>.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-1">
            {CRM_FIELDS.map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                  {['name', 'company', 'email'].includes(field) && <span className="text-red-500"> *</span>}
                </label>
                <select
                  value={mapping[field] || 'none'}
                  onChange={(e) => handleMappingChange(field, e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="none">-- Do not import --</option>
                  {headers.map(header => <option key={header} value={header}>{header}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200">Data Preview</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400">Showing the first 5 rows from your file.</p>
          <div className="overflow-x-auto mt-4 border border-gray-200 dark:border-slate-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>{headers.map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {data.slice(0, 5).map((row, i) => (
                  <tr key={i}>{headers.map(h => <td key={h} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">{row[h]}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={`Import Clients from ${file.name}`}>
      {renderContent()}
      {!isLoading && !error && (
        <div className="flex justify-end pt-4 border-t dark:border-slate-700 mt-6">
          <button type="button" onClick={onClose} className="bg-white dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg font-semibold text-sm border border-gray-300 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500 mr-2">Cancel</button>
          <button type="button" onClick={handleImportClick} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Import Clients</button>
        </div>
      )}
    </Modal>
  );
};

export default ImportClientsModal;
