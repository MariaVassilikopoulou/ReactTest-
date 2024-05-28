import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from './src/mocks/setup';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(()=>{
    server.listen();
});

afterAll(() => {
    server.close();
  });