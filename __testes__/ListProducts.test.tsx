import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductsScreen from '../src/screens/ProductsScreen';
import * as ProductActions from '../src/actions/ListProducts.actions'; // Caminho para seu arquivo real
import { Alert } from 'react-native';
import axios from  'axios';

jest.spyOn(Alert, 'alert');

const mockNavigate = jest.fn();

// Mock do axios para evitar chamadas reais à API
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

//
describe('Testes da tela ProductsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock da função getProducts para retornar dados simulados
    jest.spyOn(ProductActions, 'getProducts').mockResolvedValue([
      {
        id: 1,
        name: 'Produto Teste',
        price: 'R$ 100,00',
        description: 'Descrição de teste',
        image: 'https://via.placeholder.com/300x350',
      },
    ]);
  });

  // Teste para verificar se a API é chamada corretamente
  it('Deve exibir um produto retornado pela API', async () => {
    const { findByText } = render(<ProductsScreen />);
    const nomeProduto = await findByText('Produto Teste');
    expect(nomeProduto).toBeTruthy();
  });

  // Teste para verificar se o botão "Avaliar" navega para a tela de avaliação
  it('Deve navegar para a EvaluationScreen ao clicar no botão Avaliar', () => {
    const { getByTestId } = render(<ProductsScreen />);
    const button = getByTestId('button-avalia');

    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('EvaluationScreen');
  });

  // Teste para verificar se o botão "Home" navega para a tela inicial
  it('Deve navegar para a HomeScreen ao clicar no botão Home', () => {
    const { getByText } = render(<ProductsScreen />);
    const homeButton = getByText('Home');

    fireEvent.press(homeButton);

    expect(mockNavigate).toHaveBeenCalledWith('HomeScreen');
  });

});
