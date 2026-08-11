interface AdminFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

export function AdminField({ label, value, onChange, multiline, placeholder }: AdminFieldProps) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="input-field resize-y"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-field"
        />
      )}
    </div>
  );
}

interface AdminImageFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export function AdminImageField({ label, value, onChange }: AdminImageFieldProps) {
  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wide text-mist-500 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-md border border-line bg-panel-2 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-mist-500 text-[10px] text-center px-1">Görsel yok</span>
          )}
        </div>
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-full text-xs text-mist-300 file:mr-3 file:py-2 file:px-3 file:rounded-sm file:border file:border-line file:bg-panel-2 file:text-mist-300 file:text-xs hover:file:border-steel-700/70 file:cursor-pointer cursor-pointer"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="focus-ring mt-2 text-xs text-red-400 hover:text-red-300"
            >
              Görseli kaldır
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
