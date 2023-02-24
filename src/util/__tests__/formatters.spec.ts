import { formatPrice } from './../formatters';

describe('formatPrice tests', () => {
    test('formatPrice should format number pt-BR when given 10.1', () => {
    
        // ARRANGE
        const value = 10.1;
    
        // ACT
        const result = formatPrice(value);    
    
        // ASSERT
        expect(result).toEqual("10,10");
    
    });

    test('formatPrice should format number pt-BR when given 0', () => {
    
        const result = formatPrice(0.1);    
        expect(result).toEqual("0,10");
    
    });
});

