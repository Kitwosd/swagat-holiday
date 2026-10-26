import React, { useState } from 'react';
import { api } from '../../../services/api';
import { Upload, CheckCircle2, Loader2, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function ImageUploadInput({ value, onChange, label = 'Image URL or Upload' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      setUploadSuccess(false);

      const res = await api.uploadImage(file);
      if (res.success && res.url) {
        onChange(res.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      } else {
        setError('Failed to upload image.');
      }
    } catch (err) {
      setError(err.message || 'Image upload error.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        {/* Direct URL input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/... or upload below"
            className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Cloudinary File Upload Button */}
        <label className="relative inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition shadow-sm shrink-0">
          {uploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload Image</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Upload feedback */}
      {uploadSuccess && (
        <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Image uploaded directly to Cloudinary!
        </p>
      )}
      {error && (
        <p className="text-[11px] text-red-600 font-medium">{error}</p>
      )}

      {/* Preview thumbnail */}
      {value && (
        <div className="mt-2 flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200 rounded-lg">
          <img
            src={value}
            alt="Preview"
            className="w-14 h-10 object-cover rounded border border-slate-300 bg-white"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=200&q=80';
            }}
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-slate-500 block truncate">{value}</span>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-amber-600 hover:underline inline-flex items-center gap-1"
            >
              <span>View full image</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
