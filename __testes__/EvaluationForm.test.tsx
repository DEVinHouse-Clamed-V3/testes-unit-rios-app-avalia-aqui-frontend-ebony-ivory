import {fireEvent, render, waitFor} from '@testing-library/react-native';
import EvaluationScreen from '../src/screens/EvaluationScreen';
import { NavigationContainer } from '@react-navigation/native';
import * as authActions from '../src/actions/auth.actions';

jest.mock('../src/actions/auth.actions', () => ({
    Evaluation: jest.fn().mockResolvedValue({
      data: {
        id: 1,
        productId: 1,
        name: 'Gustavo',
        email: 'gusstavoffc@gmail.com',
        feedback: 'Muito bom!',
        experience: 'otimo',
        recommend: true,
      },
    }),
  }));

describe('Testes de Avaliação', () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

    it("Deve chamar a função de salvar avaliação", async () => {

        const { getByTestId} = render(
            <NavigationContainer>
              <EvaluationScreen />
            </NavigationContainer>
          );

        const productPicker = getByTestId('productPicker');
        fireEvent(productPicker, 'onValueChange', 1);

        const name = getByTestId('yourName');
        fireEvent.changeText(name, 'Gustavo');

        const email = getByTestId('email');
        fireEvent.changeText(email, 'gusstavoffc@gmail.com')

        const feedback = getByTestId('feedback');
        fireEvent.changeText(feedback, 'Muito bom!');

        const experience = getByTestId('experience-option-otimo');
        fireEvent.press(experience);

        const recommend = getByTestId('checkbox');
        fireEvent(recommend, 'onValueChange', true);

        const button = getByTestId('button-sendFeedback');
        fireEvent.press(button);

        await waitFor(() => {
            expect(authActions.Evaluation).toHaveBeenCalledTimes(1);
          }, { timeout: 6000 }); // aguarda até 6s para garantir que o setTimeout passe
        
          expect(authActions.Evaluation).toHaveBeenCalledWith(
            expect.any(Number),
            1,
            'Gustavo',
            'gusstavoffc@gmail.com',
            'Muito bom!',
            'Ótimo',
            true
          );
    })
})