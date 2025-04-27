import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Testes da tela HomeScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('Deve navegar para a tela correta ao clicar no botão', () => {
    const { getByTestId } = render(<HomeScreen />);
    const button = getByTestId('button');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledWith('ProductsScreen');
  });
});
