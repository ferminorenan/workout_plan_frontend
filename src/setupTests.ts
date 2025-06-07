// jest-dom adiciona matchers customizados para testar o DOM.
// Exemplo: expect(element).toHaveTextContent(/react/i)
// Saiba mais: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Correção para "TextEncoder is not defined"
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}
