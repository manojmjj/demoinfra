/**
 * Converts an array of objects to a CSV string.
 * @param data - The array of objects to convert.
 * @returns The CSV string.
 */
function convertToCSV<T extends object>(data: T[]): string {
  if (!data || data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(obj =>
    headers.map(header => {
      let cell = (obj as any)[header];
      // Escape commas and quotes
      if (typeof cell === 'string') {
        if (cell.includes('"')) {
            cell = cell.replace(/"/g, '""');
        }
        if (cell.includes(',')) {
            cell = `"${cell}"`;
        }
      }
      return cell;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}


/**
 * Triggers a file download for the given CSV content.
 * @param data - The array of objects to export.
 * @param filename - The name of the file to download.
 */
export function exportToCSV<T extends object>(data: T[], filename: string) {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
