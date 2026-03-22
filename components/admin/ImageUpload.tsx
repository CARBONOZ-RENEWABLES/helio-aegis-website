'use client';

import { useState } from 'react';
import { Upload, X, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/form-elements';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        onChange(base64String);
        setUploading(false);
      };
      reader.onerror = () => {
        alert('Failed to read file');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    setUrlInput('');
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      setPreview(urlInput);
      onChange(urlInput);
      setShowUrlInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">{label}</label>
      
      {preview ? (
        <div className="relative w-full h-48 rounded-sm border border-white/[0.08] overflow-hidden group">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : showUrlInput ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-solar text-void rounded-sm hover:bg-solar/90 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="px-4 py-2 bg-white/5 text-text-secondary rounded-sm hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/[0.08] rounded-sm cursor-pointer hover:border-solar/40 transition-colors bg-obsidian/50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solar"></div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-text-muted mb-3" />
                <p className="mb-2 text-sm text-text-secondary">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-text-muted">PNG, JPG, WEBP (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
      
      {!preview && !showUrlInput && (
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="w-full mt-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.08] rounded-sm hover:border-solar/40 transition-colors flex items-center justify-center gap-2"
        >
          <LinkIcon className="h-4 w-4" />
          Or paste image URL
        </button>
      )}
    </div>
  );
}
