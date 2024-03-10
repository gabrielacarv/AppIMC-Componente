// CalculadoraIMC.tsx
import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { StyleSheet } from 'react-native';

interface IMCCalculatorProps {
  // backgroundImage: any;
  onCalculateAgain: () => void;
}

// const img = './assets/img/Backgroud.png';

const IMCCalculator: React.FC<IMCCalculatorProps> = ({ onCalculateAgain }) => {
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [imc, setImc] = useState<string | null>(null);
  const [classificacao, setClassificacao] = useState<string | null>(null);
  const [mostrarInformacoes, setMostrarInformacoes] = useState(false);
  const [exibirCalcularButton, setExibirCalcularButton] = useState(true);

  const CalculaIMC = () => {
    if (peso === 0 || altura === 0) {
      alert('Preencha todas as informações antes de calcular o IMC.');
      return;
    }
    const calculoIMC = peso / ((altura * altura) / 10000);
    const imcFormatado = calculoIMC.toFixed(2);
  
    setImc(imcFormatado);
    classifica(calculoIMC);
    setMostrarInformacoes(true);
    setExibirCalcularButton(false);
  };

  const classifica = (imcCalculado: number) => {
    if (imcCalculado < 18.5) 
      setClassificacao('Magreza');
    else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) 
      setClassificacao('Normal');
    else if (imcCalculado >= 25 && imcCalculado <= 29.9) 
      setClassificacao('Sobrepeso');
    else if (imcCalculado >= 30 && imcCalculado <= 34.9) 
      setClassificacao('Obesidade grau I');
    else if (imcCalculado >= 35 && imcCalculado <= 39.9) 
      setClassificacao('Obesidade grau II');
    else if (imcCalculado >= 40) 
      setClassificacao('Obesidade grau III');
  };

  const LimparInformacoes = () => {
    setImc(null);
    setClassificacao(null);
    setMostrarInformacoes(false);
    setExibirCalcularButton(true);
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
        <View style={styles.container}>
        <Text style={styles.titulo}>Calculadora de IMC</Text>

        <Text style={styles.textInfo}>Preencha as informações:</Text>

        <Text style={styles.labelInput}>Peso</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholder='Ex: 62.5'
            onChangeText={(txtPeso) => setPeso(parseInt(txtPeso))}
            keyboardType='numeric'
            returnKeyType='done' 
            style={styles.input}
          />
          <Text style={styles.labelUnid}>Kg</Text>
        </View>

        <Text style={styles.labelInput}>Altura</Text>
        <View style={styles.containerInput}>
          <TextInput
            placeholder='Ex: 169'
            onChangeText={(txtAltura) => setAltura(parseInt(txtAltura))}
            keyboardType='numeric'
            returnKeyType='done' 
            style={styles.input}
          />
          <Text style={styles.labelUnid}>cm</Text>
        </View>

        {exibirCalcularButton ? (
          <TouchableOpacity style={styles.button} onPress={CalculaIMC}>
            <Text style={styles.textButton}>Calcular IMC</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={LimparInformacoes}>
            <Text style={styles.textButton}>Calcular novamente</Text>
          </TouchableOpacity>
        )}

        {mostrarInformacoes && imc !== null && classificacao !== null && (
          <View style={styles.containerInfo}>
            <Text style={styles.textResultado}>IMC: {imc} kg/m2.</Text>
            <Text style={styles.textResultado}>Classificação: {classificacao}</Text>
          </View>
        )}

        {/* <StatusBar style="auto" /> */}
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  containerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',    
  },

  titulo:{
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    fontSize: 20,
    color: '#36b1df',
  },

  textInfo:{
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
  },

  textResultado:{
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#36b1df',
    borderRadius: 5, 
    padding: 15,
    marginTop: 25,
  },
  
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
  },

  input: {
    borderWidth: 1,
    borderRadius: 5, 
    padding: 5,
    paddingLeft: 10,
    width: 120,
    height: 35,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelInput: { 
    paddingTop: 15, 
    paddingRight: 100,
  },

  labelUnid: { 
    paddingLeft: 5,
    fontFamily: 'Poppins_400Regular',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default IMCCalculator;
