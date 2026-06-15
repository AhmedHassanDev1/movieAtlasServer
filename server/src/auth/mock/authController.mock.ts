export const authServiceMock = {
    signUp: jest.fn(),
    logIn: jest.fn(),
    VerificationEmail: jest.fn(),
    generateRefreshAndAccessTokens: jest.fn(),
};