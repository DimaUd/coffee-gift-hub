
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import QRScanner from '../components/UI/QRScanner';

const ScanQR = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-3xl font-bold text-coffee-dark mb-6">
                Scan a Coffee Gift
              </h1>
              <p className="text-muted-foreground mb-8">
                Scan a QR code to redeem your coffee gift. Position the QR code within the frame to scan.
              </p>
              
              <QRScanner />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanQR;
