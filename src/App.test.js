import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App'; // Assuming the component is imported correctly

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('initially displays empty input fields and selected unit as Celsius', () => {
    const { getByPlaceholderText, getByLabelText } = render(<App />);
    const inputField = getByPlaceholderText('Enter Temperature °C');
    const celsiusRadio = getByLabelText('Celsius');
    
    expect(inputField.value).toBe('');
    expect(celsiusRadio.checked).toBe(true);
  });

  it('converts Celsius to Fahrenheit correctly', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(<App />);
    const inputField = getByPlaceholderText('Enter Temperature °C');
    const convertButton = getByText('Convert');
    
    fireEvent.change(inputField, { target: { value: '25' } });
    fireEvent.click(convertButton);

    await waitFor(() => {
      const result = getByText('Moderate 77.00 °F');
      expect(result).toBeTruthy();
    });
  });

  it('converts Fahrenheit to Celsius correctly', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(<App />);
    const inputField = getByPlaceholderText('Enter Temperature °F');
    const fahrenheitRadio = getByLabelText('Fahrenheit');
    const convertButton = getByText('Convert');
    
    fireEvent.change(inputField, { target: { value: '77' } });
    fireEvent.click(fahrenheitRadio);
    fireEvent.click(convertButton);

    await waitFor(() => {
      const result = getByText('Moderate 25.00 °C');
      expect(result).toBeTruthy();
    });
  });

  it('displays an error message for invalid input', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const inputField = getByPlaceholderText('Enter Temperature °C');
    const convertButton = getByText('Convert');
    
    fireEvent.change(inputField, { target: { value: 'invalid' } });
    fireEvent.click(convertButton);

    await waitFor(() => {
      const errorMessage = getByText('Please enter a valid numeric temperature.');
      expect(errorMessage).toBeTruthy();
    });
  });

  it('swaps units correctly', () => {
    const { getByText } = render(<App />);
    const swapButton = getByText('Swap');

    fireEvent.click(swapButton);

    const fahrenheitRadio = getByLabelText('Fahrenheit');
    expect(fahrenheitRadio.checked).toBe(true);
  });
});
