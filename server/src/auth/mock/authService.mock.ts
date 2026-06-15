import PrismaMock from "src/shared/mock/prisma.mock";

export const prismaMock = {
    user: PrismaMock
};

export const mailerMock = {
    sendMail: jest.fn(),
};

export const redisMock = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
};

export const jwtMock = {
    signAsync: jest.fn(),
};

export const configMock = {
    get: jest.fn(),
};