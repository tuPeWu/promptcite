import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ViewCitation = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const qrRef = useRef<HTMLDivElement>(null);
  const [promptData, setPromptData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [citation, setCitation] = useState('');
  const [citationCopied, setCitationCopied] = useState(false);
  const [qrCopied, setQrCopied] = useState(false);

  const copyQRCode = async () => {
    if (!qrRef.current) return;

    try {
      const svg = qrRef.current.querySelector('svg');
      if (!svg) return;

      // Convert SVG to canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Try modern clipboard API first
        try {
          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, 'image/png');
          });

          if (blob && navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            setQrCopied(true);
            setTimeout(() => setQrCopied(false), 2000);
          } else {
            // Fallback: download the image
            downloadQRCode(canvas);
          }
        } catch (clipboardErr) {
          console.log('Clipboard API failed, using download fallback:', clipboardErr);
          // Fallback: download the image
          downloadQRCode(canvas);
        }
      };

      img.onerror = () => {
        console.error('Failed to load SVG image');
      };

      // Use btoa with proper encoding
      const base64 = btoa(unescape(encodeURIComponent(svgData)));
      img.src = `data:image/svg+xml;base64,${base64}`;
    } catch (err) {
      console.error('Failed to copy QR code:', err);
    }
  };

  const downloadQRCode = (canvas: HTMLCanvasElement) => {
    try {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `qr-code-${id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setQrCopied(true);
          setTimeout(() => setQrCopied(false), 2000);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Failed to download QR code:', err);
    }
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      if (!id) {
        console.warn('❌ No ID found. Aborting...');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 Fetching citation with ID:', id);
        const docRef = doc(db, 'prompts', id);
        const snapshot = await getDoc(docRef);

        console.log('📊 Snapshot exists?', snapshot.exists());

        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log('✅ Citation data retrieved:', data);
          setPromptData(data);

          // Generate citation with the actual document ID
          const firstFiveWords = data.prompt?.split(' ').slice(0, 5).join(' ');
          const model = data.aiModel === 'Other' ? data.otherModel : data.aiModel;
          const citationText = `${data.author}, "${firstFiveWords}...", ${model}${data.additionalInfo ? `, ${data.additionalInfo}` : ''
            }, ${data.date}, ${window.location.origin}/cite/${id}`;
          setCitation(citationText);
        } else {
          console.warn('⚠️ Citation not found - Document does not exist in Firestore');
          console.log('Document ID attempted:', id);
        }
      } catch (err: any) {
        console.error('❌ Error fetching citation:', err);
        console.error('Error code:', err?.code);
        console.error('Error message:', err?.message);

        // Check if it's a permission error
        if (err?.code === 'permission-denied') {
          console.error('🚫 PERMISSION DENIED - Firestore rules may not be set correctly');
          console.error('Please check Firestore security rules in Firebase Console');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center text-gray-600">{t('viewCitation.loading')}</div>
      </div>
    );
  }

  if (!promptData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {t('viewCitation.notFoundTitle')}
          </h1>
          <p className="text-gray-600">{t('viewCitation.notFoundMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('viewCitation.title')}</h1>

        {/* Citation Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">
            {t('viewCitation.citationLabel')}
          </h2>
          <p className="font-mono text-sm text-gray-800 leading-relaxed">{citation}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(citation);
              setCitationCopied(true);
              setTimeout(() => setCitationCopied(false), 2000);
            }}
            className={`mt-4 px-4 py-2 text-sm rounded transition-colors ${citationCopied
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {citationCopied ? t('viewCitation.copied') : t('viewCitation.copyButton')}
          </button>
        </div>

        {/* QR Code Section */}
        <div className="bg-gray-50 border border-gray-200 p-6 mb-8 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            {t('viewCitation.qrCodeLabel')}
          </h2>
          <div className="flex flex-col items-center">
            <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-sm mb-2">
              <QRCodeSVG value={`${window.location.origin}/cite/${id}`} size={200} level="H" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-4">promptcite.com</p>
            <button
              onClick={copyQRCode}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              {qrCopied ? t('viewCitation.copied') : t('viewCitation.copyQRButton')}
            </button>
          </div>
        </div>

        {/* Bibliographic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              {t('viewCitation.fields.author')}
            </h3>
            <p className="text-lg text-gray-800">{promptData.author}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              {t('viewCitation.fields.prompt')}
            </h3>
            <p className="text-gray-800 bg-gray-50 p-4 rounded border">{promptData.prompt}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                {t('viewCitation.fields.aiModel')}
              </h3>
              <p className="text-gray-800">{promptData.aiModel}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                {t('viewCitation.fields.date')}
              </h3>
              <p className="text-gray-800">{promptData.date}</p>
            </div>
          </div>

          {promptData.additionalInfo && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                {t('viewCitation.fields.additionalInfo')}
              </h3>
              <p className="text-gray-800">{promptData.additionalInfo}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              {t('viewCitation.fields.citationId')}
            </h3>
            <p className="font-mono text-sm text-gray-600">{id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCitation;
