import React from 'react';
import { View, Platform } from 'react-native';
import PatientQRCode from '../PatientQRCode';

const QRCodeTab = ({ patientId, patientEmail }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View className={`p-4 ${isWeb ? 'pb-8' : ''}`}>
      <PatientQRCode
        patientId={patientId}
        patientEmail={patientEmail}
      />
    </View>
  );
};

export default QRCodeTab;
