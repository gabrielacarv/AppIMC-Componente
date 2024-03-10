// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import IMCCalculator from './src/componente/CalculadoraIMC';


export default function App() {
  const handleCalculateAgain = () => {
  };

  return (
    <IMCCalculator onCalculateAgain={handleCalculateAgain} />
  );
}
