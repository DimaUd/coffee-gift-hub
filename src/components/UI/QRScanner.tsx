
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, QrCode } from 'lucide-react';
import CustomButton from './CustomButton';
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  onScan?: (data: string) => void;
  redirectToRedeem?: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({ 
  onScan,
  redirectToRedeem = true
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate a successful scan after 2 seconds
    setTimeout(() => {
      const mockQRData = '123'; // Simulated QR code data (gift ID)
      handleSuccessfulScan(mockQRData);
    }, 2000);
  };

  const handleSuccessfulScan = (data: string) => {
    setIsScanning(false);
    
    if (onScan) {
      onScan(data);
    }
    
    toast({
      title: "QR Code Scanned",
      description: "Gift found successfully!",
    });
    
    if (redirectToRedeem) {
      navigate(`/redeem/${data}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isScanning ? (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-coffee-medium rounded-lg relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-coffee-dark"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-coffee-dark"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-coffee-dark"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-coffee-dark"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-coffee-dark">
              <Camera className="h-8 w-8" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-coffee-dark bg-opacity-70 text-white text-xs text-center py-2">
            Position QR code within frame
          </div>
        </div>
      ) : (
        <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <QrCode className="h-20 w-20 text-muted-foreground" />
        </div>
      )}
      
      <CustomButton
        variant={isScanning ? "outline" : "primary"}
        size="lg"
        icon={<Camera className="h-5 w-5" />}
        onClick={isScanning ? () => setIsScanning(false) : startScanning}
      >
        {isScanning ? "Cancel Scanning" : "Scan QR Code"}
      </CustomButton>
    </div>
  );
};

export default QRScanner;
