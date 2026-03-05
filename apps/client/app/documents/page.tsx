'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  size: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      setDocuments([
        {
          id: '1',
          name: 'Driver License',
          type: 'ID',
          uploadDate: '2024-01-10',
          status: 'APPROVED',
          size: '2.3 MB',
        },
        {
          id: '2',
          name: 'Medical Evaluation Form',
          type: 'Medical',
          uploadDate: '2024-01-12',
          status: 'PENDING',
          size: '1.1 MB',
        },
        {
          id: '3',
          name: 'Proof of Residence',
          type: 'Address',
          uploadDate: '2024-01-08',
          status: 'APPROVED',
          size: '856 KB',
        },
        {
          id: '4',
          name: 'Background Check',
          type: 'Legal',
          uploadDate: '2024-01-15',
          status: 'REJECTED',
          size: '4.2 MB',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return '✅';
      case 'PENDING':
        return '⏳';
      case 'REJECTED':
        return '❌';
      default:
        return '📄';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Manage your required documents</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">My Documents</h2>
              <Link
                href="/documents/upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Document
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getStatusIcon(doc.status)}</div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>Uploaded: {doc.uploadDate}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Download
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Required Documents</h3>
          <p className="text-blue-800 mb-4">
            Please ensure you have uploaded all required documents for your recovery program.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span className="text-blue-800">Government-issued ID</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✅</span>
              <span className="text-blue-800">Proof of Residence</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">⏳</span>
              <span className="text-blue-800">Medical Evaluation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-600">❌</span>
              <span className="text-blue-800">Background Check</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
